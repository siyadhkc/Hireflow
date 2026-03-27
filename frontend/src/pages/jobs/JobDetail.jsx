import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

export default function JobDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applied, setApplied] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get(`/jobs/${id}/`).then((res) => {
      setJob(res.data)
      setLoading(false)
    })
  }, [id])

  const handleApply = async () => {
    if (!user) { navigate('/login'); return }
    try {
      await api.post('/applications/apply/', { job: id, cover_letter: '' })
      setApplied(true)
      setMessage('Applied successfully!')
    } catch (err) {
      setMessage(err.response?.data?.detail || 'Already applied or error occurred')
    }
  }

  if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>
  if (!job) return <p style={{ padding: '2rem' }}>Job not found</p>

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>{job.title}</h1>
        <p style={styles.company}>{job.company_name}</p>
        <div style={styles.meta}>
          <span>{job.location}</span>
          {job.is_remote && <span style={styles.badge}>Remote</span>}
          <span style={styles.badge}>{job.job_type}</span>
        </div>
        {job.salary_min && (
          <p style={styles.salary}>
            ₹{job.salary_min} — ₹{job.salary_max} per year
          </p>
        )}
        <hr style={{ margin: '1.5rem 0' }} />
        <h3>Job Description</h3>
        <p style={styles.desc}>{job.description}</p>
        <h3 style={{ marginTop: '1rem' }}>Skills Required</h3>
        <p>{job.skills_required}</p>
        {message && <p style={styles.message}>{message}</p>}
        {user?.role === 'JOBSEEKER' && !applied && (
          <button onClick={handleApply} style={styles.btn}>
            Apply Now
          </button>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' },
  card: { background: '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  company: { color: '#64748b', fontSize: '1.1rem', margin: '8px 0' },
  meta: { display: 'flex', gap: '1rem', margin: '1rem 0', flexWrap: 'wrap' },
  badge: { background: '#eff6ff', color: '#3b82f6', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem' },
  salary: { color: '#16a34a', fontWeight: 'bold' },
  desc: { lineHeight: '1.7', color: '#475569' },
  btn: { marginTop: '1.5rem', padding: '12px 30px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' },
  message: { color: '#16a34a', marginTop: '1rem', fontWeight: 'bold' },
}
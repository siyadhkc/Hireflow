import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

export default function Dashboard() {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.role === 'JOBSEEKER') {
      api.get('/applications/my-applications/').then((res) => {
        setApplications(res.data.results)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [user])

  return (
    <div style={styles.container}>
      <h2>Welcome, {user?.full_name}</h2>
      <p style={styles.role}>Role: {user?.role}</p>

      {user?.role === 'JOBSEEKER' && (
        <div style={styles.section}>
          <h3>My Applications</h3>
          {loading ? <p>Loading...</p> : applications.length === 0 ? (
            <p>No applications yet. <a href="/">Browse jobs</a></p>
          ) : (
            applications.map((app) => (
              <div key={app.id} style={styles.card}>
                <h4>{app.job_title}</h4>
                <p>{app.company_name}</p>
                <span style={{
                  ...styles.badge,
                  background: app.status === 'HIRED' ? '#dcfce7' : app.status === 'REJECTED' ? '#fee2e2' : '#eff6ff',
                  color: app.status === 'HIRED' ? '#16a34a' : app.status === 'REJECTED' ? '#ef4444' : '#3b82f6',
                }}>
                  {app.status}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {user?.role === 'EMPLOYER' && (
        <div style={styles.section}>
          <h3>Employer Dashboard</h3>
          <p>Manage your job posts and applications from here.</p>
          <a href="/api/jobs/my-jobs/" style={styles.btn}>Manage Jobs</a>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: { maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' },
  role: { color: '#64748b', marginBottom: '2rem' },
  section: { background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  card: { padding: '1rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  badge: { padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' },
  btn: { display: 'inline-block', marginTop: '1rem', padding: '10px 20px', background: '#3b82f6', color: '#fff', borderRadius: '8px', textDecoration: 'none' },
}

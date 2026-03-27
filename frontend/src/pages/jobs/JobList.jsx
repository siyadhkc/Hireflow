import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchJobs = async (query = '') => {
    try {
      const res = await api.get(`/jobs/?search=${query}`)
      setJobs(res.data.results)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchJobs() }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    fetchJobs(e.target.value)
  }

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>Find Your Next Job</h1>
        <p>Browse hundreds of tech jobs from top startups</p>
        <input
          style={styles.search}
          placeholder="Search jobs..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div style={styles.grid}>
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <Link to={`/jobs/${job.id}`} key={job.id} style={styles.card}>
              <h3>{job.title}</h3>
              <p style={styles.company}>{job.company_name}</p>
              <p>{job.location} {job.is_remote && '· Remote'}</p>
              <span style={styles.badge}>{job.job_type}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '1100px', margin: '0 auto', padding: '2rem' },
  hero: { textAlign: 'center', padding: '3rem 0', marginBottom: '2rem' },
  search: { marginTop: '1rem', padding: '12px 20px', width: '500px', maxWidth: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
  card: { background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', textDecoration: 'none', color: '#1e293b', display: 'block' },
  company: { color: '#64748b', margin: '6px 0' },
  badge: { background: '#eff6ff', color: '#3b82f6', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem' },
}
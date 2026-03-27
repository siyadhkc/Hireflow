import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

export default function Register() {
  const [form, setForm] = useState({ email: '', full_name: '', role: 'JOBSEEKER', password: '', password2: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/register/', form)
      login(res.data.user, res.data.tokens)
      navigate('/dashboard')
    } catch (err) {
      const data = err.response?.data
      setError(JSON.stringify(data) || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="text" placeholder="Full Name"
            value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
          <input style={styles.input} type="email" placeholder="Email"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <select style={styles.input} value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="JOBSEEKER">Job Seeker</option>
            <option value="EMPLOYER">Employer</option>
          </select>
          <input style={styles.input} type="password" placeholder="Password"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <input style={styles.input} type="password" placeholder="Confirm Password"
            value={form.password2} onChange={(e) => setForm({ ...form, password2: e.target.value })} required />
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>
        <p style={styles.footer}>
          Have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' },
  card: { background: '#fff', padding: '2rem', borderRadius: '10px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
  title: { marginBottom: '1.5rem', textAlign: 'center' },
  input: { width: '100%', padding: '10px', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '1rem' },
  btn: { width: '100%', padding: '10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' },
  error: { color: '#ef4444', marginBottom: '1rem' },
  footer: { textAlign: 'center', marginTop: '1rem' },
}
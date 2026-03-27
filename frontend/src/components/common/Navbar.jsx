import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>HireFlow</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Jobs</Link>
        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    height: '60px',
    background: '#1e293b',
    color: '#fff',
  },
  brand: {
    color: '#38bdf8',
    textDecoration: 'none',
    fontSize: '1.4rem',
    fontWeight: 'bold',
  },
  links: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
  link: { color: '#fff', textDecoration: 'none' },
  btn: {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
}
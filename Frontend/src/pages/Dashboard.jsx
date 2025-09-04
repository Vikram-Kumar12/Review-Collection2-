import useAuth from '../hooks/useAuth.js'
import UserDashboard from '../components/Dashboard/UserDashboard.jsx'
import AdminDashboard from '../components/Dashboard/AdminDashboard.jsx'
const Dashboard = () => {
  const {user} = useAuth()
  return (
    <div className=''>
      {user?.role === 'Cohort' ? (<UserDashboard/>) : (<AdminDashboard/>)}
    </div>
  )
}

export default Dashboard
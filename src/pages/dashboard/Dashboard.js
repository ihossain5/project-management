import { useState } from 'react'
import ProjectList from '../../components/ProjectList'
import useAuthContext from '../../hooks/useAuthContext'
import useCollection from '../../hooks/useCollection'
import './Dashboard.css'
import ProjectFilter from './ProjectFilter'

const Dashboard = () => {
  const { documents, error } = useCollection('projects')

  const [filter, setFilter] = useState('all')

  const { user } = useAuthContext()

  const changeFilter = (newFilter)=>{
    setFilter(newFilter);
  }

  const projects = documents ? documents.filter(document => {
    console.log(document);
    switch(filter) {
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach(u => {
          if(u.id === user.uid) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        // console.log(document.category, filter)
        return document.category === filter
      default:
        return true
    }
  }) : null

  return (
    <div>
    <h2 className="page-title">Dashboard</h2>
    {error && <p className="error">{error}</p>}
    {documents && <ProjectFilter changeFilter={changeFilter} />}
    {projects && <ProjectList projects={projects} />}
  </div>
  )
}

export default Dashboard
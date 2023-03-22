import React from 'react'
import { useParams } from 'react-router-dom'

const Settings = () => {
    const { id } = useParams()
  return (
    <div>Settings: { id }</div>
  )
}

export default Settings
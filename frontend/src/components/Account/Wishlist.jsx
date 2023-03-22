import React from 'react'
import { useParams } from 'react-router-dom'

const Wishlist = () => {
    const { id } = useParams()
  return (
    <div>Wishlist: {id}</div>
  )
}

export default Wishlist
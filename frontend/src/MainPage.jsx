import React from 'react'
import { Link } from 'react-router-dom'

export const MainPage = () => {
  return (
    <>
        <h1>Get started</h1>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
        <p>New to Talloc? <Link to="/register">Register now</Link></p>
    </>
  )
}

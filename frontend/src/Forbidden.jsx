import React from 'react'
import { useNavigate } from "react-router-dom";

export const Forbidden = () => {
    const navigateTo = useNavigate();

  return (
    <div className="log_regPage">
        <h1 className="forbiddenTitle">Error 403 Forbidden:</h1>
        <p className="forbiddenDesc">You are not allowed to access this site without logging in</p>
        <p className="forbiddenGoBack" onClick={() => navigateTo('/')}>Go back</p>
    </div>
  )
}

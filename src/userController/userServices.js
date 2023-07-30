import React from 'react'
import axios from "axios";

// const USERS_REST_API_URL = "https://ppay.up.railway.app/api/public/register";
const USERS_REST_API_URL = "https://ppay-backend-production.up.railway.app/api/public/register";

function userServices() {
  return (
    axios.post(USERS_REST_API_URL)
  )
}

export default userServices
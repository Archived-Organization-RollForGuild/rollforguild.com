import axios from 'axios'

export default axios.create({
  baseURL: preval`module.exports = process.env.RFG_LOCAL_API_URL` || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
  timeout: 10000,
})

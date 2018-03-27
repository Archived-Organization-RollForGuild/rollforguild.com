import axios from 'axios'





const baseURL = preval`module.exports = process.env.RFG_WORDPRESS_API_URL`





export default axios.create({
  baseURL,
  timeout: 10000,
})

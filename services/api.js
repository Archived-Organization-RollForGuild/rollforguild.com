// Module imports
import axios from 'axios'
import getConfig from 'next/config'





// Component constants
const { publicRuntimeConfig } = getConfig()
const rfgLocalAPIURL = publicRuntimeConfig.apis.rfgLocal.url





export default axios.create({
  baseURL: rfgLocalAPIURL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
  timeout: 10000,
})

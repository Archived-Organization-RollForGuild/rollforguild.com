// Module imports
import axios from 'axios'
import getConfig from 'next/config'





// Component constants
const { publicRuntimeConfig } = getConfig()
const wordpressAPIURL = publicRuntimeConfig.apis.wordpress.url





export default axios.create({
  baseURL: wordpressAPIURL,
  timeout: 10000,
})

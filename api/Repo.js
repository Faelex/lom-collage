import axios from 'axios'

const baseDomain = 'https://api.dev7.ch'
const baseURL = `${baseDomain}/lom/`

export default axios.create({
  baseURL
  /* headers: {
    'Authorization': 'Bearer Token'
  } */
})

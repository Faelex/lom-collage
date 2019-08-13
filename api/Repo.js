import axios from 'axios'

const baseDomain = 'https://d7api.campusderkuenste.ch'
const baseURL = `${baseDomain}/lom/`

export default axios.create({
  baseURL
  /* headers: {
    'Authorization': 'Bearer Token'
  } */
})

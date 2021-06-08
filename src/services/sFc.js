import axios from 'axios'
import moment from 'moment'

const URL_BASE = 'https://www.datos.gov.co/resource/mcec-87by.json'

export function queryTRM(fecha) {
  const strFecha = moment(fecha).format('YYYY-MM-DD')
  // const URI = `${URL_BASE}?$where="${strFecha}" between vigenciadesde and vigenciahasta`
  const params = {
    '$where': `"${strFecha}" between vigenciadesde and vigenciahasta`
  }
  return axios.get(URL_BASE, { params })
  // return axios.get(URI)
}

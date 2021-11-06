import axios from 'axios'
import moment from 'moment'

const URL_BASE = 'https://www.datos.gov.co/resource/mcec-87by.json'

export function queryTRM(fecha) {
  const strFecha = moment(fecha).format('YYYY-MM-DD')
  const params = {
    '$where': `"${strFecha}" between vigenciadesde and vigenciahasta`
  }
  return axios.get(URL_BASE, { params })
}

export function queryTRMHistory(fecha1, fecha2) {
  const str1 = moment(fecha1).format('YYYY-MM-DD')
  const str2 = moment(fecha2).format('YYYY-MM-DD')
  const params = {
    '$where': `vigenciahasta between "${str1}" and "${str2}"`
  }
  return axios.get(URL_BASE, { params })
}

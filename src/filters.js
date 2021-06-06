import Vue from 'vue'
import moment from 'moment'

const formatDate = function(value, xformat) {
  if (!xformat) xformat = 'MM/DD/YYYY hh:mm'
  if (value) {
    return moment(String(value)).format(xformat)
  }
}

Vue.filter('formatDate', formatDate)

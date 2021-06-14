<template>
  <div class="chart-container">
    <ECharts :option="chartOption" :autoresize="true" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CountTo from 'vue-count-to'
import ECharts from 'vue-echarts'
import echarts from 'echarts'
import moment from 'moment'
import numeral from 'numeral'
import { queryTRMHistory } from "@/services/sFc"

const fnSortDates = (a, b) => {
  if (a.vigenciadesde < b.vigenciadesde) return -1
  else if (a.vigenciadesde > b.vigenciadesde) return 1
  return 0
}

export default {
  components: {
    CountTo,
    ECharts
  },
  data() {
    const $numeral = numeral()
    const $formatDate = function (value) {
      const m = moment(value)
      return m.format("MMM D")
    }
    const source = [
      {
        "valor": "3626.02",
        "unidad": "COP",
        "vigenciadesde": "2021-06-12T00:00:00.000",
        "vigenciahasta": "2021-06-15T00:00:00.000"
      },
      {
        "valor": "3589.86",
        "unidad": "COP",
        "vigenciadesde": "2021-06-11T00:00:00.000",
        "vigenciahasta": "2021-06-11T00:00:00.000"
      },
      {
        "valor": "3588.41",
        "unidad": "COP",
        "vigenciadesde": "2021-06-10T00:00:00.000",
        "vigenciahasta": "2021-06-10T00:00:00.000"
      },
      {
        "valor": "3597.18",
        "unidad": "COP",
        "vigenciadesde": "2021-06-09T00:00:00.000",
        "vigenciahasta": "2021-06-09T00:00:00.000"
      },
      {
        "valor": "3609.2",
        "unidad": "COP",
        "vigenciadesde": "2021-06-05T00:00:00.000",
        "vigenciahasta": "2021-06-08T00:00:00.000"
      },
      {
        "valor": "3657.41",
        "unidad": "COP",
        "vigenciadesde": "2021-06-04T00:00:00.000",
        "vigenciahasta": "2021-06-04T00:00:00.000"
      },
      {
        "valor": "3642.29",
        "unidad": "COP",
        "vigenciadesde": "2021-06-03T00:00:00.000",
        "vigenciahasta": "2021-06-03T00:00:00.000"
      },
      {
        "valor": "3671.38",
        "unidad": "COP",
        "vigenciadesde": "2021-06-02T00:00:00.000",
        "vigenciahasta": "2021-06-02T00:00:00.000"
      },
      {
        "valor": "3715.28",
        "unidad": "COP",
        "vigenciadesde": "2021-05-29T00:00:00.000",
        "vigenciahasta": "2021-06-01T00:00:00.000"
      }
    ]
    return {
      chartOption: {
        title: {
          top: 20,
          text: 'Historico valor del dolar (TRM)',
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['TRM'],
          right: '4%'
        },
        grid: {
          top: 100,
          left: '5%',
          right: '5%',
          bottom: '15%',
          containLabel: true
        },
        dataset: {
          dimensions: [
            { name: 'valor', type: 'number' },
            { name: 'vigenciadesde', type: 'ordinal' },
            { name: 'vigenciahasta', type: 'ordinal' }
          ],
          // source: source.sort(fnSortDates)
          source: []
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            formatter: $formatDate
          },
          axisLine: {
            show: true,
            onZero: false
          },
          axisPointer: {
            show: true,
            label: {
              formatter: (params) => moment(params.value).format("D MMM YYYY")
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: 'Dolar',
          min: 'dataMin',
          max: 'dataMax',
          axisLine: {
            show: true,
            onZero: false
          },
          axisPointer: {
            show: true,
            triggerTooltip: false
          },
          splitLine: {
            show: false
          },
          splitArea: {
            show: true
          }
        },
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            labelFormatter: (value, valueStr) => $formatDate(valueStr, value),
            start: 75,
            end: 100
          },
          {
            type: 'slider',
            yAxisIndex: 0,
            right: '1%'
          }
        ],
        series: [{
          name: 'TRM',
          type: 'line',
          encode: {
            x: 'vigenciahasta',
            y: 'valor'
          },
          /*
          tooltip: {
            backgroundColor: 'rgba(50,50,50,0.7)',
            formatter: (params) => {
              console.log(params)
              const p = params[0]
              $numeral.set(p.value.valor)
              const value = $numeral.format('0,0.00')
              return `${moment(p.name).format("MMMM D, YYYY")} <br> ${p.marker} ${p.seriesName} <b>${value}</b>`
            }
          }
          */
        }]
      },
      source: [],
      loadingSource: false
    }
  },

  computed: {
    ...mapState('sfc', {
      trm: state => state.trm
    }),
    fechaini() {
      return moment(this.fechafin).subtract(1, 'years').format('YYYY-MM-DD')
    },
    fechafin() {
      return this.trm.vigenciahasta
    }
  },

  methods: {
  },
  mounted() {
    // const fecha = moment(this.trm.vigenciahasta)
    queryTRMHistory(this.fechaini, this.fechafin)
      .then(response => {
        this.source = response.data.sort(fnSortDates)
        this.chartOption.dataset.source = this.source
      })
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

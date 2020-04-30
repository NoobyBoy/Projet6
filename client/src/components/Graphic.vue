<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
      name: 'Graph',
    components: {
      LineChart
    },
    props : {
        historyData : {
              type: Object,
              default: null
          }
    },
    data () {

      return {
        dataGraph : {},
        datacollection: null
      }
    },
    created() {
            this.dataGraph = this.historyData;
            console.log("DataHistory");
            console.log(this.historyData.History);
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['','','','','','','','','','',
          'Févr.','','','','','','','','','','','','','','','','','','','','','','','','','','','', 
          'Mars','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','', 
          'Avril','','','','','','','','','','','','','','','','','','','','','','','','','','','','',
          'Mai'],
          datasets: [
            {
              label: 'Confirmed',
              backgroundColor: '#aaaaaa',
              data: [555,654,941,1434,2118,2927,5578,6166,8234,9927,12038,16787,19881,23892,27635,30794,34391,37120,40150,42762,44802,
              45221,60368,66885,69030,71224,73258,75136,75639,76197,76819,78572,78958,79561,80406,81388,82746,84112,86011,88369,90306,
              92840,95120,97886,101801,105847,109821,113590,118620,125875,128352,145219,156116,167466,181603,197113,214846,242616,272247,
              304555,337018,378282,418079,467723,529701,593423,660824,720285,782490,857608,932638,1013458,1095876,1176059,1249737,1321427,
              1396438,1480200,1565538,1657929,1736025,1835164,1905192,1975581,2055506,2151872,2239723,2317339,2400843,2471759,2548821,2624107,
              2707742,2811603,2897624,2972363,3041764,3116398]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>


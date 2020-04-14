<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <TotalCase totalCase="400000"/>
    <CaseList Message="Coucou"/>
    <LastUpdate Update="GetDayDate()"/>
    
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import TotalCase from './components/TotalCase.vue'
import CaseList from './components/CaseList.vue'
import LastUpdate from './components/LastUpdate.vue'
import APIData from './Services/GetData'

export default {
  name: 'App',
  data: () => ({
    varAllData : []
  }),
  components: {
    //HelloWorld,
    TotalCase,
    CaseList,
    LastUpdate
  },
  methods : {
    async getAllData () {
      try {
        const res = await APIData.allData();
        this.varAllData = res.data.data;
        console.log("all data : ")
        console.log(this.varAllData)
      } catch (err) {
        console.log('Error get all data', Object.values(err))
      }
    },
    GetDayDate : function () {
      var date = new Date()
      var text = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()
      console.log(text)
      return text;
      
    }
  },


  created() {
    this.getAllData()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

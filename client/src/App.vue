<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <TotalCase totalCase="400000"/>
    <CaseList Country="['US 123456', 'Test', 'Hello']"/>
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TotalCase from './components/TotalCase.vue'
import APIData from 'Services/GetData'

export default {
  name: 'App',
  data: () => ({
    test : ''
  }),
  components: {
    HelloWorld,
    TotalCase
  },
  methods : {
    async getAllData () {
      try {
        const res = await APIData.allData();
        this.test = res.data.email;
        console.log(res)
      } catch (err) {
        console.log('Error get all data', Object.values(err))
      }
    }
  },
  beforeCreate() {
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

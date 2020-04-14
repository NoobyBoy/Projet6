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
import CaseList from './components/CaseList.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    TotalCase,
    CaseList
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

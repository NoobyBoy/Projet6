<template>
  <v-app>
   <!-- <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest">
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>-->

    <v-content>
      <Menu/>
      <TotalCase totalCase="400000"/>
      <CaseList Message="Coucou"/>
      <LastUpdate   :method="GetDayDate"/>
    </v-content>
  </v-app>
</template>

<script>
  //import HelloWorld from './components/HelloWorld.vue'
  import Menu from './components/Menu.vue'
  import TotalCase from './components/TotalCase.vue'
  import CaseList from './components/CaseList.vue'
  import LastUpdate from './components/LastUpdate.vue'
  import APIData from './services/GetData'

  export default {
    name: 'App',
    data: () => ({
      countriesData : [],
      statesData : [],
      citiesData : [],
      test : String
    }),
    components: {
      //HelloWorld,
      TotalCase,
      CaseList,
      LastUpdate,
      Menu
    },
    methods : {
      async getCountriesData () {
        try {
          const res = await APIData.getCountries();
          this.countriesData = res.data.data;
          console.log("Countries data : ")
          console.log(this.countriesData)
        } catch (err) {
          console.log('Error get countries data', Object.values(err))
        }
      },
      async getStatesData () {
        try {
          const res = await APIData.getStates();
          this.statesData = res.data.data;
          console.log("States data :")
          console.log(this.statesData)
        } catch (err) {
          console.log('Error get states data', Object.values(err))
        }
      },
      async getCitiesData () {
        try {
          const res = await APIData.getCities();
          this.citiesData = res.data.data;
          console.log("Cities data : ")
          console.log(this.citiesData)
        } catch (err) {
          console.log('Error get cities data', Object.values(err))
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
      this.getCountriesData()
      this.getStatesData()
      this.getCitiesData()
    }
  }
</script>

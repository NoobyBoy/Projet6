<template>
  <v-app>
        <v-content v-if="loading">
            <h1>Loading...</h1>
        </v-content>
        <v-content v-else>
            <Menu @Current-date="getProjectDate"/>
            <TotalCase
                    v-bind:countries-data="countriesData"
                    v-bind:states-data="statesData"
                    v-bind:cities-data="citiesData"
                    v-bind:country="countrySelected"
                    v-bind:state="stateSelected"
                    v-bind:city="citySelected"
                    :key="citySelected || stateSelected || countrySelected"/>
                    <v-layout row>
            <CaseList
                    v-bind:countries-data="countriesData"
                    v-bind:states-data="statesData"
                    v-bind:cities-data="citiesData"
            @Selection-sent="getSelection"/>
            <v-flex xs12 md3>

            </v-flex>
           <TotalDeath
                    v-bind:countries-data="countriesData"
                    v-bind:states-data="statesData"
                    v-bind:cities-data="citiesData"/>
            <TotalReco
                    v-bind:countries-data="countriesData"
                    v-bind:states-data="statesData"
                    v-bind:cities-data="citiesData"/>
            <LastUpdate   :method="GetDayDate"/>
            </v-layout>

        </v-content>
    </v-app>
</template>

<script>
  import Menu from './components/Menu.vue'
  import TotalCase from './components/totalCase/TotalCase.vue'
  import CaseList from './components/caseList/CaseList.vue'
  import LastUpdate from './components/LastUpdate.vue'
  import TotalDeath from './components/totalDeath/TotalDeath.vue'
  import TotalReco from './components/totalReco/TotalRecover.vue'
  import APIData from './services/GetData'

  export default {
    name: 'App',
    data: () => ({
        countriesData : null,
        statesData : null,
        citiesData : null,
        loading : true,
        countrySelected : null,
        stateSelected : null,
        citySelected : null,
        projectDate : null
    }),
    components: {
      TotalCase,
      CaseList,
      LastUpdate,
      Menu,
      TotalDeath,
      TotalReco
    },
    methods : {
        async getData (date) {
            try {
                if (date == null) {
                    console.log ("ACTUAL INFORMATION")
                    const countries = await APIData.getCountries();
                    this.countriesData = countries.data.data;

                    const states = await APIData.getStates();
                    this.statesData = states.data.data;

                    const cities = await APIData.getCities();
                    this.citiesData = cities.data.data;
                } else {
                    console.log ("Day : " + date + " INFORMATION")
                    const countries = await APIData.getCountriesDate(date);
                    this.countriesData = countries.data.data;

                    const states = await APIData.getStatesDate(date);
                    this.statesData = states.data.data;

                    const cities = await APIData.getCitiesDate(date);
                    this.citiesData = cities.data.data;
                }

                console.log("Countries data : ");
                console.log(this.countriesData);
                console.log("States data : ");
                console.log(this.statesData);
                console.log("Cities data : ");
                console.log(this.citiesData);
                this.loading = false

            } catch (err) {
                console.log('Error get countries data', Object.values(err))
            }
        },
        GetDayDate : function () {
            var date = new Date()
            var text = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()
            console.log(text)
            return text;
        },

        getSelection(payload) {
            this.countrySelected = payload.country
            this.stateSelected = payload.state
            this.citySelected = payload.city

        },
        getProjectDate(payload) {
            this.projectDate = payload.currentDate
        }
    },
      watch : {
        projectDate () {
            console.log("date change in app")
            console.log(this.projectDate)
            this.loading = true
            this.getData(this.projectDate)
        }
      },

      created() {
        this.loading = true
        this.getData(this.projectDate)
      }
  }
</script>

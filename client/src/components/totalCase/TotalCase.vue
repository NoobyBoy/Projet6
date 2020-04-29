<template>
<v-flex xs12 md3>
<v-container style="max-height: 200px; background: dimgrey">
    <v-row justify="center" align="center">
        <v-subheader class="display-1">Total Confirmed</v-subheader>
    </v-row>
    <v-row justify="center" align="center">
        <v-subheader class="display-3" style="font-size: xx-large; color: red" >{{nbConfirmed}}</v-subheader>
    </v-row>
</v-container>
</v-flex>
</template>

<script>

export default {
  name: 'TotalCase',
    props: {
        countriesData : {
            type : Object,
            defaults : null
        },
        statesData : {
            type : Object,
            defaults : null
        },
        citiesData : {
            type : Object,
            defaults : null
        },
        country : String,
        state : String,
        city : String
    },
    data : () => ({
        nbConfirmed : 0,
    }),
    created() {

        if (this.city != null) {
            for (let elem in this.citiesData) {
                if (this.citiesData[elem].Admin2 === this.city) {
                    this.nbConfirmed = this.citiesData[elem].Confirmed
                    break
                }
            }
        } else if (this.state != null) {
            console.log("search state")
            console.log(this.statesData)
            for (let elem in this.statesData) {
                if (this.statesData[elem].Province_State === this.state) {
                    console.log("elem")
                    this.nbConfirmed = this.statesData[elem].Confirmed
                    break
                }
            }

        } else if (this.country != null) {
            for (let elem in this.countriesData) {
                if (this.countriesData[elem].Country_Region === this.country) {
                    this.nbConfirmed = this.countriesData[elem].Confirmed
                    break
                }
            }
        } else {
            for (let elem in this.countriesData) {
                if (this.countriesData[elem].Country_Region === 'Total') {
                    this.nbConfirmed = this.countriesData[elem].Confirmed
                    break
                }
            }
        }
    }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
h1 {
  color: black;
}
#Case {
  color: red;
}
</style>
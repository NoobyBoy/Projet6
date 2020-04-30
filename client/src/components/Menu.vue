<template>
<v-container style="max-width: inherit">
  <v-row class="grey" style="max-height: 70px; align-self: center">

    <v-col cols="10">
      <h1 class="text-xs-center">COVID-19 Dashboard by Epitech Student searching for an internship</h1>
    </v-col>

    <v-col cols="2" align-self="center">


      <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y>
        <template v-slot:activator="{ on }">
          <v-text-field
                  v-model="computedDateFormatted"
                  persistent-hint
                  readonly
                  v-on="on"
                  style="font-size: 30px"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
      </v-menu>
    </v-col>
  </v-row>


</v-container>
</template>

<script>
export default {
  name: 'Menu',
  data : () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
  }),

  props : {
    projectDate : String
  },

    computed: {
      computedDateFormatted () {
        console.log("Project Date")
        console.log(this.projectDate)

        return this.formatDate(this.date)
      },
    },

    watch: {
      date () {
        this.$emit('Current-date',
                {currentDate : this.date})
      }
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
  created() {
  }
}
</script>
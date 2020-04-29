<template>
<v-flex xs12 md3>
    <v-container style="max-height: 500px; background: #808080;">
    <v-row justify="center" align="center">
        <Viewer v-bind:data-to-display="elemDisplayed"/>
        </v-row>
    </v-container>
</v-flex>
</template>


<script>

    import Viewer from './AdminViewer'
    //import AdminEnum from '../../Utils/AdminEnum'

    export default {
        name: 'CaseList',
        data: () => ({
            elemDisplayed: {},
            //admin : AdminEnum.Admin0
        }),
        components : {
            Viewer
        },
        props: {
          countriesData : {
              type: Object,
              default: null
          },
          statesData :  {
              type: Object,
              default: null
          },
          citiesData :  {
              type: Object,
              default: null
          }
        },
        methods : {

        },
        created() {
            this.elemDisplayed = this.countriesData;
        }
    }
</script>

<style scoped>
</style>
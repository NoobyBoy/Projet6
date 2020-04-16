<template>
    <v-container id="case">
        <Viewer v-bind:data-to-display="elemDisplayed"/>
    </v-container>
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
    #case {
        margin: 5px;
        width: 350px;
        height: 500px;
        background: #212121;
        color: #BDBDBD;
        position:relative;
    }
</style>
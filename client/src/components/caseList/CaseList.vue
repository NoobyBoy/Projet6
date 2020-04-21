<template>

<v-container style="max-height: 450px; background: #42b983;">
    <v-row justify="center" align="center">
        <v-subheader>{{caseTitle}}</v-subheader>
    </v-row>
    <v-container
            style="max-height: 450px; background: aqua"
            class="overflow-y-auto">
        <v-row justify="center" align="center" v-if="countryIsSelected || stateIsSelected || citiesIsSelected">
            <v-chip
                    v-if="countryIsSelected"
                    class="ma-2"
                    close
            @click:close="removeChip(0)">
                {{countrySelect}}
            </v-chip>
            <v-chip
                    v-if="stateIsSelected"
                    class="ma-2"
                    close
                    @click:close="removeChip(1)">
                {{stateSelect}}
            </v-chip>
            <v-chip
                    v-if="citiesIsSelected"
                    class="ma-2"
                    close
                    @click:close="removeChip(2)">
                {{citySelect}}
            </v-chip>

        </v-row>
        <v-row
                align="center"
                justify="center">
            <v-card class="mx-auto"
            style="background: brown;">
                <v-list>
                    <v-list-item-group>
                        <v-list-item
                                v-for="(item, i) in dataToDisplay"
                                :key="i"
                                @click="getItemSelect"
                        inactive>
                            <v-list-item-subtitle>
                                {{item.Confirmed}}
                            </v-list-item-subtitle>

                            <v-list-item-title v-if="adminState === 0">
                                {{item.Country_Region}}
                            </v-list-item-title>
                            <v-list-item-title v-else-if="adminState === 1">
                                {{item.Province_State}}
                            </v-list-item-title>
                            <v-list-item-title v-else>
                                {{item.Admin2}}
                            </v-list-item-title>

                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-row>
    </v-container>
    <selector @Admin-sent="getAdminFromSelector"/>
</v-container>

</template>


<script>

    import Selector from './AdminSelector'
    import Parser from './utils/parseName'

    const Admin = Object.freeze({ Admin0: 0, Admin1: 1, Admin2: 2 });

    export default {
        name: 'CaseList',
        data: () => ({
            dataToDisplay: {},
            adminState : Admin.Admin0,
            caseTitle : 'Confirmed Cases by Country/Region/Sovereignty',
            countrySelect : null,
            stateSelect : null,
            citySelect : null,
            countryIsSelected : false,
            stateIsSelected : false,
            citiesIsSelected : false
        }),
        components : {
            Selector
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
            getAdminFromSelector(payload) {
                if (payload.admin === 'Admin0') {
                    this.adminState = Admin.Admin0
                } else if (payload.admin === 'Admin1') {
                    this.adminState = Admin.Admin1
                } else {
                    this.adminState = Admin.Admin2
                }
                this.updateView()
            },
            updateView () {
                if (this.adminState === Admin.Admin0) {
                    this.caseTitle = 'Confirmed Cases by Country/Region/Sovereignty'
                    this.dataToDisplay = this.countriesData
                } else if (this.adminState === Admin.Admin1) {
                    this.caseTitle = 'Confirmed Cases by Province/State/Dependency'
                    this.dataToDisplay = this.statesData
                } else {
                    this.caseTitle = 'Confirmed Cases by US County'
                    this.dataToDisplay = this.citiesData
                }
            },
            getItemSelect (item) {
                let tmp = Parser.parseName(item.target.innerText);

                if (this.adminState === Admin.Admin0 && !this.countryIsSelected) {
                    this.countrySelect = tmp
                    this.countryIsSelected = true
                    //console.log(this.itemSelected)
                }
                if (this.adminState === Admin.Admin1 && !this.stateIsSelected) {
                    this.stateSelect = tmp
                    this.stateIsSelected = true
                }
                if (this.adminState === Admin.Admin2 && !this.citiesIsSelected) {
                    this.citySelect = tmp
                    this.citiesIsSelected = true
                }
                this.sendToApp()
                //console.log(this.itemSelected)
                /*if (this.adminState === Admin.Admin0) {
                    if (this.itemSelected === tmp) {
                        this.countryIsSelected = false
                        this.itemSelected = ''
                    } else {
                        this.countryIsSelected = true
                        this.itemSelected = tmp
                    }
                }*/


            },
            removeChip (item) {
                if (item === Admin.Admin0) {
                    this.countryIsSelected = false
                    this.countrySelect = null
                } else if (item === Admin.Admin1) {
                    this.stateIsSelected = false
                    this.stateSelect = null
                } else {
                    this.citiesIsSelected = false
                    this.citySelect = null
                }
                this.sendToApp()
            },
            sendToApp() {
                this.$emit('Selection-sent',
                    {country : this.countrySelect,
                    state : this.stateSelect,
                    city : this.citySelect})
            }
        },
        created() {
            this.dataToDisplay = this.countriesData;
        }
    }
</script>

<style scoped>
    #case {
        background: #212121;
        max-width: fit-content;
    }
</style>
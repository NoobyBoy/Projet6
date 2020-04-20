<template>

    <div>
        <v-row justify="center" align="center">
            <v-subheader>Total Death</v-subheader>
        </v-row>
        <v-container
                id="scroll-target"
                style="max-height: 450px"
                class="overflow-y-auto"
        >
            <v-row
                    v-scroll:#scroll-target="onScroll"
                    align="center"
                    justify="center"
                    style="height: 1000px"
            >
                <v-card
                        class="mx-auto"
                        max-width="500">
                    <v-list>
                        <v-list-item-group>
                            <v-list-item
                                    v-for="(item, i) in dataToDisplay"
                                    :key="i">
                                <v-list-item-subtitle>
                                    {{item.Deaths}} deaths
                                </v-list-item-subtitle>
                                <v-list-item-title>
                                    {{item.Country_Region}}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    //import AdminEnum from '../../../Utils/AdminEnum'

    export default {

        name: "AdminViewer",
        data: () => ({
            caseTitle : "test",
            //test : AdminEnum.Admin0
        }),
        props: {
            dataToDisplay : Object,
            admin : String
        },
        created() {
            console.log("data to display")
            console.log(this.dataToDisplay)
        }
    }
</script>

<style scoped>

</style>
<template>
    <v-row  justify="center" align="center">
        <v-btn @click="changeAdminToLower">
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        {{this.textDisplayed}}
        <v-btn @click="changeAdminToUpper">
            <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
    </v-row>
</template>

<script>
    const Admin = Object.freeze({ Admin0: 'Admin0', Admin1: 'Admin1', Admin2: 'Admin2' });

    export default {
        name: "AdminSelector",
        data: () => ({
            stateAdmin : Admin.Admin0,
            textDisplayed : String
        }),
        created() {
            this.textDisplayed = this.stateAdmin
        },
        methods : {
            changeAdminToLower() {
                if (this.stateAdmin === Admin.Admin0) {
                    this.stateAdmin = Admin.Admin2
                } else if (this.stateAdmin === Admin.Admin2){
                    this.stateAdmin = Admin.Admin1
                } else {
                    this.stateAdmin = Admin.Admin0
                }
                this.textDisplayed = this.stateAdmin
                this.sendAdmin()
            },
            changeAdminToUpper() {
                if (this.stateAdmin === Admin.Admin2) {
                    this.stateAdmin = Admin.Admin0
                } else if (this.stateAdmin === Admin.Admin0){
                    this.stateAdmin = Admin.Admin1
                } else {
                    this.stateAdmin = Admin.Admin2
                }
                this.textDisplayed = this.stateAdmin
                this.sendAdmin()
            },
            sendAdmin() {
                this.$emit('Admin-sent',
                    {admin : this.stateAdmin})
            }
        }
    }
</script>

<style scoped>

</style>
<template>
<v-flex xs12 md3 style="max-height: 500px; background: #808080;">
  <v-row justify="center" align="center">
    <h1>Last Updated at (M/D/YYYY)</h1>
  </v-row>
  <v-row justify="center" align="center">
    <p style="font-size: xx-large; color: red">{{this.method()}}</p>
  </v-row>
</v-flex>
</template>

<script>
export default {
  name: 'Update',
  props: {
    Update : String,
    method: {type: Function},
  },
}
</script>
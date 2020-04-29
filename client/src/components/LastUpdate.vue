<template>
<v-flex xs12 md3 style="max-height: 500px; background: #808080;">
<h1 >Last Updated at (M/D/YYYY)</h1>
<p style="font-size: xx-large; color: red">{{this.method()}}</p>
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
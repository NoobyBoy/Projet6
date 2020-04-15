<template>
<div id=Day>
<h1>Last Updated at (M/D/YYYY)</h1>
<p>{{Update}}</p>
</div>
</template>

<script>
export default {
  name: 'Update',
  props: {
    Update : String,
    method: {type: Function},
  },
  mounted() {
    
    this.Update = this.method();
  }
}
</script>
<template>
<div id=Day>
<h1>Last Updated at (M/D/YYYY)</h1>
<p>{{this.method()}}</p>
</div>
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
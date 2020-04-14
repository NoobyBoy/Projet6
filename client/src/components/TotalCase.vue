<template>
<div id=Case>
<h1>Total confirmed</h1>
<p>{{totalCase}}</p>
</div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    totalCase: Number
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
h1 {
  color: black;
}
#Case {
  color: red;
}
</style>
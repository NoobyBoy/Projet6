<template>
<div>
<p>
    Confirmed Cases by Country/Regions/Sovereignty
</p>
<ol>
    <li v-for="todo in Country">
        {{ todo.text}}
    </li>
</ol>
</div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    Country: Array
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
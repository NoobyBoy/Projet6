<template>
<div>
<p>
    Confirmed Cases by Country/Regions/Sovereignty {{Message}}
</p>
<ol>
    <test v-for="todo in Country" :key="todo.message">
    <li>
        {{todo}}
    </li>
    </test>
</ol>
</div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    Country: [
        {message: 'US 123456'}, 
        {message: 'Test'}, 
        {message:'Hello'}
    ]
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
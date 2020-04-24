<template>
<div id=Case>
  
<h1 class="grey">Total confirmed</h1>
<p class="grey red--text">{{totalCase}}</p>

</div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    totalCase: String
  }
}
</script>
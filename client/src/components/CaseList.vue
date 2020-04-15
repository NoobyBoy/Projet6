<template>
    <div >
        <p>{{caseTitle}}</p>
    </div>
</template>

<script>
export default {
    name: 'CaseList',
    data: () => ({
        caseTitle : "test"
    }),
    props: {
      countriesData : Object,
      statesData : Object,
      citiesData : Object
    }
}
</script>

<style scoped>

</style>
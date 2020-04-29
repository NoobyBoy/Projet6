import Api from './API'

export default {
    getCountries () {
        return Api().get('/countries')
    },
    getStates () {
        return Api().get('/zones')
    },
    getCities () {
        return Api().get('/cities')
    },
    getCountriesDate(date) {
        return Api().get('/countries?date=' + date)
    },
    getStatesDate(date) {
        return Api().get('/zones?date=' + date)
    },
    getCitiesDate(date) {
        return Api().get('/cities?date=' + date)
    },
}

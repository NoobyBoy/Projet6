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
    getSpecificCountry(country) {
        return Api().get('/countries/' + country)
    },
    getSpecificState(state) {
        return Api().get('/zones/' + state)
    },
    getSpecificCity(city) {
        return Api().get('/cities/' + city)
    },
}

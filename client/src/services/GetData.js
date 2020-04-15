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
    }
}

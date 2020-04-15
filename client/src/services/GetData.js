import Api from './API'

export default {
    allData () {
        return Api().get('/all')
    }
}

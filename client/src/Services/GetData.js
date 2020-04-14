import Api from 'src/Services/API'

export default {
    allData () {
        return Api().get('/all')
    }
}

import axios from 'axios'
import store from '~/store'

axios.defaults.baseURL = 'http://0.0.0.0/api/v1/'
axios.defaults.headers.common['Authorization'] = store.getState().user.token
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Headers'] =
  'Origin, X-Requested-With, Content-Type, Accept'
export default axios

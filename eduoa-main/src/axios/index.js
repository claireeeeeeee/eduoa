import axios from 'axios'

const service = axios.create({
  baseURL: 'https://eduoa.azurewebsites.net/api/',
  timeout: 500000
})

service.interceptors.request.use(
  config => {
    if (window.localStorage.getItem('jwt')) {
      config.headers.Authorization = `Bearer ${window.localStorage.getItem(
        'jwt'
      )}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  response => {
    return response
  }
  // error => {
  //     if(error.response){
  //         switch(error.response.status){
  //             case 401:
  //                 useHistory().push('/login')
  //         }
  //     }
  //     return Promise.reject(error.response.data)
  // }
)

export default service

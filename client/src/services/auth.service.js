import axios from 'axios';
import api from '@/plugins/api.js'
const API_URL = `${api.url}/api/v1/`//`http://${api.localhost}:${api.port}/api/api/v1/`; // auth
class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        // console.log("response user login", response )
        if (response.data/*.accessToken*/) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
    axios.post(API_URL + 'logout').catch(er => { console.warn("Error logout ", er) });
  }
  register(user) {
    return axios.post(API_URL + 'register', { // signup
      name                  : user.name,
      username              : user.username,
      email                 : user.email,
      password              : user.password,
      confirmation_password : user.confirmation_password,
    });
  }
}
export default new AuthService();
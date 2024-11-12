// import axios from 'axios';
import axios from "@/plugins/requests.js"

// import authHeader from './auth-header';
// const API_URL = 'http://localhost:8080/api/test/';
class UserService {
  /* getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  } */
  async getUsers(params){
    try {
        const response = await axios.get("/api/v1/items/user", params) // /api/v1/user
        return response;
    } catch (error) {
        console.warn("Error get triage ", error);
        return {error}
    }
  }
  async saveUser(params){
    try {
        const response = await axios.post("/api/v1/user", params)
        return response;
    } catch (error) {
        console.warn("Error save user ", error);
        return {error}
    }
  }
  async updateUser(params){
    try {
      const response = await axios.put(`/api/v1/user/${params.id}`, params)
      return response;
    } catch (error) {
        console.warn("Error get triage ", error);
        return {error}
    }
  } 
  async deleteUser(params){
    try {
      const response = await axios.delete(`/api/v1/user/${params.id}`)
      return response;
    } catch (error) {
        console.warn("Error get triage ", error);
        return {error}
    }
  }
  async getUsersByRole(params){
    try {
      const response = await axios.get(`/api/v1/items/usersbyrole/${params.RoleId}`);
      return response;
    } catch (error) {
      return {error}
    }
  } 
  async getAllUsers(params){
    try {
      const response = await axios.get(`/api/v1/items/userrole`);
      return response;
    } catch (error) {
      return {error}
    }
  } 
  
}
export default new UserService();

import axios from 'axios';
export default {
    
    async createCars(params)  {
        return await axios.post(`cars/create` , params)
    },
    async createCarsList(params)  {
        return await axios.post(`cars/create/list` , params)
    },
    async updateCarsColumn(column , value , data)  {
        return await axios.put(`cars/update_list?${column}=${value}` , data)
    },
    async deleteCarsList(list)  {
        return await axios.delete(`cars/delete_list` , {
            data: {
                list:list
            }
        })
    },
    async reportCars(column , value)  {
        return await axios.get(`cars/report?${column}=${value}`)
    },
    async getAllCars()  {
        return await axios.get(`cars/all`)
    },
    async getOneCars(car_id)  {
        return await axios.get(`cars/all/${car_id}`)
    },
    async getCarsByColumn(column , value)  {
        return await axios.get(`cars/filter?column=${column}&value=${value}`)
    },
    async deleteCars(car_id)  {
        return await axios.delete(`cars/delete/${car_id}`)
    },
    async updateCars(car_id , params)  {
        return await axios.put(`cars/update/${car_id}` , params)
    }
}
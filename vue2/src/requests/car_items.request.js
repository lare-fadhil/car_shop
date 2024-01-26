
import axios from 'axios';
export default {
    
    async createCarItems(params)  {
        return await axios.post(`car_items/create` , params)
    },
    async createCarItemsList(params)  {
        return await axios.post(`car_items/create/list` , params)
    },
    async updateCarItemsColumn(column , value , data)  {
        return await axios.put(`car_items/update_list?${column}=${value}` , data)
    },
    async deleteCarItemsList(list)  {
        return await axios.delete(`car_items/delete_list` , {
            data: {
                list:list
            }
        })
    },
    async reportCarItems(column , value)  {
        return await axios.get(`car_items/report?${column}=${value}`)
    },
    async getAllCarItems()  {
        return await axios.get(`car_items/all`)
    },
    async getOneCarItems(car_item_id)  {
        return await axios.get(`car_items/all/${car_item_id}`)
    },
    async getCarItemsByColumn(column , value)  {
        return await axios.get(`car_items/filter?column=${column}&value=${value}`)
    },
    async deleteCarItems(car_item_id)  {
        return await axios.delete(`car_items/delete/${car_item_id}`)
    },
    async updateCarItems(car_item_id , params)  {
        return await axios.put(`car_items/update/${car_item_id}` , params)
    }
}

import axios from 'axios';
export default {
    
    async createItems(params)  {
        return await axios.post(`items/create` , params)
    },
    async createItemsList(params)  {
        return await axios.post(`items/create/list` , params)
    },
    async updateItemsColumn(column , value , data)  {
        return await axios.put(`items/update_list?${column}=${value}` , data)
    },
    async deleteItemsList(list)  {
        return await axios.delete(`items/delete_list` , {
            data: {
                list:list
            }
        })
    },
    async reportItems(column , value)  {
        return await axios.get(`items/report?${column}=${value}`)
    },
    async getAllItems()  {
        return await axios.get(`items/all`)
    },
    async getOneItems(item_id)  {
        return await axios.get(`items/all/${item_id}`)
    },
    async getItemsByColumn(column , value)  {
        return await axios.get(`items/filter?column=${column}&value=${value}`)
    },
    async deleteItems(item_id)  {
        return await axios.delete(`items/delete/${item_id}`)
    },
    async updateItems(item_id , params)  {
        return await axios.put(`items/update/${item_id}` , params)
    }
}
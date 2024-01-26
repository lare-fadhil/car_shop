
import axios from 'axios';
export default {
    
    async createInvoiceItems(params)  {
        return await axios.post(`invoice_items/create` , params)
    },
    async createInvoiceItemsList(params)  {
        return await axios.post(`invoice_items/create/list` , params)
    },
    async updateInvoiceItemsColumn(column , value , data)  {
        return await axios.put(`invoice_items/update_list?${column}=${value}` , data)
    },
    async deleteInvoiceItemsList(list)  {
        return await axios.delete(`invoice_items/delete_list` , {
            data: {
                list:list
            }
        })
    },
    async reportInvoiceItems(column , value)  {
        return await axios.get(`invoice_items/report?${column}=${value}`)
    },
    async getAllInvoiceItems()  {
        return await axios.get(`invoice_items/all`)
    },
    async getOneInvoiceItems(invoice_item_id)  {
        return await axios.get(`invoice_items/all/${invoice_item_id}`)
    },
    async getInvoiceItemsByColumn(column , value)  {
        return await axios.get(`invoice_items/filter?column=${column}&value=${value}`)
    },
    async deleteInvoiceItems(invoice_item_id)  {
        return await axios.delete(`invoice_items/delete/${invoice_item_id}`)
    },
    async updateInvoiceItems(invoice_item_id , params)  {
        return await axios.put(`invoice_items/update/${invoice_item_id}` , params)
    }
}
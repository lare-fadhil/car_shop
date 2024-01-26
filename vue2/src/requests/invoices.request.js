
import axios from 'axios';
export default {
    
    async createInvoices(params)  {
        return await axios.post(`invoices/create` , params)
    },
    async createInvoicesList(params)  {
        return await axios.post(`invoices/create/list` , params)
    },
    async updateInvoicesColumn(column , value , data)  {
        return await axios.put(`invoices/update_list?${column}=${value}` , data)
    },
    async deleteInvoicesList(list)  {
        return await axios.delete(`invoices/delete_list` , {
            data: {
                list:list
            }
        })
    },
    async reportInvoices(column , value)  {
        return await axios.get(`invoices/report?${column}=${value}`)
    },
    async getAllInvoices()  {
        return await axios.get(`invoices/all`)
    },
    async getOneInvoices(invoice_id)  {
        return await axios.get(`invoices/all/${invoice_id}`)
    },
    async getInvoicesByColumn(column , value)  {
        return await axios.get(`invoices/filter?column=${column}&value=${value}`)
    },
    async deleteInvoices(invoice_id)  {
        return await axios.delete(`invoices/delete/${invoice_id}`)
    },
    async updateInvoices(invoice_id , params)  {
        return await axios.put(`invoices/update/${invoice_id}` , params)
    }
}

import axios from 'axios';
export default {
    
    async createExpenses(params)  {
        return await axios.post(`expenses/create` , params)
    },
    async createExpensesList(params)  {
        return await axios.post(`expenses/create/list` , params)
    },
    async updateExpensesColumn(column , value , data)  {
        return await axios.put(`expenses/update_list?${column}=${value}` , data)
    },
    async deleteExpensesList(list)  {
        return await axios.delete(`expenses/delete_list` , {
            data: {
                list:list
            }
        })
    },
    async reportExpenses(params)  {
        return await axios.post(`expenses/report` , params)
    },
    async getAllExpenses()  {
        return await axios.get(`expenses/all`)
    },
    async getOneExpenses(expense_id)  {
        return await axios.get(`expenses/all/${expense_id}`)
    },
    async getExpensesByColumn(column , value)  {
        return await axios.get(`expenses/filter?column=${column}&value=${value}`)
    },
    async deleteExpenses(expense_id)  {
        return await axios.delete(`expenses/delete/${expense_id}`)
    },
    async updateExpenses(expense_id , params)  {
        return await axios.put(`expenses/update/${expense_id}` , params)
    }
}
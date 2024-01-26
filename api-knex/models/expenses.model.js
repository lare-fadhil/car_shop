
const db = require('../connection')
const table_name = 'expenses'
class Expenses {
    async getAll() {
        return await db.select("*").table(table_name)
    }
    async report(columns) {
        let query = "";
                
        if (columns.expense_amount) {
            query += ` AND expense_amount = '${columns.expense_amount}'`
        }
            
        if (columns.expense_note) {
            query += ` AND expense_note = '${columns.expense_note}'`
        }
            
        if (columns.expense_date) {
            query += ` AND expense_date = '${columns.expense_date}'`
        }
            
        if (columns.user_id) {
            query += ` AND user_id = '${columns.user_id}'`
        }
            
        return await db.raw(`SELECT * FROM ${table_name} WHERE 1=1 ${query}`).then(data => {
            return data[0]
        })
    }
    async getById(id) {
        return await db.select("*").table(table_name).where('expense_id', id)
    }
    async getByColumn(column, value) {
        return await db.select("*").table(table_name).where(column, value)
    }
    async createList(data) {
        const insert = await db(table_name).insert(data)
        return insert
    }
    async createOne(data) {
        const insert = await db(table_name).insert(data)
        const insertedData = await db.select("*").table(table_name).where('expense_id', insert[0])
            .then(data => {
                return data
            })
        return insertedData[0]
    }
    async updateByID(data, id) {
        const update = await db(table_name)
            .where('expense_id', id)
            .update(data).then(async () => {
                return await db.select("*").table(table_name).where('expense_id', id)
            })

            return update[0] ? update[0] : null
            
    }
    async deleteByID(id) {
        const deletedData = await db(table_name).where('expense_id', id).del().then(data => {
            return data
        });
        return deletedData
    }
    async updateByColumn(data, column, value) {
        const updatedData = await db(table_name).where(column, value).update(data)
        .then(async (_) => {
            return await db.select("*").table(table_name).where(column, value)
        })
        return updatedData
    }
    async deleteList(list) {
        const deletedData = await db(table_name).whereIn('expense_id', list).del().then(data => {
            return data
        });
        return deletedData
    }
}
module.exports = new Expenses()
        
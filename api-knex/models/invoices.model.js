
const db = require('../connection')
const table_name = 'invoices'
class Invoices {
    async getAll() {
        return await db.select("*").table('invoices_view').orderBy('invoice_id', 'desc')
    }
    async report(columns) {
        let query = "";
        let data = {};
        if (columns.from && columns.to) {
            query += ` AND invoice_date BETWEEN '${columns.from}' AND '${columns.to}'`
        }
            
        if (columns.user_id) {
            query += ` AND user_id = '${columns.user_id}'`
        }
            
        data.invoices = await db.raw(`SELECT * FROM invoices_view WHERE 1=1 ${query}`)
            .then(data => {
                return data[0]
            })
        data.total = await db.raw(`SELECT SUM(final_price) as total, SUM(invoice_price) as total_invoice_price, SUM(invoice_discount) as total_invoice_discount
         FROM invoices_view WHERE 1=1 ${query}`)
            .then(data => {
                return data[0]
            })
       return data
    }
    async getById(id) {
        return await db.select("*").table(table_name).where('invoice_id', id)
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
        const insertedData = await db.select("*").table(table_name).where('invoice_id', insert[0])
            .then(data => {
                return data
            })
        return insertedData[0]
    }
    async updateByID(data, id) {
        const update = await db(table_name)
            .where('invoice_id', id)
            .update(data).then(async () => {
                return await db.select("*").table(table_name).where('invoice_id', id)
            })

            return update[0] ? update[0] : null
            
    }
    async deleteByID(id) {
        const deletedData = await db(table_name).where('invoice_id', id).del().then(data => {
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
        const deletedData = await db(table_name).whereIn('invoice_id', list).del().then(data => {
            return data
        });
        return deletedData
    }
}
module.exports = new Invoices()
        

const db = require('../connection')
const table_name = 'car_items'
class CarItems {
    async getAll() {
        return await db.select("*").table(table_name)
    }
    async report(columns) {
        let query = "";
                
        if (columns.car_id) {
            query += ` AND car_id = '${columns.car_id}'`
        }
            
        if (columns.item_id) {
            query += ` AND item_id = '${columns.item_id}'`
        }
            
        return await db.raw(`SELECT * FROM ${table_name} WHERE 1=1 ${query}`).then(data => {
            return data[0]
        })
    }
    async getById(id) {
        return await db.select("*").table(table_name).where('car_item_id', id)
    }
    async getByColumn(column, value) {
        return await db.select("*").table('car_items_view').where(column, value)
    }
    async createList(data) {
        const insert = await db(table_name).insert(data)
        return insert
    }
    async createOne(data) {
        const insert = await db(table_name).insert(data)
        const insertedData = await db.select("*").table(table_name).where('car_item_id', insert[0])
            .then(data => {
                return data
            })
        return insertedData[0]
    }
    async updateByID(data, id) {
        const update = await db(table_name)
            .where('car_item_id', id)
            .update(data).then(async () => {
                return await db.select("*").table(table_name).where('car_item_id', id)
            })

            return update[0] ? update[0] : null
            
    }
    async deleteByID(id) {
        const deletedData = await db(table_name).where('car_item_id', id).del().then(data => {
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
        const deletedData = await db(table_name).whereIn('car_item_id', list).del().then(data => {
            return data
        });
        return deletedData
    }
}
module.exports = new CarItems()
        
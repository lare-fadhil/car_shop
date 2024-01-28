
const db = require('../connection')
class Init {
    async init(uid) {
        // await db.raw(`SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`);
        let data = {}
        const user = await db.select("*").table("users").where("firebase_uid", uid).first()
        data.user = user
        if(data.user){
            const users = await db.select("*").table("users").orderBy("user_id", "desc")
            data.users = users
            const items = await db.select("*").table("items").orderBy("item_id", "desc")
            data.items = items

        } else {
            data.user = null
        }
        return data
    }
}
module.exports = new Init()
        
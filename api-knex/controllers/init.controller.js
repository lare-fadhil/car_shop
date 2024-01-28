const InitModel = require('../models/init.model')

class Init {
    init = () => {
        return (req, res, next) => {
            const uid = req.params.uid
            if (uid) {
                InitModel.init(uid).then(data => {
                    res.status(200).json(
                         data
                    )
                }).catch(err => {
                    res.status(400).json(err)
                })
            } else {
                res.status(400).json({
                    message: "uid is required"
                })
            }
        }
    }
}
module.exports = new Init()
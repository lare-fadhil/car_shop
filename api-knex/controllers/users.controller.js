
const Users = require('../models/users.model')

    const validationForm = require('../validations/users.validation')
    
class UsersController {
    getAll = () => {
        return (req, res, next) => {
            Users.getAll().then(data => {
                res.status(200).json({
                    rows : data
                })
            }).catch(err => {
                res.status(400).json(err)
            })
        }
    }
    report = () => {
        return (req, res, next) => {
            Users.report(req.query).then(data => {
                res.status(200).json(data)
            }).catch(err => {
                res.status(400).json(err)
            })
        }
    }
    getById = () => {
        return (req, res, next) => {
            const id = req.params.id
            if (!id) {
                res.status(401).json({
                    message: 'id is required'
                })
            }
            Users.getById(id).then(data => {
                res.status(200).json(data[0] ? {row : data[0]} : null)
            }).catch(err => {
                res.status(400).json(err)
            })
        }
    }
    getByColumn = () => {
        return (req, res, next) => {
            const column = req.query.column
            const value = req.query.value
            if (!column || !value) {
                res.status(401).json({
                    message: 'validation error'
                })
            }
            Users.getByColumn(column, value).then(data => {
                res.status(200).json({rows : data})
            }).catch(err => {
                res.status(400).json(err)
            })
        }
    }
    createOne = () => {
        return (req, res, next) => {
            const data = req.body
            const validation = validationForm.createValidation(data)
            if (validation.error) {
                res.status(401).json({
                    message: validation.error.details[0].message
                })
            } else {
                Users.createOne(data).then(data => {
                    res.status(200).json({new_data : data})
                }).catch(err => {
                    res.status(400).json(err)
                })
            }
        }
    }
    updateByID = () => {
        return (req, res, next) => {
            const id = req.params.id
            if (!id) {
                res.status(401).json({
                    message: 'id is required'
                })
            }
            const data = req.body
            const validation = validationForm.updateValidation(data)
            if (validation.error) {
                res.status(401).json({
                    message: validation.error.details[0].message
                })
            } else {
                Users.updateByID(data, id).then(data => {
                    res.status(200).json({new_data : data})
                }).catch(err => {
                    res.status(400).json(err)
                })

            }
        }
    }
    updateByColumn = () => {
        return (req, res, next) => {
            const data = req.body
            const validation = validationForm.updateValidation(data)
            if (validation.error) {
                res.status(401).json({
                    message: validation.error.details[0].message
                })
            } else {
                if (req.query.column || req.query.value) {
                    const column = req.query.column
                    const value = req.query.value
                    Users.updateByColumn(data, column, value).then(data => {
                        res.status(200).json({new_data : data})
                    }).catch(err => {
                        res.status(400).json(err)
                    })
                } else {
                    res.status(400).json({
                        message: 'validation error'
                    })

                }
            }
        }
    }
    deleteByID = () => {
        return (req, res, next) => {
            const id = req.params.id
            if (!id) {
                res.status(401).json({
                    message: 'id is required'
                })
            }
            Users.deleteByID(id)
                .then(data => {
                    if (data == 1) {
                        res.status(200).json({
                            deleted_id: id
                        })
                    } else if (data == 0) {
                        res.status(200).json({
                            message: 'data not found'
                        })
                    }
                }).catch(err => {
                    res.status(400).json(err)
                })
        }
    }
    createList = () => {
        return (req, res, next) => {
            const data = req.body
            let list = []
            for (let index = 0; index < data.list.length; index++) {
                const element = data.list[index];
                const validation = validationForm.createValidation(element)
                if (validation.error) {
                    res.status(401).json({
                        message: validation.error.details[0].message
                    })
                } else {
                    list.push(element)
                }
            }
            Users.createList(list).then(data => {
                res.status(200).json({rows : data})
            }).catch(err => {
                res.status(400).json(err)
            })
        }
    }
    deleteList = () => {
        return (req, res, next) => {
            const body = req.body
            if (body.list && body.list.length > 0) {
                Users.deleteList(body.list)
                    .then(data => {
                        if (data == 1) {
                            res.status(200).json({
                                deleted_list: body.list
                            })
                        } else if (data == 0) {
                            res.status(200).json({
                                message: 'data not found'
                            })
                        }else {
                            res.status(200).json({
                                deleted_list: body.list
                            })
                        }
                    }).catch(err => {
                        res.status(400).json(err)
                    })
            } else {
                res.status(401).json({
                    message: 'list is required'
                })
            }
        }
    }
}
module.exports = new UsersController()
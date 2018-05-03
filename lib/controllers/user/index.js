// exports.findAll = require('./src/find_all').findAll;
// exports.findById = require('./src/find_by_id').findById;
module.exports = {
    findAll: require('./src/find_all').findAll,
    findById: require('./src/find_by_id').findById,
    add: require('./src/add').add,
    delete: require ('./src/delete').delete,
    edit: require('./src/edit').edit
}
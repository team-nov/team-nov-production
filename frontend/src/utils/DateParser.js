const moment = require('moment')

exports.dateParser = (date,format) =>{
    return moment(date).format(format)
}
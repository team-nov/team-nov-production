const { default: axios } = require('axios');
const moment = require('moment');

exports.formatMessage = (username,text) => {
    
    return{
        from:username,
        message:text,
        date: moment().format('ddd h:mm A')
    }
}

exports.formatDmMessage = (message) => {

    return axios.get('http://localhost:5000/api/users/'+message.from)
            .then(res =>{
                return ({
                    from:res.data.name,
                    message:message.message,
                    date: moment().format('ddd h:mm A')
                    
                })
            })
    
}
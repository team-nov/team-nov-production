const { default: axios } = require('axios');
const moment = require('moment');


exports.formatMessage = (username, text) => {

    return {
        from: username,
        message: text,
        date: "hello"
    }
}

exports.formatDmMessage = (message) => {

    return axios.get('http://localhost:5000/api/users/' + message.from)
        .then(res => {
            return ({
                dmId: message.dmId,
                from: {
                    _id:message.from,
                    name:res.data.name
                },
                message: message.message,
                date: message.date,
                picture: res.data.picture
            })
        })

}
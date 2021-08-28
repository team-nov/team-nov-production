const { default: axios } = require("axios");
const moment = require("moment");
console.log(process.env.HOST);

exports.formatMessage = (username, text) => {
    return {
        from: username,
        message: text,
        date: "hello",
    };
};

exports.formatDmMessage = (message) => {
    return axios
        .get(process.env.HOST + "/api/users/" + message.from)
        .then((res) => {
            return {
                dmId: message.dmId,
                from: {
                    _id: message.from,
                    name: res.data.name,
                    picture: res.data.picture,
                },
                message: message.message,
                date: message.date,
                picture: res.data.picture,
            };
        });
};

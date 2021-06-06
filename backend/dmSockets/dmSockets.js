const socketio = require('socket.io');
const axios = require('axios')
const {formatMessage,formatDmMessage} =require('./formatMessage')
const botname ='nodejs server'
exports.io = (server)=>{
    let io
    io = socketio(server, {
        cors: {
          origin: '*',
    }});

    io.on('connection',(socket)=>{
        console.log('New socket connection');
        socket.emit('serverMessage',formatMessage(botname, 'hi from nodejs'));
        // notify other users
        socket.broadcast.emit('serverMessage', formatMessage(botname,'a user has joined the chat'));
    
        socket.on('disconnect',() =>{
            socket.broadcast.emit('serverMessage', formatMessage(botname,'a user has left the chat'))
        })

        socket.on('clientMessage',(message)=>{
            console.log(message)
            // create dm in db
            axios.post('http://localhost:5000/api/dms/messages',
                message
            ).then(res=>console.log(res.data.message))
            .catch(res=>console.log(res.data.error))
            formatDmMessage(message)
            .then(msg =>{
                io.emit('serverMessage',msg)
            })
        })

    })
    

}
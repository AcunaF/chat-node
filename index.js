//server
let express = require('express');
let res = require('express/lib/response');
let app = require('express')();//llama al constructor
let server = require('http').Server(app);
let io = require('socket.io')(server, {
    cors: { // Permite el acceso de orígenes mixtos (CORS)
        origin: '*'
    }
});

let message = [{

    id: 1,
    text: 'bienvenido al WhatFamilyChatSaap!!!!!',
    nickname: 'facu',

}];
app.use(express.static('client'));

app.get('/hola-mundo', function (req, res) {

    res.status(200).send('anda el servidor');
});

//conexion al socket (permite lanzar eventos y conectar los socket)
// detecta cada vez que alguien se conecta y el ip para
io.on('connection', function (socket) {

    console.log("el cliente con IP : " + socket.handshake.address + " se ha conectado...")

    socket.emit('messages', message);

    socket.on('add-message', function (data) {

        message.push(data);

        io.sockets.emit('messages', message)
    });


});



server.listen(6677, function () {

    console.log("el servidor esta funcionando en la http://localhost:6677");
});
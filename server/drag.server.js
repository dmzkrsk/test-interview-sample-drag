// подключаем библиотеку и устанавливаем уровень логирования
var io = require('socket.io').listen(40000); 
io.set('log level', 1);
// сжимаем скрипт клиента
io.enable('browser client minification');
io.enable('browser client gzip'); 

var last; // тут будем хранить последние координаты объекта.


io.sockets.on('connection', function (socket) {
    // если нам известны последние координаты объекта
    if(last)
        // сообщим их новому клиенту
        socket.json.send(last);

    // при получении сообщения о перемещении
    socket.on('message', function (position) {
        // сохраним позицию
        last = position;
        // и оповестим всех
        socket.broadcast.json.send(position);
    });
});
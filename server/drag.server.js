// ���������� ���������� � ������������� ������� �����������
var io = require('socket.io').listen(40000); 
io.set('log level', 1);
// ������� ������ �������
io.enable('browser client minification');
io.enable('browser client gzip'); 

var last; // ��� ����� ������� ��������� ���������� �������.


io.sockets.on('connection', function (socket) {
    // ���� ��� �������� ��������� ���������� �������
    if(last)
        // ������� �� ������ �������
        socket.json.send(last);

    // ��� ��������� ��������� � �����������
    socket.on('message', function (position) {
        // �������� �������
        last = position;
        // � ��������� ����
        socket.broadcast.json.send(position);
    });
});
import { Server } from 'socket.io';
console.log('server is running');

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        console.log('*First use, starting socket.io');

        const io = new Server(res.socket.server);

        let onlineUsers = [];

        const addNewUser = (username, socketId) => {
            !onlineUsers.some((user) => user.username === username) &&
                onlineUsers.push({ username, socketId });
            console.log('socketId addNewUser', socketId);
        };

        const removeUser = (socketId) => {
            onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
        };

        const getUser = (username) => {
            console.log('get user is running');
            console.log('getUser username', username);
            return onlineUsers.find((user) => user.username === username);
        };

        io.on('connection', (socket) => {
            console.log('someone has connected');

            socket.on('newUser', (username) => {
                addNewUser(username, socket.id);
            });

            socket.on('sendNotification', ({ senderName, receiverName, type }) => {
                const receiver = getUser(receiverName);
                console.log('receiversendNotification', receiver);
                io.to(receiver.socketId).emit('getNotification', {
                    senderName,
                    type,
                });
            });

            socket.on('sendText', ({ senderName, receiverName, text }) => {
                const receiver = getUser(receiverName);
                console.log('receiversendText', receiver);

                io.to(receiver.socketId).emit('getText', {
                    senderName,
                    text,
                });
            });

            socket.on('disconnect', () => {
                console.log('someone has left');
                removeUser(socket.id);
            });
        });

        res.socket.server.io = io;
    } else {
        console.log('socket.io already running');
    }
    res.end();
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default ioHandler;

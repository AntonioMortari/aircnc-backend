import { io } from './index';

io.on('connection', (socket) => {
    console.log('Usuário conectado', socket.id);
});
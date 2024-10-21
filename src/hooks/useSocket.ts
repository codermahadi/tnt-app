import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (): Socket => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // Connect to the Socket.IO server
        socketRef.current = io('http://192.168.1.100:5011');

        // Clean up on unmount
        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    return socketRef.current as Socket; // Ensure the return type is Socket
};

export default useSocket;

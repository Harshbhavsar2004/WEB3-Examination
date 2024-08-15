import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Model3 from './Model3';

const socket = io('https://first-project-backend-ycff.onrender.com', {
  transports: ['websocket']
});

const App = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Retrieve token from localStorage (adjust this part according to your actual token storage)
        const token = localStorage.getItem('usersdatatoken');

        // Function to handle socket events
        const handleSocketEvents = () => {
            if (token) {
                // Emit token to the server for verification
                socket.emit('verifyToken', token);
            }

            // Listen for Socket.IO connection events
            socket.on('connect', () => {
                console.log('Socket.IO connected successfully!');
                toast.success('Socket.IO connected successfully!');
            });

            socket.on('connect_error', (error) => {
                console.error('Socket.IO connection error:', error.message);
                toast.error(`Socket.IO connection error: ${error.message}`);
            });

            socket.on('valuesCheck', (result) => {
                setShowModal(result);
            });
        };

        // Initial call
        handleSocketEvents();

        // Set up interval to call handleSocketEvents every 10 seconds
        const interval = setInterval(() => {
            if (token) {
                socket.emit('verifyToken', token);
            }
        }, 10000); // 10 seconds in milliseconds

        // Clean up interval and socket event listeners on component unmount
        return () => {
            clearInterval(interval);
            socket.off('connect');
            socket.off('connect_error');
            socket.off('valuesCheck');
        };
    }, []);

    return (
        <div>
            <ToastContainer />
            {showModal && (
                <div>
                    <Model3 />
                </div>
            )}
        </div>
    );
};

export default App;

import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

function AudioDetector() {
    const [alert, setAlert] = useState(false);
    const [count, setCount] = useState(0); // Initialize Count variable

    useEffect(() => {
        const audioContext = new AudioContext();
        const analyzer = audioContext.createAnalyser();
        analyzer.fftSize = 256;
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyzer);
                const bufferLength = analyzer.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                const checkAudio = () => {
                    analyzer.getByteFrequencyData(dataArray);
                    const avg = dataArray.reduce((acc, val) => acc + val) / bufferLength;
                    if (avg > 100) { // adjust this threshold to suit your needs
                        setAlert(true);
                        setCount(prevCount => prevCount + 1); // Increment Count variable
                        // Hit the backend endpoint using fetch
                        fetch('https://first-project-backend-ycff.onrender.com/voice', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('usersdatatoken')}` // Assuming token is saved in localStorage
                            },
                            body: JSON.stringify({ Voice: true })
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Success:', data);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    } else {
                        setAlert(false);
                    }
                    requestAnimationFrame(checkAudio);
                };
                checkAudio();
            })
            .catch(error => {
                console.error('Error accessing audio stream:', error);
            });
    }, []);

    return (
        <div>
            {alert && <p>Voice detected! Count: {count}</p>}
        </div>
    );
}

export default AudioDetector;

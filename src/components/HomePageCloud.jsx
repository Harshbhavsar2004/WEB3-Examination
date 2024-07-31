
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import Webcam from 'react-webcam'
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { LoginContext } from './ContextProvider/Context';

// import { useCallback } from "react";

import "./HomePage.css";

const WebcamComponent = () => <Webcam />
const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
}
const Profile = () => {
    const handle = useFullScreenHandle();
    const [picture, setPicture] = useState('')
    const webcamRef = React.useRef(null)
    const capture = React.useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot()
        setPicture(pictureSrc)
    })

    // ***************************************** Logout Function **********************************************
    const { logindata, setLoginData } = useContext(LoginContext);

    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const logoutuser = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("https://block-chain-backend.onrender.com/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (data.status === 201) {
            console.log("User Logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
        } else {
            console.log("Error");
        }
    }
    // *************************************************************************************************

    const location = useLocation()

    return (
        <div className='home_container'>
            <div className="text-center">

                <Link to="/">
                    {/* <button className="log-button"> Log out </button> */}
                    <button className="log-button" onClick={() => {
                                        logoutuser()
                                        handleClose()
                                    }}> Log out </button>
                </Link>

            </div>

            <h2 className="title_text-center"> Capture Your Image </h2>
            <br />
            <div>
                {picture === '' ? (
                    <Webcam
                        audio={false}
                        height={400}
                        ref={webcamRef}
                        width={400}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                ) : (
                    <img src={picture} />
                )}
            </div>
            <div>
                {picture !== '' ? (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setPicture('')
                        }}
                        className="btn btn-primary"
                    >
                        Retake
                    </button>
                ) : (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            capture()
                        }}
                        className="btn btn-danger"
                    >
                        Capture
                    </button>
                )}

            </div>

            <p><br />
                <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all Terms & Conditions </span>.
            </p>

            {/* <div className="text-center">
            <FullScreen handle={handle}>
            <Link to="/ExamPage">
                <button onClick={handle.enter} className="start-button">Start Exam</button>
            </Link>
            </FullScreen>
        </div> */}

            <div className="text-center">
                <FullScreen handle={handle}>
                    <Link to="/eappcloud">
                        <button onClick={handle.enter} className="start-button"> Start Exam </button>
                    </Link>
                </FullScreen>
            </div>

            {/* <div className="text-center">
            <FullScreen handle={handle}>
            <Link to="/testpage">
                <button onClick={handle.enter} className="start-button">Start Exam</button>
            </Link>
            </FullScreen>
        </div> */}

        </div>
    )
}
export default Profile


// 9999999999999999999999 [Perfectly working Code with compare images function] 99999999999999999999999999999999999999999

// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Webcam from 'react-webcam';
// import { FullScreen, useFullScreenHandle } from 'react-full-screen';
// import axios from 'axios';
// import { LoginContext } from './ContextProvider/Context';
// import * as faceapi from 'face-api.js';
// import './HomePage.css';

// const videoConstraints = {
//     width: 400,
//     height: 400,
//     facingMode: 'user',
// };

// const Profile = () => {
//     const { logindata, setLoginData } = useContext(LoginContext);
//     const [data, setData] = useState(false);
//     const history = useNavigate();
//     const [photoUrl, setPhotoUrl] = useState('');
//     const handle = useFullScreenHandle();
//     const webcamRef = React.useRef(null);
//     const [picture, setPicture] = useState('');
//     const [matchStatus, setMatchStatus] = useState('');
//     const [modelsLoaded, setModelsLoaded] = useState(false);
//     const [isChecked, setIsChecked] = useState(false);


//     // Logout Function

//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };


//     const logoutuser = async () => {
//         let token = localStorage.getItem("usersdatatoken");

//         const res = await fetch("/logout", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": token,
//                 Accept: "application/json"
//             },
//             credentials: "include"
//         });

//         const data = await res.json();
//         console.log(data);

//         if (data.status === 201) {
//             console.log("User Logout");
//             localStorage.removeItem("usersdatatoken");
//             setLoginData(false)
//             history("/");
//         } else {
//             console.log("Error");
//         }
//     }


//     // Load Models to compare images

//     useEffect(() => {
//         const loadModels = async () => {
//             const MODEL_URL = '/models';
//             await Promise.all([
//                 faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
//                 faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//                 faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
//                 faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//                 faceapi.nets.mtcnn.loadFromUri(MODEL_URL),
//                 faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//                 faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
//                 faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
//             ]);
//             setModelsLoaded(true);
//         };
//         loadModels();
//     }, []);


//     // Realtime capture image function

//     const capture = React.useCallback(() => {
//         const pictureSrc = webcamRef.current.getScreenshot();
//         setPicture(pictureSrc);
//     }, [webcamRef, setPicture]);


//     // User Validation Function

//     const DashboardValid = async () => {
//         let token = localStorage.getItem('usersdatatoken');
//         const res = await fetch('/validuser', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: token,
//             },
//         });
//         const data = await res.json();
//         if (data.status === 401 || !data) {
//             history.push('*');
//         } else {
//             console.log('user verify');
//             setLoginData(data);
//             setData(data);
//             const photoPath = data.ValidUserOne.photo;
//             const photoUrl = `${process.env.REACT_APP_PHOTO_PATH}/${photoPath}`;
//             setPhotoUrl(photoUrl);
//             history.push('/home');
//         }
//     };

//     useEffect(() => {
//         setTimeout(() => {
//             DashboardValid();
//             setData(true);
//         }, 2000);
//     }, []);


//     // Compare Stored Image & Capture Image Function

//     const compareImages = async () => {
//         try {
//             if (!modelsLoaded) {
//                 console.log('Models not loaded yet!');
//                 return;
//             }

//             // Load the captured image and detect all faces in it.
//             const image = await faceapi.fetchImage(picture);
//             const faceDetections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
//             if (!faceDetections.length) {
//                 console.log('No faces detected in the captured image!');
//                 alert('No faces detected in the captured image!');
//                 return;
//             }

//             // Load the stored image and detect all faces in it.
//             const storedImage = await faceapi.fetchImage(photoUrl);
//             const storedFaceDetections = await faceapi.detectAllFaces(storedImage).withFaceLandmarks().withFaceDescriptors();

//             if (!storedFaceDetections.length) {
//                 console.log('No faces detected in the stored image!');
//                 alert('No faces detected in the stored image!');
//                 return;
//             }

//             // Create a FaceMatcher object with all the face descriptors from the stored image.
//             const faceMatcher = new faceapi.FaceMatcher(storedFaceDetections);

//             // Match each face in the captured image to the stored faces.
//             const matchResults = faceDetections.map((faceDetection) => faceMatcher.findBestMatch(faceDetection.descriptor));

//             // Determine the best match based on the distance between the face descriptors.
//             const bestMatch = matchResults.reduce((prev, current) => (prev.distance < current.distance ? prev : current));

//             if (bestMatch.label === 'unknown') {
//                 console.log('Face not matched!');
//                 setMatchStatus('Face not matched!');
//             } else {
//                 console.log(`Face matched with ${bestMatch.label}!`);
//                 setMatchStatus(`Face matched with ${logindata ? logindata.ValidUserOne.fname + ' ' + logindata.ValidUserOne.lname : ''}!`);
                
//             }
//         } catch (error) {
//             console.log('Error: ', error);
//         }
//     };


//     return (
//         <div className="home_container">
//             <div className="text-center">
//                 <Link to="/">
//                     <button
//                         className="log-button"
//                         onClick={() => {
//                             logoutuser();
//                             handleClose();
//                         }}
//                     >
//                         Log out
//                     </button>
//                 </Link>
//             </div>
//             <h2 className="title_text-center"> Capture Your Image </h2>
//             <br />
//             {matchStatus ? (
//                 <p style={{ color: matchStatus.includes("not") ? "red" : "green", fontWeight: "bold" }}>
//                     {matchStatus}
//                 </p>
//             ) : null}

//             <br />
//             <div>
//                 {picture === "" ? (
//                     <Webcam
//                         audio={false}
//                         height={400}
//                         ref={webcamRef}
//                         width={400}
//                         screenshotFormat="image/jpeg"
//                         videoConstraints={videoConstraints}
//                     />
//                 ) : (
//                     <img src={picture} alt="captured" />
//                 )}
//             </div>
//             <div>
//                 {picture !== "" ? (
//                     <button
//                         onClick={(e) => {
//                             e.preventDefault();
//                             setPicture("");
//                         }}
//                         className="btn btn-primary"
//                         disabled={matchStatus}
//                     >
//                         Retake
//                     </button>
//                 ) : (
//                     <button
//                         onClick={(e) => {
//                             e.preventDefault();
//                             capture();
//                         }}
//                         className="btn btn-danger"
//                     >
//                         Capture
//                     </button>
//                 )}
//                 <button
//                     onClick={(e) => {
//                         e.preventDefault();
//                         compareImages();
//                     }}
//                     className="btn btn-success"
//                     disabled={picture === "" || matchStatus}
//                     // disabled={matchStatus}
//                 >
//                     Compare Images
//                 </button>
//             </div>
//             <p>
//                 <br />
//                 <input type="checkbox" name="checkbox" id="checkbox" required disabled={!matchStatus || matchStatus.includes("not")} onChange={(e) => setIsChecked(e.target.checked)}
//                     title={
//                         !matchStatus
//                             ? "Please capture your image and click Compare Images first"
//                             : matchStatus.includes("not")
//                                 ? "Images do not match, please try again"
//                                 : ""
//                     } />{" "}
//                 <span style={{ color: !matchStatus ? "gray" : "inherit" }}>I agree to all Terms & Conditions.</span>
//             </p>
//             <div className="text-center">
//                 <FullScreen handle={handle}>
//                     <Link to="/eapp">
//                         <button onClick={handle.enter} disabled={!isChecked} className="start-button"
//                             title={
//                                 isChecked
//                                     ? "Click to start the exam"
//                                     : "Please agree to the Terms & Conditions first"
//                             }
//                         >
//                             Start Exam
//                         </button>
//                     </Link>
//                 </FullScreen>
//             </div>
//         </div>
//     );

// }
// export default Profile

// // 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999

// 22222222222222222222222222 [Perfectly working Code with compare images function with Single Face Detection] 2222222222222222222222222222222222222222222222222222222222222222222
// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Webcam from 'react-webcam';
// import { FullScreen, useFullScreenHandle } from 'react-full-screen';
// import axios from 'axios';
// import { LoginContext } from './ContextProvider/Context';
// import * as faceapi from 'face-api.js';
// import './HomePage.css';

// const WebcamComponent = () => <Webcam />;

// const videoConstraints = {
//     width: 400,
//     height: 400,
//     facingMode: 'user',
// };

// const Profile = () => {
//     const { logindata, setLoginData } = useContext(LoginContext);
//     const [data, setData] = useState(false);
//     const history = useNavigate();
//     const [photoUrl, setPhotoUrl] = useState('');
//     const handle = useFullScreenHandle();
//     const webcamRef = useRef(null);
//     const [picture, setPicture] = useState('');
//     const [matchStatus, setMatchStatus] = useState('');
//     const [modelsLoaded, setModelsLoaded] = useState(false);
//     const [isChecked, setIsChecked] = useState(false);

//     // Logout Function

//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const logoutuser = async () => {
//         let token = localStorage.getItem("usersdatatoken");

//         const res = await fetch("/logout", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": token,
//                 Accept: "application/json"
//             },
//             credentials: "include"
//         });

//         const data = await res.json();
//         console.log(data);

//         if (data.status === 201) {
//             console.log("User Logout");
//             localStorage.removeItem("usersdatatoken");
//             setLoginData(false)
//             history("/");
//         } else {
//             console.log("Error");
//         }
//     };

//     // Load Models to compare images
//     useEffect(() => {
//         const loadModels = async () => {
//             const MODEL_URL = '/models';
//             await Promise.all([
//                 faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
//                 faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//                 faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
//                 faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//                 faceapi.nets.mtcnn.loadFromUri(MODEL_URL),
//                 faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//                 faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
//                 faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
//             ]);
//             setModelsLoaded(true);
//         };
//         loadModels();
//     }, []);

//     // Realtime capture image function
//     const capture = React.useCallback(() => {
//         const pictureSrc = webcamRef.current.getScreenshot();
//         setPicture(pictureSrc);
//     });

//     // User Validation Function
//     const DashboardValid = async () => {
//         let token = localStorage.getItem('usersdatatoken');
//         const res = await fetch('/validuser', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: token,
//             },
//         });
//         const data = await res.json();
//         if (data.status === 401 || !data) {
//             history.push('*');
//         } else {
//             console.log('user verify');
//             setLoginData(data);
//             setData(data);
//             const photoPath = data.ValidUserOne.photo;
//             const photoUrl = `${process.env.REACT_APP_PHOTO_PATH}/${photoPath}`;
//             setPhotoUrl(photoUrl);
//             history.push('/dash');
//         }
//     };

//     useEffect(() => {
//         setTimeout(() => {
//             DashboardValid();
//             setData(true);
//         }, 2000);
//     }, []);

//     // Compare Stored Image & Capture Image Function
//     const compareImages = async () => {
//         try {
//             if (!modelsLoaded) {
//                 console.log('Models not loaded yet!');
//                 return;
//             }

//             // Load the captured image and detect a single face in it.
//             const image = await faceapi.fetchImage(picture);
//             const faceDetection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
//             if (!faceDetection) {
//                 console.log('No face detected in the captured image!');
//                 alert('No face detected in the captured image!');
//                 return;
//             }

//             // Load the stored image and detect a single face in it.
//             const storedImage = await faceapi.fetchImage(photoUrl);
//             const storedFaceDetection = await faceapi.detectSingleFace(storedImage).withFaceLandmarks().withFaceDescriptor();
//             if (!storedFaceDetection) {
//                 console.log('No face detected in the stored image!');
//                 alert('No face detected in the stored image!');
//                 return;
//             }

//             // Create a FaceMatcher object with the face descriptor from the stored face.
//             const faceMatcher = new faceapi.FaceMatcher([storedFaceDetection]);

//             // Match the captured face to the stored face.
//             const matchResult = faceMatcher.findBestMatch(faceDetection.descriptor);

//             if (matchResult.label === 'unknown') {
//                 console.log('Face not matched!');
//                 setMatchStatus('Face not matched!');
//             } else {
//                 console.log(`Face matched with ${matchResult.label}!`);
//                 setMatchStatus(`Face matched with ${logindata ? logindata.ValidUserOne.fname + ' ' + logindata.ValidUserOne.lname : ''}!`);
//             }
//         } catch (error) {
//             console.log('Error: ', error);
//         }
//     };
//     return (
//         <div className="home_container">
//             <div className="text-center">
//                 <Link to="/">
//                     <button
//                         className="log-button"
//                         onClick={() => {
//                             logoutuser();
//                             handleClose();
//                         }}
//                     >
//                         Log out
//                     </button>
//                 </Link>
//             </div>
//             <h2 className="title_text-center"> Capture Your Image </h2>
//             <br />
//             {matchStatus ? (
//                 <p style={{ color: matchStatus.includes("not") ? "red" : "green", fontWeight: "bold" }}>
//                     {matchStatus}
//                 </p>
//             ) : null}

//             <br />
//             <div>
//                 {picture === "" ? (
//                     <Webcam
//                         audio={false}
//                         height={400}
//                         ref={webcamRef}
//                         width={400}
//                         screenshotFormat="image/jpeg"
//                         videoConstraints={videoConstraints}
//                     />
//                 ) : (
//                     <img src={picture} alt="captured" />
//                 )}
//             </div>
//             <div>
//                 {picture !== "" ? (
//                     <button
//                         onClick={(e) => {
//                             e.preventDefault();
//                             setPicture("");
//                         }}
//                         className="btn btn-primary"
//                         disabled={matchStatus.includes("Face matched with")}
//                     >
//                         Retake
//                     </button>
//                 ) : (
//                     <button
//                         onClick={(e) => {
//                             e.preventDefault();
//                             capture();
//                         }}
//                         className="btn btn-danger"
//                     >
//                         Capture
//                     </button>
//                 )}
//                 <button
//                     onClick={(e) => {
//                         e.preventDefault();
//                         compareImages();
//                     }}
//                     className="btn btn-success"
//                     disabled={picture === "" || matchStatus.includes("Face matched with")}
//                 >
//                     Verify
//                 </button>
//             </div>
//             <p>
//                 <br />
//                 <input type="checkbox" name="checkbox" id="checkbox" required disabled={!matchStatus || matchStatus.includes("not")} onChange={(e) => setIsChecked(e.target.checked)}
//                     title={
//                         !matchStatus
//                             ? "Please capture your image and click Verify first"
//                             : matchStatus.includes("not")
//                                 ? "Images do not match, please try again"
//                                 : ""
//                     } />{" "}
//                 <span style={{ color: !matchStatus ? "gray" : "inherit" }}>I agree to all Terms & Conditions.</span>
//             </p>
//             <div className="text-center">
//                 <FullScreen handle={handle}>
//                     <Link to="/eapp">
//                         <button onClick={handle.enter} disabled={!isChecked} className="start-button"
//                             title={
//                                 isChecked
//                                     ? "Click to start the exam"
//                                     : "Please agree to the Terms & Conditions first"
//                             }
//                         >
//                             Start Exam
//                         </button>
//                     </Link>
//                 </FullScreen>
//             </div>
//         </div>
//     );

// }
// export default Profile

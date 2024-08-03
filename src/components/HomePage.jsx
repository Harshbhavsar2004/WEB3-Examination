import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { LoginContext } from "./ContextProvider/Context";
import * as faceapi from "face-api.js";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCamera, faRetweet, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import "./HomePage.css";

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

const Profile = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const [data, setData] = useState(false);
  const history = useNavigate();
  const [photoUrl, setPhotoUrl] = useState("");
  const handle = useFullScreenHandle();
  const webcamRef = useRef(null);
  const [picture, setPicture] = useState("");
  const [matchStatus, setMatchStatus] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false); // Add state for celebration

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.mtcnn.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  }, [webcamRef, setPicture]);

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("https://examination-center.onrender.com/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await res.json();
    if (data.status === 401 || !data) {
      history.push("*");
    } else {
      setLoginData(data);
      setData(data);
      setPhotoUrl(data.ValidUserOne.photo);
      history.push("/dash");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  const compareImages = async () => {
    setLoading(true);
    try {
      if (!modelsLoaded) {
        console.log("Models not loaded yet!");
        return;
      }

      const image = await faceapi.fetchImage(picture);
      const faceDetections = await faceapi
        .detectAllFaces(image)
        .withFaceLandmarks()
        .withFaceDescriptors();
      if (!faceDetections.length) {
        console.log("No faces detected in the captured image!");
        toast.error("No faces detected in the captured image!", { position: 'bottom-right' });
        return;
      }

      const storedImage = await faceapi.fetchImage(photoUrl);
      const storedFaceDetections = await faceapi
        .detectAllFaces(storedImage)
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (!storedFaceDetections.length) {
        console.log("No faces detected in the stored image!");
        toast.error("No faces detected in the stored image!", { position: 'bottom-right' });
        return;
      }

      const faceMatcher = new faceapi.FaceMatcher(storedFaceDetections);
      const matchResults = faceDetections.map((faceDetection) =>
        faceMatcher.findBestMatch(faceDetection.descriptor)
      );

      const bestMatch = matchResults.reduce((prev, current) =>
        prev.distance < current.distance ? prev : current
      );

      if (bestMatch.label === "unknown") {
        console.log("Face not matched!");
        setMatchStatus("Face not matched!");
        toast.error("Face not matched!", { position: 'bottom-right' });
      } else {
        console.log(`Face matched with ${bestMatch.label}!`);
        setMatchStatus(`Face matched with ${logindata ? logindata.ValidUserOne.fname : null}!`);
        toast.success(`Face matched with ${logindata ? logindata.ValidUserOne.fname : ""}!`, { position: 'bottom-right' });
        setShowCelebration(true); // Show celebration on successful match
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("An error occurred while comparing images!", { position: 'bottom-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home_container">
      <Toaster position="top-center" reverseOrder={false} />
      <Link to="/dash">
        <button className="go-back-btn">
          <FontAwesomeIcon icon={faHome} className="icon" />
          GO back to DashBoard
        </button>
      </Link>

      <h2 className="title_text-center">Capture Your Image</h2>
      <br />
      {matchStatus ? (
        <p style={{ color: matchStatus.includes("not") ? "red" : "green", fontWeight: "bold" }}>
          {matchStatus}
        </p>
      ) : null}

      <br />
      <div>
        {picture === "" ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} alt="captured" />
        )}
      </div>
      <div className="button-container">
        {picture !== "" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setPicture("");
            }}
            className="btn btn-primary"
            disabled={matchStatus.includes("Face matched with")}
          >
            <FontAwesomeIcon icon={faRetweet} className="icon" />
            Retake
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="btn btn-danger"
          >
            <FontAwesomeIcon icon={faCamera} className="icon" />
            Capture
          </button>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            compareImages();
          }}
          className="btn btn-success"
          disabled={picture === "" || matchStatus.includes("Face matched with")}
        >
          <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
          verify
          {loading && <div>...</div>}
        </button>
      </div>
      <p>
        <br />
        <input
          type="checkbox"
          name="checkbox"
          id="checkbox"
          required
          disabled={!matchStatus || matchStatus.includes("not")}
          onChange={(e) => setIsChecked(e.target.checked)}
          title={
            !matchStatus
              ? "Please capture your image and click Verify first"
              : matchStatus.includes("not")
                ? "Images do not match, please try again"
                : ""
          }
        />{" "}
        <span style={{ color: !matchStatus ? "gray" : "inherit" }}>
          I agree to all Terms & Conditions.
        </span>
      </p>
      <div className="text-center">
        <FullScreen handle={handle}>
          <Link to="/eapp">
            <button
              onClick={handle.enter}
              disabled={!isChecked}
              className="start-button"
              title={
                isChecked
                  ? "Click to start the exam"
                  : "Please agree to the Terms & Conditions first"
              }
            >
              Start Exam
            </button>
          </Link>
        </FullScreen>
      </div>
      {/* {showCelebration && (
        <div className="celebration">
          <div className="message">Congratulations!</div>
          <div className="confetti"></div>
        </div>
      )} */}
    </div>
  );
};

export default Profile;

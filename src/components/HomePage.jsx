import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import axios from "axios";
import { LoginContext } from "./ContextProvider/Context";
import * as faceapi from "face-api.js";
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

  // Load Models to compare images
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

  // Realtime capture image function
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  }, [webcamRef, setPicture]);

  // User Validation Function
  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("http://localhost:3000/validuser", {
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
      console.log("user verify");
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

  // Compare Stored Image & Capture Image Function
  const compareImages = async () => {
    try {
      if (!modelsLoaded) {
        console.log("Models not loaded yet!");
        return;
      }

      // Load the captured image and detect all faces in it.
      const image = await faceapi.fetchImage(picture);
      const faceDetections = await faceapi
        .detectAllFaces(image)
        .withFaceLandmarks()
        .withFaceDescriptors();
      if (!faceDetections.length) {
        console.log("No faces detected in the captured image!");
        alert("No faces detected in the captured image!");
        return;
      }

      // Load the stored image and detect all faces in it.
      const storedImage = await faceapi.fetchImage(photoUrl);
      const storedFaceDetections = await faceapi
        .detectAllFaces(storedImage)
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (!storedFaceDetections.length) {
        console.log("No faces detected in the stored image!");
        alert("No faces detected in the stored image!");
        return;
      }

      // Create a FaceMatcher object with all the face descriptors from the stored image.
      const faceMatcher = new faceapi.FaceMatcher(storedFaceDetections);

      // Match each face in the captured image to the stored faces.
      const matchResults = faceDetections.map((faceDetection) =>
        faceMatcher.findBestMatch(faceDetection.descriptor)
      );

      // Determine the best match based on the distance between the face descriptors.
      const bestMatch = matchResults.reduce((prev, current) =>
        prev.distance < current.distance ? prev : current
      );

      if (bestMatch.label === "unknown") {
        console.log("Face not matched!");
        setMatchStatus("Face not matched!");
      } else {
        console.log(`Face matched with ${bestMatch.label}!`);
        setMatchStatus(
          `Face matched with ${
            logindata
              ? logindata.ValidUserOne.fname +
                " " +
                logindata.ValidUserOne.lname
              : ""
          }!`
        );
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="home_container">
      <Link to="/dash">
        <button className="themainchange">
          GO back to DashBoard
        </button>
      </Link>

      <h2 className="title_text-center"> Capture Your Image </h2>
      <br />
      {matchStatus ? (
        <p
          style={{
            color: matchStatus.includes("not") ? "red" : "green",
            fontWeight: "bold",
          }}
        >
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
      <div>
        {picture !== "" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setPicture("");
            }}
            className="btn btn-primary"
            disabled={matchStatus.includes("Face matched with")}
          >
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
          Verify
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
        <FullScreen handle={handle} >
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
    </div>
  );
};
export default Profile;

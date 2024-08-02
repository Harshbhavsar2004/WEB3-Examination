
// ---------------------------------------(this code perfectly works)------------------------------------------------------
import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';

import Header from "./Header";
import "./mix.css"


const Register = () => {

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        dob: "",
        course: "",
        batch: "",
        gender: "",
        nationality: "",
        password: "",
        cpassword: "",
        photo: "",
        sign: "",
    });

    const courses = [
        { id: 1, name: "Bachelor of Engineering (BE)" },
        { id: 2, name: "Bachelor of Technology (B Tech)" },
        { id: 3, name: "Bachelor of Science (BSc)" },
        { id: 4, name: "Bachelor of Pharmacy (B Pharm)" },
        { id: 5, name: "Bachelor of Computer Application (BCA)" },
        { id: 6, name: "Master of Engineering (ME)" },
        { id: 7, name: "Master of Technology (M Tech)" },
        { id: 8, name: "Master of Science (MSc)" },
        { id: 9, name: "Master of Pharmacy (M Pharm)" },
        { id: 10, name: "Master of Computer Application (MCA)" },
        { id: 11, name: "Master of Business Administration (MBA)" },
    ];

    const batches = [
        { id: 1, name: "2023" },
        { id: 2, name: "2024" },
        { id: 3, name: "2025" },
        { id: 4, name: "2026" },
    ];

    const genders = [
        { id: 1, name: "Male" },
        { id: 2, name: "Female" },
        { id: 3, name: "Other" },
        { id: 4, name: "Prefer Not to Say" },
    ];

    const nationalities = [
        { id: 1, name: "Indian" },
        { id: 2, name: "Non Resident Indian (NRI)" },
    ];



    const setVal = (e) => {
        if (e.target.type === 'file') {
            setInpval({ ...inpval, [e.target.name]: e.target.files[0] });
        } else {
            setInpval({ ...inpval, [e.target.name]: e.target.value });
        }
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname, lname, email, phone, dob, course, batch, gender, nationality, password, cpassword, photo, sign } = inpval;

        try {
            if (fname === "") {
                toast.warning("First Name is required!", {
                    position: "top-center"
                });
            } else if (lname === "") {
                toast.error("Last Name is required!", {
                    position: "top-center"
                });
            } else if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
                toast.warning("Please enter a valid email address!", {
                    position: "top-center"
                });
            } else if (!/^[0-9]{10}$/.test(phone)) {
                toast.error("Please enter a valid phone number!", {
                    position: "top-center"
                });
            } else if (dob === "") {
                toast.warning("Date of Birth is required!", {
                    position: "top-center"
                });
            } else if (course === "") {
                toast.warning("Course is required!", {
                    position: "top-center"
                });
            } else if (batch === "") {
                toast.warning("Batch is Required!", {
                    position: "top-center"
                });
            } else if (gender === "") {
                toast.warning("Select Your Gender!", {
                    position: "top-center"
                });
            } else if (nationality === "") {
                toast.warning("Nationality is required!", {
                    position: "top-center"
                });
            } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
                toast.error("Password must contain at least 6 characters including at least one letter and one number!", {
                    position: "top-center"
                });
            } else if (password !== cpassword) {
                toast.error("Password and Confirm Password are not matching!", {
                    position: "top-center"
                });
            } else if (photo === "") {
                toast.warning("Upload Photo!", {
                    position: "top-center"
                });
            } else if (sign === "") {
                toast.warning("Upload Sign!", {
                    position: "top-center"
                });
            } else {
                const formData = new FormData();
                formData.append("photo", inpval.photo, inpval.photo.name);
                formData.append("sign", inpval.sign, inpval.sign.name);
                formData.append("fname", inpval.fname);
                formData.append("lname", inpval.lname);
                formData.append("email", inpval.email);
                formData.append("phone", inpval.phone);
                formData.append("dob", inpval.dob);
                formData.append("course", inpval.course);
                formData.append("batch", inpval.batch);
                formData.append("gender", inpval.gender);
                formData.append("nationality", inpval.nationality);
                formData.append("password", inpval.password);
                formData.append("cpassword", inpval.cpassword);

                const data = await fetch("http://localhost:3000/register", {
                    method: "POST",
                    // headers: {
                    //     "Content-Type": "application/json"
                    // },
                    body: formData
                });

                const res = await data.json();

                if (res.status === 201) {
                    toast.success("Registration Successfully done 😃!", {
                        position: "top-center"
                    });
                    setInpval({ ...inpval, fname: "", lname: "", email: "", phone: "", dob: "", course: "", batch: "", gender: "", nationality: "", password: "", cpassword: "", photo: "", sign: "" });
                    setTimeout(()=>{
                        window.location.href = "/login";
                    },1500)
                }
            }
        } catch (error) {
            toast.error("Network error occurred, please try again later 😔!", {
                position: "top-center"
            });
        }
    }


    return (
        <>
            <Header />
            <section>

                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br />
                            your tasks! We hope that you will get like it.</p>
                    </div>

                    <form>
                        <div className='form_input'>
                            <label htmlFor='fname'> First Name </label>
                            <input type='fname' onChange={setVal} value={inpval.fname} name='fname' id='fname' placeholder='Enter Your First Name' />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='lname'> Last Name </label>
                            <input type='lname' onChange={setVal} value={inpval.lname} name='lname' id='lname' placeholder='Enter Your Last Name' />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='email'> Email </label>
                            <input type='email' onChange={setVal} value={inpval.email} name='email' id='email' placeholder='Enter Your Email Address' />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='phone'> Phone </label>
                            <input type='phone' onChange={setVal} value={inpval.phone} name='phone' id='phone' placeholder='Enter Your Phone Number' />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='dob'> Date of Birth </label>
                            <input type='date' onChange={setVal} value={inpval.dob} name='dob' id='dob' placeholder='Enter Your Date of Birth' />
                        </div>

                        <div className="form_input_select">
                            <label htmlFor="course">Select Course</label>
                            <select name="course" id="course" value={inpval.course} onChange={setVal} placeholder="Select your Course" >
                                <option value="" enabled>
                                    Select Your Course
                                </option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.name}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form_input_select">
                            <label htmlFor="batch">Select Batch</label>
                            <select name="batch" id="batch" value={inpval.batch} onChange={setVal} placeholder="Select your Passout Batch" >
                                <option value="" enabled>
                                    Select your Passout Batch
                                </option>
                                {batches.map((batch) => (
                                    <option key={batch.id} value={batch.name}>
                                        {batch.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form_input_select">
                            <label htmlFor="gender">Select Gender</label>
                            <select name="gender" id="gender" value={inpval.gender} onChange={setVal} placeholder="Select your Gender" >
                                <option value="" enabled>
                                    Select your Gender
                                </option>
                                {genders.map((gender) => (
                                    <option key={gender.id} value={gender.name}>
                                        {gender.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form_input_select">
                            <label htmlFor="nationality">Select Nationality</label>
                            <select name="nationality" id="nationality" value={inpval.nationality} onChange={setVal} placeholder="Select Your Nationality" >
                                <option value="" enabled>
                                    Select Your Nationality
                                </option>
                                {nationalities.map((nationality) => (
                                    <option key={nationality.id} value={nationality.name}>
                                        {nationality.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'> Password </label>
                            <div className='two'>
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name='password' id='password' placeholder='Create New Password' />
                                <div className='showpass' onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label for="photo"> Upload Photo </label>
                        </div>
                        <button className="upload-btn" variant="contained" component="label">
                            <div className="form-field">
                                <input type="file" onChange={setVal} name='photo' id='photo' />
                            </div>
                        </button> <br />

                        <div className="form_input">
                            <label for="sign"> Upload Sign </label>
                        </div>
                        <button className="upload-btn" variant="contained" component="label">
                            <div className="form-field">
                                <input type="file" onChange={setVal} name="sign" id='sign' />
                            </div>
                        </button>

                        <p><br />
                            <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="/policy" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                        </p><br />

                        <button className='btn' onClick={addUserdata} >Sign Up</button>
                        <p style={{ color: "black", fontWeight: "bold" }}>Already have an account? <NavLink to="/login"> Log In </NavLink> </p>
                    </form>
                    <br />
                    <p style={{ color: "black", fontWeight: "bold" }}><NavLink to="/">Back To Home Page</NavLink></p>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Register

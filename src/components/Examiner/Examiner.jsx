import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import Header from "../Header";
import "../mix.css"
import "./examinerdashboard.css"

const Examiner = () => {

    const [passShow, setPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });

    const history = useNavigate();

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const loginuser = async (e) => {
        e.preventDefault();

        const { email, password } = inpval;

        if (email === "") {
            // alert("Email is required!")
            toast.error("Email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            // alert("Includes @ in your email!")
            toast.error("Includes @ in your email!", {
                position: "top-center"
            });
        } else if (password === "") {
            // alert("Password is required!")
            toast.error("Password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            // alert("Password must be 6 char!")
            toast.error("Password must be 6 char!", {
                position: "top-center"
            });
        } else {
             console.log("user login succesfully done");

          
            //  console.log(res);

            if (email == "test@gmail.com" && password == "pass123") {
                toast.success('Logged in successfully!', {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                      background: '#fff',
                      color: '#000',
                      fontWeight: 'bold',
                    },
                  });
          
                setTimeout(()=>{
                    history("/examinerdash")
                },1000)
                setInpval({ ...inpval, email: "", password: "" });
            } else {
                // alert("Invalid Credentials!")
                toast.error("Invalid Credentials", {
                    position: "top-center"
                });
            }

        }
    }

    return (
        <>
            <Header />
            <section>
                <Toaster />
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Examiner Login</h1>
                    </div>

                    <form>
                        <div className='form_input'>
                            <label htmlFor='email'> Email </label>
                            <input type='email' value={inpval.email} onChange={setVal} name='email' id='email' placeholder='Enter Your Email Address' />
                        </div>
                        <div className='form_input'>
                            <label htmlFor='password'> Password </label>
                            <div className='two'>
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name='password' id='password' placeholder='Enter Your Password' />
                                <div className='showpass' onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={loginuser}>Login</button>
                       </form>
                    <br />
                    <p style={{ color: "black", fontWeight: "bold" }}><NavLink to="/">Back To Home Page</NavLink></p>
                    {/* <ToastContainer /> */}
                </div>
            </section>
        </>
    )
}

export default Examiner

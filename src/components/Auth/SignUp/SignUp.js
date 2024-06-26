import React, { useState } from 'react';
import './SignUp.css';
import Navbar from '../../Layout/Navbar/Navbar';
import { useForm } from 'react-hook-form';
import image from '../../Assets/img5.jpg';
import { useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/AuthAction';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/API';
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onTouched" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [toggle1, setToggle1] = useState(false);

    const onSubmit = (data, e) => {
        e.preventDefault();
        dispatch(setLoader());
        dispatch(actionCreators.userEmail(data.email));
        dispatch(actionCreators.userPass(data.password));
        localStorage.setItem("email", data.email);

        const obj = { email: data.email };

        AuthService.Signup(obj)
            .then((res) => {
                dispatch(UnsetLoader());
                console.log(res);
                navigate("/otp");
            })
            .catch((error) => {
                dispatch(UnsetLoader());
                console.error(error);
            });
    };

    const handleClicked = () => {
        navigate("/login");
    };

    return (
        <div className='Signup-Page'>
            <div className='Navbar-Signup'>
                <Navbar />
            </div>
            <div className='middle-portion'>
                <div className='Main-heading'>
                    <p>Hate Never Ending Queues <span className='ques'>?</span></p>
                </div>
                <form className='input-login' onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-container'>
                        <div className='email'>
                            <input
                                className='input-field'
                                type="email"
                                placeholder='Enter Email Address'
                                name="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i,
                                        message: "This is not a valid email"
                                    }
                                })}
                            />
                            <p className='alerts'>{errors.email?.message}</p>
                        </div>
                    </div>
                    <div className='form-container'>
                        <div className='password'>
                            <i id="passlock" className="fa fa-eye" aria-hidden="true"></i>
                            {toggle
                                ? <i id='passlock' className="fa fa-eye-slash" aria-hidden="true" onClick={() => setToggle(!toggle)}></i>
                                : <i id="passlock" className="fa fa-eye" aria-hidden="true" onClick={() => setToggle(!toggle)}></i>
                            }
                            <input
                                className='input-field'
                                type={toggle ? "text" : "password"}
                                placeholder='Enter New Password'
                                name="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be more than 8 characters"
                                    },
                                    maxLength: {
                                        value: 14,
                                        message: "Password cannot exceed more than 14 characters"
                                    }
                                })}
                            />
                            <p className='alerts'>{errors.password?.message}</p>
                        </div>
                    </div>
                    <div className='form-container'>
                        <div className='cpassword'>
                            <i id="passlock" className="fa fa-eye" aria-hidden="true"></i>
                            {toggle1
                                ? <i id='passlock' className="fa fa-eye-slash" aria-hidden="true" onClick={() => setToggle1(!toggle1)}></i>
                                : <i id="passlock" className="fa fa-eye" aria-hidden="true" onClick={() => setToggle1(!toggle1)}></i>
                            }
                            <input
                                className='input-field'
                                type={toggle1 ? "text" : "password"}
                                placeholder='Re-enter New Password'
                                name="cpassword"
                                {...register("cpassword", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be more than 8 characters"
                                    },
                                    maxLength: {
                                        value: 14,
                                        message: "Password cannot exceed more than 14 characters"
                                    }
                                })}
                            />
                            <p className='alerts'>{errors.cpassword?.message}</p>
                        </div>
                    </div>
                    <button className='signup-btn' type='submit'>Sign Up Now</button>
                    <p className='login-head'>Existing users <u onClick={handleClicked}>Login</u></p>
                </form>
            </div>
            <div className='queue-img'>
                <img className="pic" src={image} alt="logo" />
            </div>
        </div>
    );
};

export default SignUp;

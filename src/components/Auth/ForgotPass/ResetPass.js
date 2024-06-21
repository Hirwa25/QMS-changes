import React, { useState } from 'react';
import Navbar from '../../Layout/Navbar/Navbar';
import { useForm } from 'react-hook-form';
import image from '../../Assets/pic.svg';
import './ForgotPass.css';
import AuthService from '../../../services/API';

const ResetPass = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched"
    });
    const [toggle, setToggle] = useState(false);
    const [toggle1, setToggle1] = useState(false);

    const onSubmit = (data) => {
        const obj = {
            username: localStorage.getItem("emailj"),
            password: data.passwordr1,
            name: null,
            mob: null,
            gender: null,
            role: null
        };

        AuthService.resetpass(obj)
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
        <div className='Signup-Page'>
            <div className='Navbar-Signup'>
                <Navbar />
            </div>
            <div className='middle-portion'>
                <div className='login-heading'>
                    <p>Reset Password <span className='ques'>.</span></p>
                </div>
                <form className='input-login1' onSubmit={handleSubmit(onSubmit)}>
                    <div className='passwordr1'>
                        <i id="passlock" className={toggle ? "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true" onClick={() => setToggle(!toggle)}></i>
                        <input
                            className='input-field'
                            type={toggle ? "text" : "password"}
                            placeholder='Enter New Password'
                            {...register("passwordr1", {
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
                        <p className='alerts'>{errors.passwordr1?.message}</p>
                    </div>
                    <div className='passwordr2'>
                        <i id="passlock" className={toggle1 ? "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true" onClick={() => setToggle1(!toggle1)}></i>
                        <input
                            className='input-field'
                            type={toggle1 ? "text" : "password"}
                            placeholder='Re-enter New Password'
                            {...register("passwordr2", {
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
                        <p className='alerts'>{errors.passwordr2?.message}</p>
                    </div>
                    <button className='sendotp-btn' type='submit'>Finish</button>
                </form>
            </div>
            <div className='queue-img'>
                <img className="pic" src={image} alt="Illustration" />
            </div>
        </div>
    );
};

export default ResetPass;

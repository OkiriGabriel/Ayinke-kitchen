import React, { useEffect, useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import NavBar from '../../layouts/partials/NavBar'
import Alert from '../../layouts/partials/Alert'
import lottieData from '../../_data/check-green.json'
import LottiePlayer from '../../layouts/partials/LottiePlayer'
import ButtonSpinner from '../../layouts/partials/ButtonSpinner'

const ResetPassword = (props) => {
    
    const [pass, setPass] = useState('password');
    const [loading, setLoading] = useState(false);
    const [reset, setReset] = useState(false);
    const [resetData, setResetData] = useState({

        password: '',
        confirmPassword: ''
    })

    const [aData, setAData] = useState({
        type: '',
        message: '',
        show: false
    })

    const resetToken = props.match.params.resetToken;

    useEffect(() => {
    }, [])

    const showPass = (e) => {
        e.preventDefault();
        if(pass === 'password'){
            setPass('text');
        }else{
            setPass('password')
        }
    }

    const submit = async(e) => {

        e.preventDefault();

        if(!resetData.password || !resetData.confirmPassword){
            setAData({...aData, show: true, type: 'danger', message: 'All fields are required.'});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000)
        }else if(!resetData.password){
            setAData({...aData, show: true, type: 'danger', message: 'All fields are required.'});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000)

        }else if(!resetData.confirmPassword){
            setAData({...aData, show: true, type: 'danger', message: 'All fields are required.'});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000)
        }else{
            setLoading(true);

            // const b = {
            //     password: resetData
            // }

            try {

                await Axios.post(`${process.env.REACT_APP_API_URL}/auth/resetpassword/${resetToken}`, {...resetData})
                .then((resp) => {
                    
                    if(resp.data.error === false){

                   
                        
                        setReset(true);
                    }
                }).catch((err) => {
                    setAData({...aData, show: true, type: 'danger', message: `${err.response.data.message}`});
                    setTimeout(() => {
                        setAData({...aData, show: false});
                    }, 2000)

                    setLoading(false);

                })
                
            } catch (err) {
                setAData({...aData, show: true, type: 'danger', message: `${err.response.data.message}`});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000)

                setLoading(false);

            }
        }
    }

    return(
        <>
            <NavBar />
           
            <section className="auth">
                <div className="container">

                    <div className="row">

                        <div className="col-md-4 mx-auto">

                            
                           {
                               !reset &&
                               <form onSubmit={(e) => submit(e)} className="gnr-form mrgt1">
                            <div className="auth--bx">

                                <div className="mrgb2">
                                    <h3 className="title fs-30 ui-text-center">Reset Password</h3>
                                    <p className="onsilver fs-14 ui-text-center mrgb1">Choose a new password</p>
                                </div>

                                <Alert show={aData.show} type={aData.type} message={aData.message} />
                                
                                <div className="form-group">
                                    <label>New password</label>
                                    <div className="input-group">
                                            <input
                                            defaultValue={(e) => {setResetData({...resetData, password: e.target.value})} } 
                                            onChange={(e) => {setResetData({...resetData, password: e.target.value})}}
                                            type={pass} className="form-control" placeholder="Choose a new password" />
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <Link onClick={(e) => showPass(e)} to="" className={`fe ${pass === 'password' ? 'fe-eye' : 'fe-eye-off'}`}></Link>
                                            </span>
                                        </div>
                                    </div> 

                                </div>
                                
                                <div className="form-group">
                                    <label>Type password again</label>
                                    <input 
                                      defaultValue={(e) => {setResetData({...resetData, confirmPassword: e.target.value})} } 
                                      onChange={(e) => {setResetData({...resetData, confirmPassword: e.target.value})}}
                                    type="password" className="form-control" placeholder="Type again" />
                                </div>

                                <div className="form-group">

                                {
                                           loading &&
                                           <button className="btn btn-lg btn-block onwhite"><ButtonSpinner imageUrl={`../../../images/assets/spinner-white.svg`} /></button>
                                       }
                                       {
                                           !loading &&
                                           <button className="btn btn-lg btn-block onwhite">CHANGE PASSWORD</button>
                                       }
                                </div>              
                            </div>
                                
                            </form>

                           }

                           {
                             reset &&
                                <>
                                    <div className="ui-text-center mrgb2">
                                        <LottiePlayer lottieData={lottieData} w='150px' h='150px' loop={true} />
                                    </div>
                                    <div className="mrgb1">
                                        <h3 className="title fs-25 ui-text-center">Password reset successfully</h3>
                                        <p className="onmineshaft fs-14 ui-text-center mrgb1">Login to your account</p>
                                    </div>

                                    <div className="ui-text-center">
                                        <Link to="/login" className="btn btn-lg md-button onwhite">LOGIN</Link>
                                    </div>
                                </>
                           }
                            
                        </div>

                    </div>

                </div>
            </section>
        </>
    )

}

export default ResetPassword;

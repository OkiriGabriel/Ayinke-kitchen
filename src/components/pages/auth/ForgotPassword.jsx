import React, { useEffect, useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import NavBar from '../../layouts/partials/NavBar';
import Alert from '../../layouts/partials/Alert';
import lottieData from '../../_data/check-green.json';
import LottiePlayer from '../../layouts/partials/LottiePlayer';
import ButtonSpinner from '../../layouts/partials/ButtonSpinner';

const ForgotPassword = () => {

    const [loading, setLoading] = useState(false);
    const [forgot, setForgot] = useState(false);
    const [forgotPassData, setForgotData] = useState({

        email: '',
    })

    const [aData, setAData] = useState({
        type: '',
        message: '',
        show: false
    })

    useEffect(() => {

    }, [])

    const submit = async(e) => {

        e.preventDefault();

        if(!forgotPassData.email){
            setAData({...aData, show: true, type: 'danger', message: 'All fields are required.'});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
        }else{
            setLoading(true);

            try {
                await Axios.post(`${process.env.REACT_APP_API_URL}/auth/forgotpassword`, {...forgotPassData})
                .then((resp) => {
                    
                    if(resp.data.error === false){

                        setForgot(true);

                    }
                }).catch((err) => {

                    setAData({...aData, show: true, type: 'danger', message: `${err.response.data.message}`});
                    setTimeout(() => {
                        setAData({...aData, show: false});
                    }, 2000);

                    setLoading(false);
                    
                })
            } catch (err) {
                setAData({...aData, show: true, type: 'danger', message: `${err.response.data.message}`});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
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
                               !forgot &&
                               <form onSubmit={(e) => submit(e)} className="gnr-form mrgt1">
                               <div className="auth--bx">
   
                                   <div className="mrgb2">
                                       <h3 className="title fs-30 ui-text-center">Forgot Password</h3>
                                       <p className="onsilver fs-14 ui-text-center mrgb1">Please enter your email below</p>
                                   </div>
   
                                   <Alert show={aData.show} type={aData.type} message={aData.message} />
                                   
                                   <div className="form-group">
                                       <label>Email address</label>
                                       <input 
                                       defaultValue={(e) => {setForgotData({...forgotPassData, email: e.target.value})} } 
                                       onChange={(e) => {setForgotData({...forgotPassData, email: e.target.value})}}
                                       type="email" className="form-control" placeholder="you@restaurant.com" />
                                   </div>
   
                                   <div className="form-group">
                                   {
                                           loading &&
                                           <button className="btn btn-lg btn-block onwhite"><ButtonSpinner imageUrl={`../../../images/assets/spinner-white.svg`} /></button>
                                       }
                                       {
                                           !loading &&
                                           <button className="btn btn-lg btn-block onwhite">SEND LINK</button>
                                       }
                                   </div>
   
                                   <div className="mrgt2 mrgb1 ui-text-center">
                                       <Link to="/login" className="brand-orange fs-14 ui-text-center mrgb1">I remember my password</Link>
                                   </div>                
                               </div>
                                   
                               </form>
   
                           }
                        
                            {
                                forgot &&
                                <>
                                    <div className="ui-text-center mrgb2">
                                        <LottiePlayer lottieData={lottieData} w='150px' h='150px' loop={true} />
                                    </div>
                                    <div className="mrgb1">
                                        <h3 className="title fs-25 ui-text-center">Link Sent!</h3>
                                        <p className="onmineshaft fs-14 ui-text-center mrgb1">A password reset link has been set to your email. Please check your email to change your password.</p>
                                    </div>  

                                    <div className="ui-text-center">
                                        <Link to="/login" className="btn btn-lg md-button onwhite">CONTINUE</Link>
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

export default ForgotPassword;

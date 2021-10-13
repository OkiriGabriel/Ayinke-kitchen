import React, {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios'
import LottiePlayer from '../layouts/partials/LottiePlayer'
import NavBar from '../layouts/partials/NavBar'
import ButtonSpinner from '../layouts/partials/ButtonSpinner'

import Alert from '../layouts/partials/Alert'
import lottieError from '../_data/check-error.json'
import lottieSuccess from '../_data/check-green.json'



const Feedback = (props) => {


  const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const [feedData, setFeed] = useState({
        email: '',
        message: ''
    });

    const[msgData, setMsgData] = useState({
        title: '',
        message: '',
        buttonText: '',
        type: 'success'
    });

    const [aData, setAData] = useState({
        type: '',
        message: '',
        show: false
    })

    useEffect(() => {

    }, [])


    // message component
    const Message = () => {
        return(
            <>
                <div className="ui-text-center mrgb2 mrgt2">
                    <LottiePlayer lottieData={ msgData.type === 'success' ? lottieSuccess : lottieError } w='100px' h='100px' loop={true} />
                </div>
                <div className="mrgb2 pdl3 pdr3">
                    <h3 className="title fs-20 ui-text-center">{msgData.title}</h3>
                    <p className="onmineshaft fs-14 ui-text-center mrgb1">{msgData.message}</p>
                </div>


            </>
        )
    }


    const submit = async (e) => {

        if(!feedData.email && !feedData.message){
            setAData({...aData, show: true, type: 'danger', message: `All fields are required.`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else if(!feedData.email){
            setAData({...aData, show: true, type: 'danger', message: `Enter your email`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else if(!feedData.message){
            setAData({...aData, show: true, type: 'danger', message: `Enter feedback message`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }
        else {
            
            setLoading(true);

            try {

                await Axios.post(`${process.env.REACT_APP_API_URL}/auth/feedbacks`, { ...feedData })
                .then((resp) => {

                    setMsgData({...msgData, title: 'Successful!', message: 'Thank you for your feedback', buttonText: 'Close', type: 'success'});
                    setStep(1);

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

                        <div className="col-lg-4 mx-auto">
                                        

                    <form onSubmit={(e) => submit(e)} className="gnr-form mrgt3 bg-white ">
                            <div className="auth--bx">

                                <div className="mrgb2">
                                    <h3 className="title fs-20 ui-text-center">Feedback</h3>
                                    <p className="onsilver fs-12 ui-text-center mrgb1">Your feedback will be highly welcome</p>
                                    
                                </div>

                                <Alert show={aData.show} type={aData.type} message={aData.message} />
                                
                                <div className="form-group">
                                    <label className="fs-12 onmineshaft mb-2">Email address</label>
                                    <input 
                                    defaultValue={(e) => setFeed({...feedData, email: e.target.value})}
                                    onChange={(e) => setFeed({...feedData, email: e.target.value})}
                                  
                                    type="email" className="form-control" placeholder="you@restaurant.com" />
                                </div>
                             

                                <div className="form-group mt-5">
                                        <label className="fs-12 onmineshaft mb-2">Feedback mesage</label>
                                        <textarea
                                            defaultValue={(e) => setFeed({...feedData, message: e.target.value})}
                                            onChange={(e) => setFeed({...feedData, message: e.target.value})}
                                            cols="30" rows="0"
                                            className="form-control textarea" placeholder="type here..."></textarea>
                                    </div>


                                <div className="form-group">
                                    
                                    {
                                        loading &&
                                        <button className="btn btn-lg btn-block onwhite"><ButtonSpinner imageUrl={`../../../images/assets/spinner-white.svg`} /></button>
                                    }
                                    {
                                        !loading &&
                                        <button className="btn btn-lg btn-block bg-orange onwhite">LOGIN</button>
                                    }
                                </div>

                                <div className="mrgt2 mrgb1 ui-text-center">
                                    <p className="mb-1"><Link to="/forgot-password" className="onblack fs-14 ui-text-center mrgb1">Forgot password?</Link></p>
                                    <Link to="/contact" className="onblack fs-14 ui-text-center mrgb1">New? Create account</Link>
                                </div>                
                            </div>
                                
                            </form>

                        </div>
              
                    </div>

                </div>
            </section>
        </>
    )

}

export default Feedback;

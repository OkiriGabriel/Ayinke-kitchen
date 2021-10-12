import React, {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import * as moment from 'moment';
import Axios from 'axios'
import LottiePlayer from '../../layouts/partials/LottiePlayer'


import Alert from '../../layouts/partials/Alert'
import lottieError from '../../_data/check-error.json'
import lottieSuccess from '../../_data/check-green.json'
import storage from '../../helpers/storage'
import colors from '../../helpers/colors'

import UserContext from '../../../context/user/userContext'

// tobtest@gmail.com

const LoginModal = ({isShow, closeModal}) => {

    const userContext = useContext(UserContext);

    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const [loginData, setLogin] = useState({
        email: '',
        password: ''
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
                    <h3 className="title fs-20 ui-text-center font-metrobold">{msgData.title}</h3>
                    <p className="onmineshaft fs-14 ui-text-center mrgb1 font-metrolight">{msgData.message}</p>
                </div>

                <div className="ui-text-center">
                    <Link style={{backgroundColor: colors.primary.green}} onClick={closeX} className="btn btn-lgr onwhite fs-16 mb-3 font-metrobold">{msgData.buttonText ? msgData.buttonText : 'No Text'}</Link>
                </div>

            </>
        )
    }

    const closeX = () => {
        setStep(0);
        setLoading(false);
        closeModal();
    }

    

    const submit = async (e) => {

        if(!loginData.email && !loginData.password){
            setAData({...aData, show: true, type: 'danger', message: `All fields are required.`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else if(!loginData.email){
            setAData({...aData, show: true, type: 'danger', message: `Enter your email`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else if(!loginData.password){
            setAData({...aData, show: true, type: 'danger', message: `Enter your password`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }
        else {
            
            setLoading(true);

            try {

                await Axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { ...loginData })
                .then(async (resp) => {

                    if(resp.data.error === false && resp.data.data.isRestaurant === false){

                        setMsgData({...msgData, title: 'Successful!', message: 'you\'ve been logged in successfully', buttonText: 'Continue', type: 'success'});
                        setStep(1);

                        // //save info to local storage
                        localStorage.setItem('token', resp.data.token);
                        localStorage.setItem('userId', resp.data.data._id);
                        localStorage.setItem('userEmail', resp.data.data.email)

                        // get user
                        await userContext.getUser()  // 

                        // get user billing
                        await userContext.getBillings(resp.data.data._id);

                        // get user card
                        await userContext.getCards(resp.data.data._id);



                    }else{

                        setMsgData({ ...msgData, title: 'Forbidden!', type:'error', message: 'You\'re not permitted to place an order as a restaurant.', buttonText: 'Close'});
                        setStep(1);

                        storage.delete('token');
                        storage.delete('userId');
                        storage.delete('userEmail');

                        await Axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);
                        

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


    return (
        <>
        
            <Modal show={isShow} 
                onHide={closeX} 
                size="sm"
                fade={false}
                keyboard={false}
                aria-labelledby="medium-modal"
                centered
                className="md--modal"
            >

                <Modal.Body>

                     <div className="d-flex">

                        <div className="dm--dbx ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/bg@sdot2.svg")'}}>
                            <div className="dm--d">
                                <div>
                                    <img src="../../../images/assets/i" alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="dm--body">

                            <div className="d-flex align-items-center mrgb1">
                                <h2 className="font-metromedium fs-16" style={{color: colors.primary.green }}>
                                    Login to your account
                                </h2>
                                <div className="ml-auto">
                                    <Link onClick={closeModal} className="dot-close">
                                        <span className="cox-x brandcox-fireflydark fs-8"></span>
                                    </Link>
                                </div>
                            </div> 

                            <div className="dm--ct">

                                {
                                    step === 0 &&
                                    <form className="gnr-form" onSubmit={(e) => e.preventDefault()}>

                                    <Alert show={aData.show} type={aData.type} message={aData.message} />

                                    <div className="mb-2">
                                        <label className="font-metromedium fs-13 mb" style={{color: colors.primary.green}}>Email</label>
                                        <input 
                                            defaultValue={(e) => setLogin({...loginData, email: e.target.value})}
                                            onChange={(e) => setLogin({...loginData, email: e.target.value})}
                                            type="email" className="form-control" placeholder="you@example.com" />
                                    </div>

                                    <div className="mb-2">
                                        <label className="font-metromedium fs-13 mb" style={{color: colors.primary.green}}>Password</label>
                                        <input 
                                            defaultValue={(e) => setLogin({...loginData, password: e.target.value})}
                                            onChange={(e) => setLogin({...loginData, password: e.target.value})}
                                            type="password" className="form-control" placeholder="you@example.com" />
                                    </div>

                                    <div className="mrgb ui-text-center mrgt2">
                                        {
                                            loading ? (
                                                <Link style={{backgroundColor: colors.primary.green}} className="btn btn-lgr btn-block font-metrobold onwhite fs-16 mb-3 disabled"><img src="../../../images/assets/spinner-white.svg" alt="spinner" width="33px" /></Link>
                                            ): (
                                                <Link onClick={(e) => submit(e)} className="btn btn-lgr btn-block onwhite fs-16 mb-3 font-metrobold" style={{backgroundColor: colors.primary.green}}>Submit</Link>
                                            )
                                        }

                                        <div><Link to="/forgot-password" className="title fs-14 brand-orange font-metrolight">Forgot password?</Link></div>

                                        <Link onClick={closeX} className="title fs-15 font-weight-bold onsilver font-metrobold">Close</Link>
                                    </div>

                                </form>

                                }

                                {
                                    step === 1 &&
                                    <Message />
                                }

                                
                            </div>                                  
                        </div>
                    </div> 
                     
                </Modal.Body>

            </Modal>
        
        </>
    )

}

export default LoginModal;
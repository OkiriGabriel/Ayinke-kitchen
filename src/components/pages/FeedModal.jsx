import React, {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import * as moment from 'moment';
import Axios from 'axios'
import LottiePlayer from '../layouts/partials/LottiePlayer'


import Alert from '../layouts/partials/Alert'
import lottieError from '../_data/check-error.json'
import lottieSuccess from '../_data/check-green.json'
import storage from '../helpers/storage'


const FeedModal = ({isShow, closeModal}) => {

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

                <div className="ui-text-center">
                    <Link onClick={closeX} className="btn btn-lgr onwhite bg-brand-orange fs-16 mb-3">{msgData.buttonText ? msgData.buttonText : 'No Text'}</Link>
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
                                <h2 className="brandcox-firefly fs-18">
                                    Let us know what you think
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
                                    <form onSubmit={(e) => e.preventDefault()}>

                                    <Alert show={aData.show} type={aData.type} message={aData.message} />

                                    <div className="mb-2">
                                        <label className="fs-13 onmineshaft">Your email</label>
                                        <input 
                                            defaultValue={(e) => setFeed({...feedData, email: e.target.value})}
                                            onChange={(e) => setFeed({...feedData, email: e.target.value})}
                                            type="email" className="form-control" placeholder="you@example.com" />
                                    </div>

                                    <div className="form-group">
                                        <label className="fs-13 onmineshaft">Feedback mesage</label>
                                        <textarea
                                            defaultValue={(e) => setFeed({...feedData, message: e.target.value})}
                                            onChange={(e) => setFeed({...feedData, message: e.target.value})}
                                            className="form-control textarea" placeholder="type here..." />
                                    </div>

                                    <div className="mrgb1 ui-text-center">
                                        {
                                            loading ? (
                                                <Link onClick={(e) => submit(e)} className="btn btn-lgr btn-block onwhite bg-brand-orange fs-16 mb-3 disabled"><img src="../../../images/assets/spinner-white.svg" alt="spinner" width="35px" /></Link>
                                            ): (
                                                <Link onClick={(e) => submit(e)} className="btn btn-lgr btn-block onwhite bg-brand-orange fs-16 mb-3">Submit</Link>
                                            )
                                        }

                                        <Link onClick={closeX} className="title fs-15 font-weight-bold brand-orange">Close</Link>
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

export default FeedModal;
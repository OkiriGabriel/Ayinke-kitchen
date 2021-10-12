import React, {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import DropDown from '../../layouts/partials/DropDown'
import * as moment from 'moment';
import Axios from 'axios'
import LottiePlayer from '../../layouts/partials/LottiePlayer'

import UserContext from '../../../context/user/userContext'

import LocationContext from '../../../context/location/locationContext'
import AddressContext from '../../../context/address/addressContext'

import Alert from '../../layouts/partials/Alert'
import lottieError from '../../_data/check-error.json'
import lottieSuccess from '../../_data/check-green.json'
import storage from '../../helpers/storage'

const NumberModal = ({isShow, closeModal, user}) => {
    
    const userContext = useContext(UserContext);
    const locationContext = useContext(LocationContext);
    const addressContext = useContext(AddressContext);

    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [addData, setAddData] = useState({
        number: ''
    });

    const [msgData, setMsgData] = useState({
        title: '',
        message: '',
        buttonText: '',
        type: 'success'
    })

    const [aData, setAData] = useState({
        type: '',
        message: '',
        show: false
    })

    const closeX = () => {
        setStep(0);
        setLoading(false);
        closeModal();
    }

    useEffect(() => {
        
    }, [])

    const refershList = () => {
        userContext.getUser();
    }

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

    const submit = async (e) => {
        e.preventDefault();

        if(!addData.number){
            setAData({...aData, show: true, type: 'danger', message: `All fields are required.`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else {
            
            setLoading(true);

            try {

                await Axios.put(`${process.env.REACT_APP_API_URL}/users/update-whatsapp/${storage.getUserID()}`, { ...addData }, storage.getConfigWithBearer())
                .then((resp) => {

                    if(resp.data.error === false){
                        
                        setMsgData({...msgData, type: 'success', title: 'Successful!', message: 'Your WhatsApp number is saved', buttonText: 'Close'})
                        setStep(1);
                        refershList()
                        
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
                                <h2 className="font-gilroymedium brandcox-firefly fs-18">
                                    { 
                                        user && user.whatsappNumber &&
                                        <>Change WhatsApp Number</>
                                    }
                                    { 
                                        user && !user.whatsappNumber &&
                                        <>Add WhatsApp Number</>
                                    }
                                    { 
                                        !user &&
                                        <>Add WhatsApp Number</>
                                    }
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

                                    <div className="d-flex align-items-center">
                                        <div className="mb-3 fx-ctl">
                                            <input 
                                            defaultValue={user.whatsappNumber ? user.whatsappNumber : ''} 
                                            onChange={ (e) => {setAddData({...addData, number: e.target.value})} }
                                            type="text" placeholder="Add a number" className="form-control" />
                                        </div>
                                
                                    </div>

                                    <div className="mrgb1 ui-text-center">
                                        {
                                            loading ? (
                                                <Link className="btn btn-lgr btn-block onwhite bg-brand-orange fs-16 mb-3 disabled"><img src="../../../images/assets/spinner-white.svg" alt="spinner" width="35px" /></Link>
                                            ): (
                                                <Link onClick={(e) => submit(e)} className="btn btn-lgr btn-block onwhite bg-brand-orange fs-16 mb-3">Submit</Link>
                                            )
                                        }
                                        <Link onClick={closeX} className="title fs-15 font-weight-bold brand-orange">Cancel</Link>
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

export default NumberModal;

import React, {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import * as moment from 'moment';
import Dropdown from '../../layouts/partials/DropDown';
import Axios from 'axios'
import colors from '../../helpers/colors'
import LottiePlayer from '../../layouts/partials/LottiePlayer'
import ButtonSpinner from '../../layouts/partials/ButtonSpinner'


import Alert from '../../layouts/partials/Alert'
import lottieError from '../../_data/check-error.json'
import lottieSuccess from '../../_data/check-green.json'


const OrderModal = ({isShow, closeModal}) => {

    const [step, setStep] = useState(0);
    const [totalPrice, setPrice] = useState(0);
    const [plates, setPlates] = useState([]);
    const [iconShow, setIcon] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false)

    const [feedData, setFeed] = useState({
        email: '',
        message: ''
    });

    const toggleAdd = (e) => {
        if(e) e.preventDefault();
        setShowAdd(!showAdd);
    }

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

    const showIcon = () => {
        setIcon(!iconShow);
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

    const mergeFoodNames = (data) => {

        let names = '';
        for(let i = 0; i < data.length; i++){
            names = names + `${names === '' ? '' : ' + '}` + data[i].food.name;
        }
        return names;

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

                        <div className="dm--dbx ui-full-bg-norm">
                            <div className="dm--d">
                                
                                <form className="foorm">
                                <h2 className="brandcox-firefly fs-18">Meal Quantity</h2>
                                    <div className="value-button" id="decrease" >-</div>
                                    <input type="number" id="number" defaultValue={0} />
                                    <div className="value-button" id="increase" >+</div>
                                </form>
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

               
                            <form className="gnr-form mrgt1" onSubmit={(e) => e.preventDefault()}>

<Alert show={aData.show} type={aData.type} message={aData.message} />

<div className="row">

    <div className="col-md-6 inline">

        <div className="form-group">
            <label className="font-metromedium fs-13 mb" style={{color: colors.primary.green}}>First name</label>
            <input 
            type="text" 
            className="form-control font-metrolight fs-13" 
            placeholder="E.g. Wale" />
        </div>

    </div>

    <div className="col-md-6 inline">

        <div className="form-group">
            <label className="font-metromedium fs-13 mb" style={{color: colors.primary.green}}>Email</label>
            <input 
            type="text" 
            className="form-control font-metrolight fs-13" 
            placeholder="yourmail@you.com" />
        </div>

    </div>

</div>

<div className="row">

    <div className="col-md-6 inline">
        <div className="form-group">
            <label className="font-metromedium fs-13 mb" style={{color: colors.primary.green}}>Phone</label>
            <input 
  
            type="text" 
            className="form-control font-metrolight fs-13" 
            placeholder="080xxx" />
        </div>
    </div>

    <div className="col-md-6 inline">
        <div className="form-group">
            <label className="font-metromedium fs-13 mb" style={{color: colors.primary.green}}>Location</label>
            <input 
  
  type="text" 
  className="form-control font-metrolight fs-13" 
  placeholder="Enter location" />
        </div>
    </div>

</div>

<div className="form-group">
    <div className="d-flex align-items-center mb">
        <label className="font-metromedium fs-13" style={{color: colors.primary.green}}>Address</label>
        <Link onClick={(e) => toggleAdd(e)} className="font-metromedium fs-13 ml-auto mb-1" style={{color: colors.primary.orange}}>
            {
                showAdd ? 'Remove' : 'Add description'
            }
        </Link>
    </div>
    <input 

    type="text" 
    className="form-control font-metrolight fs-13" 
    placeholder="your address" />
</div>

{
    showAdd &&
    <div className="form-group">
    <label className="font-metromedium fs-13 mb" style={{color: colors.primary.green}}>Description</label>
        <textarea 
    
        type="text" 
        className="form-control font-metrolight fs-13" 
        placeholder="Type here"></textarea>
    </div>
}


<div className="form-group">
                                    
                                    {
                                        loading &&
                                        <button className="btn btn-lg btn-block onwhite"><ButtonSpinner imageUrl={`../../../images/assets/spinner-white.svg`} /></button>
                                    }
                                    {
                                        !loading &&
                                        <button className="btn btn-lg btn-block bg-orange onwhite">Order Now</button>
                                    }
                                </div>

</form>

                                
                            </div>                                  
                        </div>
                    </div> 
                     
                </Modal.Body>

            </Modal>
        
        </>
    )

}

export default OrderModal;
import React, { useEffect, useContext, useState, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import Alert from '../../layouts/partials/Alert'
import { PaystackButton } from 'react-paystack';
import DropDown from '../../layouts/partials/DropDown';
import Axios from 'axios'
import OrderModal from './OrderModal';
import LocationContext from '../../../context/location/locationContext'


const PayModal = ({isShow, closeModal}) => {
    const [step, setStep] = useState(0);

    const locationContext = useContext(LocationContext);
    const [modalTitle, setModalTitle] = useState('');
    
    const [showAdd, setShowAdd] = useState(false);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [iconShow, setIcon] = useState(false);
    

    
    const multiple = 100;
    const dollarRate = 410;

    useEffect(() => {

        // locationContext.getLocations();
        setModalTitle('Order now');

    });

    const close = (e) => {
        e.preventDefault();
        closeModal();
    }

    const [payData, setPayData] = useState({
        email: '',
        name: '',
        phone: '',
        amount: (3 * dollarRate) * multiple,
        address: '',
        description: '',
        location: ''
    });
    const toggleAdd = (e) => {
        if(e) e.preventDefault();
        setShowAdd(!showAdd);
    }

    const [amt, setAmt] = useState(0);
    const [paid, setPaid] = useState(false);
    const [aData, setAData] = useState({
        type: '',
        message: '',
        show: false
    });

    const[msgData, setMsgData] = useState({
        title: '',
        message: '',
        buttonText: '',
        type: 'success'
    });
    
    const getLocations = () => {
        const loc = locationContext.locations.map((l) => {
            const c ={
                value: l._id,
                label: l.name,
                left: '',
                image: ''
            }
            return c;
        });

        return loc;
    }

    // const setAmount = (a) => {

    //     if(a > 0){
    //         const am = (a * dollarRate) * multiple;
    //         setAmt(am);
    //     }else{
    //         const am = (a * dollarRate) * multiple;
    //         setAmt(am);
    //     }

    // }

    
    const inc = (e) => {
        if(e) e.preventDefault()
        setCount(count + 1);
    }

    const dec = (e) => {
        if(e) e.preventDefault()

        if(count < 1){
            setCount(0)
        }else{
            setCount(count - 1);
        }
        

    }

    const pay = (e) => {

        e.preventDefault();

        if(!payData.email || !payData.name || !payData.phone || !payData.amount){
            setAData({...aData, show: true, type: 'danger', message: `All fields are required.`});
            setTimeout(() => {
                setAData({...aData, show: false})
            },2000)
        }else if(!payData.email)
        {
            setAData({...aData, show: true, type: 'danger', message: `Your email is needed.`});
            setTimeout(() => {
                setAData({...aData, show: false})
            },2000)
        }else if(!payData.name)
        {
            setAData({...aData, show: true, type: 'danger', message: `Please enter your name`});
            setTimeout(() => {
                setAData({...aData, show: false})
            },2000)
        }else if(!payData.phone)
        {
            setAData({...aData, show: true, type: 'danger', message: `Please enter your phone number`});
            setTimeout(() => {
                setAData({...aData, show: false})
            },2000)
        }else if(!payData.amount)
        {
            setAData({...aData, show: true, type: 'danger', message: `Please support/donate`});
            setTimeout(() => {
                setAData({...aData, show: false})
            },2000)
        }else{

            
            if(amt > 0){
                payData.amount = amt;
            }

            const payButton = document.querySelector('.paystack-button');
            if(payButton){

                payButton.click();
                
            }else{
                setAData({...aData, show: true, type: 'danger', message: `We cannot proccess your request now, please try again.`});
                setTimeout(() => {
                    setAData({...aData, show: false})
                },2000)
            }
        }

    }

    const saveEmail = async () => {

        const regData = {
            email: payData.email,
            phoneNumber: payData.phone,
            password:'#commanD555/'+payData.email,
            phoneCode: '+234'
        }

        try {

            await Axios.post(`${process.env.REACT_APP_AUTH_API_URL}/auth/register`, {...regData})
            .then((resp) => {

                if(resp.data.error === false){
                    setPaid(true)
                }

            }).catch((err) => {

                setAData({...aData, show: true, type: 'danger', message: `${err.response.data.message}`});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
            })
            
        } catch (err) {
            setAData({...aData, show: true, type: 'danger', message: `${err.response.data.message}`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
        }

    }

    const onPaySuccess = () => {
        setPaid(true);
        saveEmail();
    }
    const onPayClose = () => {
        setAData({...aData, show: true, type: 'danger', message: `We understand that you may not want to support. Thank you so much 😊`});
        setTimeout(() => {
            setAData({...aData, show: false})
        },4000)
    }


    
    const closeX = () => {
        setStep(0);
        setLoading(false);
        closeModal();
    }

    return (
        <>
             <Modal show={isShow} 
                onHide={closeX} 
                size="sm"
                fade={false}
                keyboard={false}
                aria-labelledby="small-modal"
                centered
                className="custom-modal rem-modal"
            >

<Modal.Body>

<div className="modal-box">

    <div className="modal-sidebar"></div>

    <div className="modal-content-box">

        <div className="modal-header-box">
            <h2 className=" font-helveticabold fs-16">Checkout</h2>
            <div className="ml-auto">
                <Link className="fe-order" onClick={closeModal} style={{ position: 'relative', top: '-3px' }}>
                    <span className="fe fe-x on-cord-o fs-13"></span>
                </Link>
            </div>
        </div>

                    <div className="modal-content-area">

                        <form className="foorm ui-text-center">
                        <h2 className="brandcox-firefly text-center font-helveticamedium mrgb2 fs-15">QTY of meal </h2>
                            <div onClick={(e) => { dec(e) }} className="value-button" id="decrease" >-</div>
                            <input className="onblack" type="number" id="number" value={count} defaultValue={0} />
                            <div onClick={(e) => { inc(e) }} className="value-button" id="increase" >+</div>
                        </form>

                        <button onClick={closeModal}  className="btn btn-lg btn-block bg-oran onwhite">Add cart</button>

                     </div>

    </div>

</div>


</Modal.Body>

            </Modal>
        </>
    )

}

export default PayModal;




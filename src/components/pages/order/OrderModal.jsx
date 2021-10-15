import React, { useEffect, useContext, useState, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import Alert from '../../layouts/partials/Alert'
import { PaystackButton } from 'react-paystack';
import DropDown from '../../layouts/partials/DropDown';
import Axios from 'axios'
import colors from '../../helpers/colors'
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

            
        <form className="foorm">
                    <h2 className="brandcox-firefly font-helveticamedium mb-3 fs-13">QTY of meal </h2>
                        <div onClick={(e) => { dec(e) }} className="value-button" id="decrease" >-</div>
                        <input type="number" id="number" value={count} defaultValue={0} />
                        <div onClick={(e) => { inc(e) }} className="value-button" id="increase" >+</div>
                    </form>

        <form className="gnr-for mrgt1" onSubmit={(e) => e.preventDefault()}>
        <p className="brandcox-firefly font-helveticamedium fs-13 mb-2  ">please confirm your order and checkout</p>

            <Alert show={aData.show} type={aData.type} message={aData.message} />

                    <div className="row">

                        <div className="col-md-6 col-6 inline">

                            <div className="form-group">
                                <label className="font-metromedium fs-13 mb" style={{color: colors.primary.green}}>First name</label>
                                <input 
                                type="text" 
                                defaultValue={(e) => { setPayData({...payData, firstName: e.target.value }) }}
                                    onChange={(e) => { setPayData({...payData, firstName: e.target.value }) }}
                                className="form-control font-metrolight fs-13" 
                                placeholder="E.g. Wale" />
                            </div>

                        </div>

                        <div className="col-md-6 col-6 inline">

                            <div className="form-group">
                                <label className="font-metromedium fs-13 mb" style={{color: colors.primary.green}}>Email</label>
                                <input 
                                type="text" 
                                defaultValue={(e) => { setPayData({...payData, email: e.target.value }) }}
                                    onChange={(e) => { setPayData({...payData, email: e.target.value }) }}
                                className="form-control font-metrolight fs-13" 
                                placeholder="yourmail@you.com" />
                            </div>

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-6 col-6 inline">
                            <div className="form-group">
                                <label className="font-metromedium fs-13 mb" style={{color: colors.primary.green}}>Phone</label>
                                <input 
                                defaultValue={(e) => { setPayData({...payData, phone: e.target.value }) }}
                                onChange={(e) => { setPayData({...payData, phone: e.target.value }) }}
                                type="text" 
                                className="form-control font-metrolight fs-13" 
                                placeholder="080xxx" />
                            </div>
                        </div>

                        <div className="col-md-6 col-6 inline">

                            <div className="form-group">
                                <label className="font-metromedium fs-13 mb" style={{color: colors.primary.green}}>Location</label>
                                <select className="form-control" 
                                
                                defaultValue={(e) => { setPayData({...payData, location: e.target.value }) }}
                                onChange={(e) => { setPayData({...payData, location: e.target.value }) }}>
                                    <option value="iwo">Iwo road</option>
                                    <option value="challenge">Challenge</option>
                                    <option value="bodija">Bodija</option>
                                    <option value="saki">Saki</option>
                                    <option value="gate">Lautech gate</option>
                                </select>
                              
                            </div>
                        </div>

                    </div>
               
                                <div className="row">
                                    <div className="col-md-6 col-6 inline">

                                        <div className="form-group">
                                            <label className="font-metromedium fs-13 mb" style={{color: colors.primary.green}}>Amount</label>

                                        <input 
                                                        defaultValue={(e) => { setPayData({...payData, amount: e.target.value }) }}
                                                        onChange={(e) => { setPayData({...payData, amount: e.target.value }) }}
                                                        type="number" min="3" className="form-control font-metrolight fs-13" placeholder="$0.00" />


                                        </div>
                                    </div>
                                    <div className="col-md-6 col-6 inline">
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
                                            defaultValue={(e) => { setPayData({...payData, address: e.target.value }) }}
                                            onChange={(e) => { setPayData({...payData, address: e.target.value }) }}

                                        type="text" 
                                        className="form-control font-metrolight fs-13" 
                                        placeholder="your address" />
                                    </div>
                                    </div>
                                </div>

                    {
                        showAdd &&
                        <div className="form-group">
                        <label className="font-metromedium fs-13 mb" style={{color: colors.primary.green}}>Description</label>
                            <textarea 
                              defaultValue={(e) => { setPayData({...payData, description: e.target.value }) }}
                              onChange={(e) => { setPayData({...payData, description: e.target.value }) }}
                            type="text" 
                            className="form-control font-metrolight fs-13" 
                            placeholder="Type here"></textarea>
                        </div>
                    }


                    <div className="form-group">
            
                    <PaystackButton 

                    id="pay-button"
                    email={payData.email}
                    amount={payData.amount}
                    name={payData.name}
                    phone={payData.phone}
                    publicKey={process.env.REACT_APP_PAYSTACK_PUBLIC_KEY}
                    text={'Pay Now'}
                    onSuccess={onPaySuccess}
                    onClose={onPayClose}
                    className="paystack-button"
                    />
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

export default PayModal;




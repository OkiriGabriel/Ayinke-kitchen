import React, {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import DropDown from '../../layouts/partials/DropDown'
import * as moment from 'moment';
import Axios from 'axios'
import LottiePlayer from '../../layouts/partials/LottiePlayer'

import FoodContext from '../../../context/food/foodContext'
import FoodItemContext from '../../../context/foodItem/foodItemContext'
import UserContext from '../../../context/user/userContext'
import LocationContext from '../../../context/location/locationContext'
import AddressContext from '../../../context/address/addressContext'

import Alert from '../../layouts/partials/Alert'
import lottieError from '../../_data/check-error.json'
import lottieSuccess from '../../_data/check-green.json'
import storage from '../../helpers/storage'


const FoodModal = ({isShow, closeModal}) => {

    const foodContext = useContext(FoodContext);
    const foodItemContext = useContext(FoodItemContext);
    const userContext = useContext(UserContext);
    const locationContext = useContext(LocationContext);
    const addressContext = useContext(AddressContext);

    const [isChecked, setIsChecked] = useState(false);
    const [step, setStep] = useState(0);
    const [showBy, setShowBy] = useState(false);
    const [loading, setLoading] = useState(false);

    const [foodData, setFoodData] = useState({
        status: false,
        food: '',
        address: '',
        price: 0,
        availableBy: ''
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
    

    const getStatus = () =>{
        const c = [
            {
                value: true,
                label: 'Available',
                left: '',
                image: ''
            },
            {
                value: false,
                label: 'Not Available',
                left: '',
                image: ''
            },
            {
                value: 'time',
                label: 'Available By',
                left: '',
                image: ''
            }
        ]
        return c;
    }

    const getFood = () =>{
        const foods = foodContext.allFood.map((f) => {
            const c = {
                value: f._id,
                label: `${f.name} ${f.type ? '(' + f.type + ')' : ''}`,
                left: '',
                image: ''
            }
            return c;
        })
        return foods;
    }

    const getLoc = (id) => {
        
        const loc = locationContext.locations.find((l) => l._id === id);
        return loc;
    }

    const getLocations = () =>{
        const addresses = addressContext.restAddresses.map((a) => {
            const c = {
                value: a._id,
                label: `${getLoc(a.location).name}, ${a.address}`,
                left: '',
                image: ''
            }
            return c;
        })
        return addresses;
    }

    const selectStatus = (val) => {

        if(val.label === 'Available By'){
            setShowBy(true);
            setFoodData({...foodData, status: false});
        }else{
            setShowBy(false);
            setFoodData({...foodData, status: val.value, availableBy: ''});
        }

    }

    const selectFood = (val) => {
        console.log(val.value);
        setFoodData({...foodData, food: val.value});
    }

    const selectLocation = (val) => {
        setFoodData({...foodData, address: val.value});
    }

    const closeX = () => {
        setStep(0);
        setLoading(false);
        closeModal();
    }

    const handleTime = (e) => {
        const t = moment(e.target.value, 'hh:mm').format('hh:mm a');
        setFoodData({...foodData, availableBy: t});
    }

    const submit = async (e) => {

        if(!foodData.food && !foodData.address && !foodData.price){
            setAData({...aData, show: true, type: 'danger', message: `All fields are required.`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else if(!foodData.food){
            setAData({...aData, show: true, type: 'danger', message: `Choose a food item`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else if(!foodData.address){
            setAData({...aData, show: true, type: 'danger', message: `Choose a location`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else if(!foodData.price){
            setAData({...aData, show: true, type: 'danger', message: `Enter price`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else if(showBy && foodData.availableBy === ''){
            setAData({...aData, show: true, type: 'danger', message: `Set avaialble status`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else {
            
            setLoading(true);

            try {

                await Axios.post(`${process.env.REACT_APP_API_URL}/food-items/restaurant/${storage.getUserID()}`, { ...foodData }, storage.getConfigWithBearer())
                .then((resp) => {

                    if(resp.data.status === 206 && resp.data.error === true && resp.data.message === 'Food item exists'){

                        setMsgData({...msgData, type: 'error', title: 'Opps!', message: 'You cannot add a food item to the same location twice', buttonText: 'Try again'})
                        setStep(1);
                        foodItemContext.getRestFoodItems(storage.getUserID());
                    }

                    if(resp.data.error === false){
                        
                        setMsgData({...msgData, type: 'success', title: 'Successful!', message: 'You have successfully added another food item', buttonText: 'Close'})
                        setStep(1);
                        console.log(msgData.type);
                        foodItemContext.getRestFoodItems(storage.getUserID());
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
                                    Add Food Item
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
                                        <div className="mb-3 ff-ctl">
                                            <DropDown search={true} options={getFood} className="fd-drop food food-add" selected={selectFood} placeholder={`Select Food`}  />
                                        </div>
                                        <div className="mb-3 ff-ctl ml-auto">
                                            <DropDown options={getLocations} className="fd-drop address add-d" selected={selectLocation} placeholder={`Select Location`} search={true}  />
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div className="mb-3 ff-ctl">
                                            <input 
                                            defaultValue={ (e) => {setFoodData({...foodData, price: e.target.value})} } 
                                            onChange={ (e) => {setFoodData({...foodData, price: e.target.value})} }
                                            type="number" placeholder="Price /Scoop or Wrap" className="form-control" />
                                        </div>
                                        <div className="mb-3 ff-ctl ml-auto">
                                            <DropDown options={getStatus} className="fd-drop" selected={selectStatus} placeholder={`Select Status`} search={false}  />
                                        </div>
                                    </div>

                                    {
                                        showBy &&
                                        <div className="mb-3">
                                            <label className="fs-13 onmineshaft">When is food available?</label>
                                            <input 
                                            defaultValue={ (e) => handleTime(e) } 
                                            onChange={ (e) => handleTime(e) }
                                            type="time" id="datetimepicker-default" className="form-control" />
                                        </div>
                                    }

                                    <div className="mrgb1 ui-text-center">
                                        {
                                            loading ? (
                                                <Link onClick={(e) => submit(e)} className="btn btn-lgr btn-block onwhite bg-brand-orange fs-16 mb-3 disabled"><img src="../../../images/assets/spinner-white.svg" alt="spinner" width="35px" /></Link>
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

export default FoodModal;
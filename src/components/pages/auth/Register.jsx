import React, { useEffect, useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios'

import NavBar from '../../layouts/partials/NavBar';
import DropDown from '../../layouts/partials/DropDown';
import Alert from '../../layouts/partials/Alert'
import lottieData from '../../_data/check-green.json'
import LottiePlayer from '../../layouts/partials/LottiePlayer'
import ButtonSpinner from '../../layouts/partials/ButtonSpinner'

import LocationContext from '../../../context/location/locationContext'

const Register = () => {

    const locationContext = useContext(LocationContext);

    const [step, setStep] = useState(0);
    const [pass, setPass] = useState('password');
    const [loading, setLoading] = useState(false);
    const [registered, setReg] = useState(false);
    const [regData, setRegData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        location: '',
        resturantName: ''
    })

    const [aData, setAData] = useState({
        type: '',
        message: '',
        show: false
    })

    useEffect(() => {

        locationContext.getLocations();

    }, []);

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

    const getSelected = (val) => {
        setRegData({...regData, location: val.value});
    }

    const next = (e) => {
        e.preventDefault();
        if(step === 0){
            setStep(1)
        }

        if(step === 1){
            setStep(2)
        }
    }

    const showPass = (e) => {
        e.preventDefault();
        if(pass === 'password'){
            setPass('text');
        }else{
            setPass('password');
        }
    }

    const goBack = (e) => {
        e.preventDefault();
        setRegData({...regData, location: '', address: '', password: ''});
        setStep(0);
    }

    const submit = async (e) => {

        e.preventDefault();

        if(step === 0){

            if(!regData.email && !regData.phoneNumber && !regData.resturantName){
                setAData({...aData, show: true, type: 'danger', message: 'All fields are required.'});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
            }else if(!regData.email){
                setAData({...aData, show: true, type: 'danger', message: 'Enter your email.'});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
            }else if(!regData.phoneNumber){
                setAData({...aData, show: true, type: 'danger', message: 'Enter your phone number.'});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
            }else{
                setStep(1);
            }

        }else if (step === 1){
            if(!regData.location && !regData.address && !regData.password){
                setAData({...aData, show: true, type: 'danger', message: 'All fields are required.'});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
            }else if(!regData.resturantName){
                setAData({...aData, show: true, type: 'danger', message: 'Enter restaurant name.'});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
            }else if(!regData.location){
                setAData({...aData, show: true, type: 'danger', message: 'Choose a location.'});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
            }else if(!regData.address){
                setAData({...aData, show: true, type: 'danger', message: 'Enter your address.'});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
            }else if(!regData.password){
                setAData({...aData, show: true, type: 'danger', message: 'Choose a password.'});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
                
            }else{

                setLoading(true);

                try {

                    await Axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {...regData})
                    .then((resp) => {

                        if(resp.data.error === false){
                            // setAData({...aData, show: true, type: 'success', message: resp.data.message});
                            // setTimeout(() => {
                            //     setAData({...aData, show: false});
                            // }, 1500);
                            setReg(true);
                        }

                    }).catch((err) => {
                        if(err.response.data.errors[0] === 'Password cannot be less than 8 characters'){
                            setAData({...aData, show: true, type: 'danger', message: `Password cannot be less than 8 characters`});
                        }else{
                            setAData({...aData, show: true, type: 'danger', message: `${err.response.data.message}`});
                        }
                        
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

    }

    return(
        <>
            <NavBar />
           
            <section className="auth">
                <div className="container">

                    <div className="row">

                        <div className="col-md-4 mx-auto">

                            {
                                !registered &&
                                <form onSubmit={(e) => submit(e)} className="gnr-form mrgt1">
                                    <div className="auth--bx">

                                    <div className="mrgb2">
                                        <h3 className="title fs-30 ui-text-center">Create Account</h3>
                                        <p className="onsilver fs-14 ui-text-center mrgb1">Create checkaam account</p>
                                    </div>

                                    <Alert show={aData.show} type={aData.type} message={aData.message} />

                                    {
                                        step === 0 &&
                                        <>
                                         <div className="row">
                                            <div className="col-md-6 inline">
                                                <div className="form-group">
                                                    <label>First Name</label>
                                                    <input 
                                                    defaultValue={(e) => {setRegData({...regData, firstName: e.target.value})} } 
                                                    onChange={(e) => {setRegData({...regData, firstName: e.target.value})}}
                                                    value={regData.firstName}
                                                    type="text" className="form-control" placeholder="Okiri" />
                                                </div>
                                            </div>

                                            <div className="col-md-6 inline">
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input 
                                                defaultValue={(e) => {setRegData({...regData, lastName: e.target.value})} } 
                                                onChange={(e) => {setRegData({...regData, lastName: e.target.value})}}
                                                value={regData.lastName}
                                                type="text" className="form-control" placeholder="Doe" />
                                            </div>
                                            </div>
                                        </div>

   
                                        <div className="row">
                                            <div className="col-md-6 inline">
                                                <div className="form-group">
                                                    <label>Email address</label>
                                                    <input 
                                                    defaultValue={(e) => {setRegData({...regData, email: e.target.value})} } 
                                                    onChange={(e) => {setRegData({...regData, email: e.target.value})}}
                                                    value={regData.email}
                                                    type="email" className="form-control" placeholder="you@restaurant.com" />
                                                </div>
                                            </div>

                                            <div className="col-md-6 inline">
                                            <div className="form-group">
                                                <label>Phone number</label>
                                                <input 
                                                defaultValue={(e) => {setRegData({...regData, phoneNumber: e.target.value})} } 
                                                onChange={(e) => {setRegData({...regData, phoneNumber: e.target.value})}}
                                                value={regData.phoneNumber}
                                                type="text" className="form-control" placeholder="your phone number" />
                                            </div>
                                            </div>
                                        </div>

                                        

                                        </>
                                    }

                                    {
                                        step === 1 &&
                                        <>
                                        <div className="row">
                                            
                                            <div className="col-md-6 inline">
                                                
                                                <div className="form-group">
                                                    <label>Resturant Name</label>
                                                    <input 
                                                    defaultValue={(e) => {setRegData({...regData, resturantName: e.target.value})} } 
                                                    onChange={(e) => {setRegData({...regData, resturantName: e.target.value})}}
                                                    value={regData.resturantName}
                                                    type="text" className="form-control" placeholder="your phone number" />
                                                </div>
                                            </div>
                                                
                                        <div className="col-md-6 inline">
                                                     <div className="form-group">
                                                    <div className="d-flex align-items-center">
                                                        <label>Location</label>
                                                        <div className="ml-auto">
                                                            <Link onClick={(e) => goBack(e)} to="" className="brand-orange mrgb3"><span className="fe fe-arrow-left" style={{position:'relative', top:'3px'}}></span> &nbsp; Back</Link>
                                                        </div>
                                                    </div>
                                                    <DropDown options={getLocations} className="loc--drop" selected={getSelected} placeholder={`Select`} search={true}  />
                                                </div>
                                                
                                                </div>

                                     </div>
                                                
                                      
                                     
                                        <div className="row">
                                        <div className="col-md-6 inline">
                                                
                                                <div className="form-group">
                                                        <label>Address</label>
                                                        <input 
                                                        defaultValue={(e) => {setRegData({...regData, address: e.target.value})} } 
                                                        onChange={(e) => {setRegData({...regData, address: e.target.value})}}
                                                        type="text" className="form-control" placeholder="your address" />
                                                    </div>
                                            </div>
                                                   
                                                   
                                        <div className="col-md-4 inline">
                                            <div className="form-group">
                                                <label>Password</label>

                                                <div className="input-group"> 
                                                    <input 
                                                    defaultValue={(e) => {setRegData({...regData, password: e.target.value})} } 
                                                    onChange={(e) => {setRegData({...regData, password: e.target.value})}}
                                                    type={pass} className="form-control" placeholder="Choose a password" />
                                                    <div className="input-group-append">
                                                    <span className="input-group-text passt-r">
                                                        <Link onClick={(e) => showPass(e)} to="" className={`fe ${pass === 'password' ? 'fe-eye' : 'fe-eye-off'}`}></Link>
                                                    </span>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                                
                                        </div>
                                        </>
                                    }
                                    
                                    {/* {
                                        step === 2 &&
                                        <>
                                            <div className="form-group ui-text-center">

                                                <img src="../../../images/assets/logo-avatar.svg" alt="logo" />
                                                <div className="mrgt2 mrgb1 ui-text-center">
                                                    <Link  className="brand-orange fs-14 ui-text-center mrgb1">Click to upload your logo</Link>
                                                </div>
                                                
                                            </div>
                                        </>
                                    } */}
                                    

                                    <div className="form-group">
                                        {
                                            step === 0 &&
                                            <Link onClick={(e) => submit(e)} className="btn btn-lg btn-block onwhite">NEXT &nbsp; <span className="fe fe-chevrons-right"></span> </Link>
                                        }

                                        {
                                            step === 1 &&
                                            <>
                                                {
                                                    loading &&
                                                    <button className="btn btn-lg btn-block onwhite"><ButtonSpinner imageUrl={`../../../images/assets/spinner-white.svg`} /></button>
                                                }
                                                {
                                                    !loading &&
                                                    <button className="btn btn-lg btn-block onwhite">FINISH &nbsp; <span className="fe fe-chevrons-right"></span> </button>
                                                }
                                            </>
                                            
                                        }
                                        
                                    </div>

                                    <div className="mrgt2 mrgb1 ui-text-center">
                                        <Link to="/login" className="brand-orange fs-14 ui-text-center mrgb1">Returning? Login</Link>
                                    </div>                
                                </div>
                                </form>
                            }
                            
                            {
                                registered &&
                                <>
                                    <div className="ui-text-center mrgb2">
                                        <LottiePlayer lottieData={lottieData} w='150px' h='150px' loop={true} />
                                    </div>
                                    <div className="mrgb1">
                                        <h3 className="title fs-25 ui-text-center">Registration Successful.</h3>
                                        <p className="onmineshaft fs-14 ui-text-center mrgb1">Your account has been created successfully.</p>
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

export default Register;

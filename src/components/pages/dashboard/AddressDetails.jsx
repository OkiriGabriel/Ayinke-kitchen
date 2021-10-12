import React, {useEffect, useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom'
import DropDown from '../../layouts/partials/DropDown';
import LottiePlayer from '../../layouts/partials/LottiePlayer'
import Axios from 'axios'
import storage from '../../helpers/storage'
import Alert from '../../layouts/partials/Alert'

import AddressContext from '../../../context/address/addressContext'
import LocationContext from '../../../context/location/locationContext'

const AddressDetails = ({data, open, addresses, close, address, locations }) => {

    const locationContext = useContext(LocationContext);
    const addressContext = useContext(AddressContext);

    const history = useHistory();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const[msgData, setMsgData] = useState({
        title: '',
        message: '',
        buttonText: ''
    });

    const [aData, setAData] = useState({
        type: '',
        message: '',
        show: false
    })

    const [addData, setAddData] = useState({
        address: address.address,
        location: address.location,
        phoneNumber: address.phoneNumber
    });

    const [locChanged, setLoc] = useState(false);


    useEffect(() => {

    }, []);

    const setAdd = (id) => {
        const addres = addresses.find((f) => f._id === id);
        return addres;
    }

    const getLoc = (id) => {
        
        const loc = locations.find((l) => l._id === id);
        return loc ? loc.name : '';
    }

    const getLocations = () =>{
        const add = locations.map((a) => {
            const c = {
                value: a._id,
                label: a.name,
                left: '',
                image: ''
            }
            return c;
        })
        return add;
    }

    const selectLocation = (val) => {
        
        if(val){
            setAddData({...addData, location: val.value});
        }

    }

    const setLocation = () => {
        const ld = locations.find((l) => l._id === address.location);
        let loc = {
            value: ld._id,
            label: `${ld.name}`,
            left: '',
            image: ''
        }
        return loc;

    }

    // components

    const Details = () => {
        return (
            <>

                <div className="d-flex align-items-center mrgb1">
                    <h3 className="title font-weight-bold fs-17">Address Details</h3>
                    <div className="ml-auto">
                        <Link onClick={closePop} style={{position:'relative', top: '0px'}}><span className="fe fe-x fs-18 brand-orange"></span></Link>
                    </div>
                </div>

                <Alert show={aData.show} type={aData.type} message={aData.message} />

                <div className="mrgt2">

                <div className="d-flex align-items-center">
                        <p className="mrgb0 font-weight-medium onmineshaft fs-15">Location</p>
                        <p className="mrgb0 font-weight-bold text-muted fs-15 ml-auto">{ getLoc(address.location) }, Ogbomoso</p>
                    </div>

                    <div className="ui-line bg-silverlight"></div>

                    <div className="d-flex align-items-center">
                        <p className="mrgb0 font-weight-medium onmineshaft fs-15">Address</p>
                        <p className="mrgb0 font-weight-bold text-muted fs-15 ml-auto">{ address ? address.address : '' }</p>
                    </div>

                    <div className="ui-line bg-silverlight"></div>

                    <div className="d-flex align-items-center">
                        <p className="mrgb0 font-weight-medium onmineshaft fs-15">Phone number</p>
                        <p className="mrgb0 font-weight-bold text-muted fs-15 ml-auto">{ address ? address.phoneNumber : '' }</p>
                    </div>

                  
                    <div className="d-flex align-items-center mrgt3">

                        <div className="" style={{width: '49%'}}>
                            <Link onClick={(e) => submit(e, 'delete')} className={`btn btn-lgr btn-block onmineshaft bg-silverlight fs-16 mb-3`}>Delete</Link>
                        </div>

                        <div className="ui-text-right pdl1" style={{width: '59%'}}>
                            <Link onClick={(e) => submit(e, 'edit')} className="btn btn-lgr btn-block onwhite bg-brand-orange fs-16 mb-3">Edit</Link>
                        </div>

                    </div>

                </div>
            
            </>
        )
    }
  
    
    const DeleteAddress = () => {
        return (
            <>
                <div className="d-flex align-items-center mrgb1">
                    <h3 className="title font-weight-bold fs-17">Delete Address</h3>
                    <div className="ml-auto">
                        <Link onClick={closePop} style={{position:'relative', top: '0px'}}><span className="fe fe-x fs-18 brand-orange"></span></Link>
                    </div>
                </div>

                <div className="mrgt2">

                    <Alert show={aData.show} type={aData.type} message={aData.message} />

                    <form onSubmit={(e) => e.preventDefault()}>

                            <div className="d-flex align-items-center flex-column justify-content-center">

                                <div className="mrgt2 mrgb2 pdl2 pdr2 ui-text-center">

                                    <h3 className="title font-weight-bold mrgb1 fs-19">Are you sure you want to delete this address? </h3>
                                    <span className="mrgb0 font-weight-medium text-muted fs-15">Address will not be available for search anymore.</span>

                                </div>

                            </div>

                            <div className="d-flex align-items-center mrgt1">

                                <div className="" style={{width: '49%'}}>
                                    <Link onClick={(e) => submit(e, 'details')} className={`btn btn-lgr btn-block onmineshaft bg-silverlight fs-16 mb-3 ${loading ? 'disabled' : ''}`}>Cancel</Link>
                                </div>

                                <div className="ui-text-right pdl1" style={{width: '59%'}}>
                                    {
                                        loading ? (
                                            <Link className="btn btn-lgr spin btn-block onwhite bg-aliz fs-16 mb-3">
                                                <img width="35px" src="../../../images/assets/spinner-white.svg" alt="spinner" />
                                            </Link>
                                        ): (
                                            <Link onClick={(e) => submit(e, '')} className="btn btn-lgr btn-block onwhite bg-aliz fs-16 mb-3">Delete</Link>
                                        )
                                    }
                                </div>

                            </div>


                    </form>


                   
                    
                </div>
            
            </>
        )
    }

    const Message = () => {
        return(
            <>
                <div className="ui-text-center mrgb2 mrgt2">
                    <LottiePlayer w='100px' h='100px' loop={true} />
                </div>
                <div className="mrgb2 pdl3 pdr3">
                    <h3 className="title fs-20 ui-text-center">{msgData.title}</h3>
                    <p className="onmineshaft fs-14 ui-text-center mrgb1">{msgData.message}</p>
                </div>

                <div className="ui-text-center">
                    <Link onClick={(e) => submit(e, 'message')} className="btn btn-lgr onwhite bg-brand-orange fs-16 mb-3">{msgData.buttonText ? msgData.buttonText : 'No Text'}</Link>
                </div>

            </>
        )
    }

    // functions
    const closePop = () => {
        setLoading(false);
        setStep(0);
        close();
    }

    const refershList = () => {
        addressContext.getRestAddresses(storage.getUserID());
    }

    const submit = async(e, view) => {
        if(e){
            e.preventDefault();
        }

        if(step === 0 && view === 'edit'){
            setStep(1)
        }
    
        if(step === 0 && view === 'delete'){
            
            if(addresses.length === 1 || addresses.length === 0){
                setAData({...aData, show: true, type: 'danger', message: `You have only one address, you cannot delete it.`});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
            }else{
                setStep(2)
            }
        }
 
        if(step === 2 && (view === '' || view === undefined)){
            setLoading(true);
            await Axios.delete(`${process.env.REACT_APP_API_URL}/addresses/restaurant/${address._id}`, storage.getConfigWithBearer())
            .then((resp) => {

                setMsgData({...msgData, title: 'Deleted Successfully!', message: 'You have successfully deleted your address.', buttonText: 'OK. Got It.'})
                setLoading(false);
                setStep(3);

            }).catch((err) => {
                setAData({...aData, show: true, type: 'danger', message: `${err.response.data.message}`});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
                setLoading(false);
            })
        
        }

        if(step === 1 && view === ''){
            
            setLoading(true);

            await Axios.put(`${process.env.REACT_APP_API_URL}/addresses/restaurant/${address._id}`, {...addData}, storage.getConfigWithBearer())
            .then((resp) => {

                setMsgData({...msgData, title: 'Updated Successfully!', message: 'You have successfully updated your address.', buttonText: 'OK. Got It.'})
                setLoading(false);
                setStep(3);

            }).catch((err) => {
                setAData({...aData, show: true, type: 'danger', message: `${err.response.data.message}`});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
                setLoading(false);
            })

        }

    if(step === 3 && view === 'message'){
        closePop()
        refershList();
    }

    }

    return (
        <>

           <div className={`pop--box ${open ? 'open' : ''}`}>

                <div className="backdrop">

                    <div className="pop-content">

                    <div className="container">

                            {
                                step === 0 &&
                                <Details />
                            }

                            {
                                step === 1 &&
                                <>
            
                                <div className="d-flex align-items-center mrgb1">
                                    <h3 className="title font-weight-bold fs-17">Edit Address</h3>
                                    <div className="ml-auto">
                                        <Link onClick={closePop} style={{position:'relative', top: '0px'}}><span className="fe fe-x fs-18 brand-orange"></span></Link>
                                    </div>
                                </div>

                            <div className="mrgt2">

                                <Alert show={aData.show} type={aData.type} message={aData.message} />

                                <form onSubmit={(e) => e.preventDefault()}>

                                        <div className="mb-3">
                                            <label className="fs-14">Location</label>
                                            <DropDown options={getLocations} defaultValue={setLocation()} className="fd-drop foodet addr" selected={selectLocation} placeholder={`Select Location`} search={false}  />
                                        </div>

                                        <div className="mb-3">
                                            <input 
                                                defaultValue={address.address}
                                                onChange={(e) => setAddData({...addData, address: e.target.value}) }
                                                type="text" placeholder="Enter address" className="form-control" />
                                        </div>

                                        <div className="mb-3">
                                            <input 
                                                defaultValue={address.phoneNumber}
                                                onChange={(e) => setAddData({...addData, phoneNumber: e.target.value}) }
                                                type="number" placeholder="Enter phone number" className="form-control" />
                                        </div>

                                        <div className="d-flex align-items-center mrgt3">

                                            <div className="" style={{width: '49%'}}>
                                                <Link onClick={(e) => submit(e, 'details')} className={`btn btn-lgr btn-block onmineshaft bg-silverlight fs-16 mb-3 ${loading ? 'disabled' : ''}`}>Back</Link>
                                            </div>

                                            <div className="ui-text-right pdl1" style={{width: '59%'}}>
                                                {
                                                    loading ? (
                                                        <Link className="btn btn-lgr spin btn-block onwhite bg-apple fs-16 mb-3 disabled"><img width="35px" src="../../../images/assets/spinner-white.svg" alt="spinner" /></Link>
                                                    ) : (
                                                        <Link onClick={(e) => submit(e, '')} className="btn btn-lgr btn-block onwhite bg-apple fs-16 mb-3">Save</Link>
                                                    )
                                                }
                                            </div>

                                        </div>
                                </form>

                                
                            </div>

            </>
                            }

                    {
                        step === 2 &&
                        <DeleteAddress />
                    }

                    {
                        step === 3 &&
                        <Message />
                    }

                    </div>


                    </div>
                    
                </div>

           </div>

        </>

    )

}

export default AddressDetails;
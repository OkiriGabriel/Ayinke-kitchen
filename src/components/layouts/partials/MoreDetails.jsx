import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const MoreDetails = ({ isShow, closeModal, actionType, remove, deleteType }) => {

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [msgData, setMsgData] = useState({
        type: '',
        message: '',
        title: ''
    });
    

    useEffect(() => {
        
    }, []);


    const close = (e) => {

        if(e) e.preventDefault();


    }

    const Message = () => {
        return (
            <>

                <h3 className={`fs-15 font-weight-medium font-metropolisregular ${msgData.type === 'success' ? 'onapple' : 'onaliz' }`}>{ msgData.message }</h3>

                <p className="fs-14 onmineshaft mrgb0">{ msgData.message }</p>

                <div className="mrgt2">
                    <Link onClick={(e) => close(e)} className="btn bg-silver btn-block fs-14 onmineshaft fon-metropolisregular">OK</Link>
                </div>

            </>
        )
    };

    return (
        <>

            <Modal show={isShow} 
                onHide={closeModal} 
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
                                <h2 className="font-metropolisregular fs-16">Meal Details</h2>
                                <div className="ml-auto">
                                    <Link onClick={closeModal} style={{ position: 'relative', top: '-3px' }}>
                                        <span className="fe fe-x on-cord-o fs-13"></span>
                                    </Link>
                                </div>
                            </div>

                            <div className="modal-content-area">

                                <div className="ui-text-center">

                                    <img src="../../../images/assets/avatar.svg" alt="Child" />

                                    <div className="row">
                                        <div className="col-md-6">

                                            <p className="font-metropolissemibold fs-20 mt-3">Rice and bean</p>

                                        </div>
                                        <div className="col-md-6">

                                            <p className="font-metropolissemibold fs-20 mt-3">4500</p>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">

                                            <p className="font-metropolissemibold fs-20 mt-3">Delivered</p>

                                        </div>
                                        <div className="col-md-6">

                                            <p className="font-metropolissemibold fs-20 mt-3">20/10/2021</p>

                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    
                    </div>


                </Modal.Body>

            </Modal>
            
        </>
    )
}

export default MoreDetails;

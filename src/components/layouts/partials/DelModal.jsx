import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const DelModal = ({ isShow, closeModal, actionType, remove, deleteType }) => {

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [msgData, setMsgData] = useState({
        type: '',
        message: '',
        title: ''
    });
    

    useEffect(() => {
        
    }, []);

    const fireDelete = async (e) => {
        if(e) e.preventDefault();
        const result = await remove(); 

        if(result === true){

            setStep(1);

        }
    }

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
                                <h2 className="font-metropolisregular fs-16">Delete Meal</h2>
                                <div className="ml-auto">
                                    <Link onClick={closeModal} style={{ position: 'relative', top: '-3px' }}>
                                        <span className="fe fe-x on-cord-o fs-13"></span>
                                    </Link>
                                </div>
                            </div>

                            <div className="modal-content-area">

                                {
                                    step === 0 &&
                                    <>

                                        <p className="fs-15 font-weight-bold ui-text-center font-metropolisregular">
                                            Are you sure you want to delete meal?
                                        </p>

                                        <div className="form-group mrgt2">

                                            <div className="row">

                                                <div className="col-md-6">
                                                    <Link onClick={closeModal} className="btn bg-silver btn-block fs-14 onmineshaft font-metropolisregular">Cancel</Link>
                                                </div>
                                                <div className="col-md-6">
                                                <Link className="btn btn-block fs-14 onwhite btn-danger">Yes</Link>
                                                </div>

                                                {/* <div className="col-md-6">
                                                    {
                                                        loading &&
                                                        <Link className={`btn btn-block fs-14 onwhite disabled ${actionType === 'success' ? 'bg-apple' : 'btn-danger'}`}>loading...</Link>
                                                    }
                                                    {
                                                        !loading &&
                                                        <Link onClick={(e) => fireDelete(e)} className={`btn btn-block fs-14 onwhite ${actionType === 'success' ? 'bg-apple' : 'btn-danger'}`}>Yes</Link>
                                                    }
                                                </div> */}

                                            </div>

                                        </div>

                                    </>
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

export default DelModal;

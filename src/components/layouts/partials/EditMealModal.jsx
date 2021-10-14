import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const EditMealModal = ({ isShow, closeModal, actionType, remove, deleteType }) => {

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
                                <h2 className="font-metropolisregular fs-16">Edit Meal</h2>
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

                                        <div className="mrgt2">

                                            <div className="form-group">
                                                <label htmlFor="name" className="font-helvetica">Name</label>
                                                <input 
                                                className="fs-14 form-control font-helvetica"
                                                type="text" />
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="name" className="font-helvetica">Price</label>
                                                <input 
                                                className="fs-14 form-control font-helvetica"
                                                type="text" />
                                            </div>
                                            
                                            {/* <div className="form-group">
                                                <label htmlFor="name" className="font-helvetica">Price</label>
                                                <input 
                                                className="fs-14 form-control font-helvetica"
                                                type="text" />
                                            </div> */}

                                            <div className="form-group mrgt2">
                                                <button className="btn btn-md btn-block bg-primary onwhite fs-14">Submit</button>
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

export default EditMealModal;

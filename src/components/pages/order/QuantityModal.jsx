import React, { useEffect, useContext, useState, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import FoodList from '../FoodList'


const PayModal = ({isShow, closeModal,  price, getCount }) => {
    const [modalTitle, setModalTitle] = useState('');
    
    const [showAdd, setShowAdd] = useState(false);
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sel, setSel] = useState(false)
    
    const [closeIcon, setClose] = useState('plus');
    const [iconShow, setIcon] = useState(false);
    

    
    const multiple = 100;
    const dollarRate = 410;

    useEffect(() => {

        // locationContext.getLocations();
        setModalTitle('Order now');

    }, []);

    const close = (e) => {
        e.preventDefault();
        closeModal();
    }




    
    const inc = (e) => {
        if(e) e.preventDefault()
        setCount(count + 1);
        getCount(e, 'add', price)
    }

    const dec = (e) => {
        if(e) e.preventDefault()

        if(count < 2){
            setCount(1)
        }else{
            setCount(count - 1);
            getCount(e, 'sub', price)
        }
        

    }
    
    const closeX = () => {
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
                                            <input className="onblack" type="number" id="number" value={count} defaultValue={1} />
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




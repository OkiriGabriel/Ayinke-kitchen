import React from 'react'
import { Link } from 'react-router-dom'

import { Modal } from 'react-bootstrap'

const PlanModal = ({ isShow, closeModal }) => {

    const closeX = () => {
        closeModal()
    }

    return (
        <>

            <Modal 
            show={isShow}
            onHide={closeX}
            size='sm'
            fade={false}
            keyboard={false}
            aria-labelledby='medium-modal'
            centered
            className='md--modal'
            >

                <Modal.Body>

                    <div className="container">

                        <div className="row plan">

                            <div className="col-sm-7">

                                <div className="pln-bx">

                                    <div className="mrgb ui-text-center" style={{color: '#257324'}}>
                                        <span className="fs-12 ui-upcase font-weight-bold">Free Plan</span>
                                    </div>

                                    <div className="ui-text-center">
                                        <span className="fs-12 onapple">We offer you all services for free!</span>
                                    </div>

                                </div>

                            </div>
                            
                            <div className="col-sm-7">

                                <div className="pln-bx">

                                    <div className="mrgb ui-text-center">
                                        <span className="fs-12 ui-upcase brand-orange font-weight-bold">Free Plan</span>
                                    </div>

                                    <div className="ui-text-center">
                                        <span className="fs-12 brand-orange">We offer you all services for free!</span>
                                    </div>

                                </div>

                            </div>
                            
                            <div className="col-sm-9 mrgb">

                                <div className="pln-bx">

                                    <div className="mrgb ui-text-center" style={{color: '#257324'}}>
                                        <span className="fs-12 ui-upcase  font-weight-bold">Premium Plan</span>
                                    </div>

                                    <div className="ui-text-center">
                                        <span className="fs-12 onapple">We offer you all services for free!</span>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="ui-text-center">
                        <Link onClick={closeX} className="title fs-15 font-weight-bold brand-orange">Cancel</Link>
                    </div>

                </Modal.Body>

            </Modal>
            
        </>
    )
}

export default PlanModal

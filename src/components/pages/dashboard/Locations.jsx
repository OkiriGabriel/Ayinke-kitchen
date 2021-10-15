import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';

import DashTopBar from './DashTopBar'

const Locations = () => {

    
    const barLinks = () => {

        return(
            <>
                <div className="ui-group-button">

                    <Link to="/dashboard/add-location" className="btn btn-sm btn-primary onwhite fs-15">Add Location</Link>

                </div>
            </>
        )

    }

    return (
        <>

            <DashTopBar linkComps={barLinks}  /> 

            <section>

                <main className="dash-inner">

                    <div className="container">

                        <div className="row">

                            <div className="col-lg-6 col-md-6 col-sm-12">   

                                <div className="mrgb2">

                                    <div className="ui-full-bg-norm fooditem-bx ui-text-center ui-box-shadow-dark-light" style={{backgroundImage: 'url("../../../images/assets/fooditem.png")'}}>
                                        <h1 className="fs-30 brand-green font-helveticabold mrgb0">0</h1>
                                        <p className="mrgb0 brand-green fs-13 font-helvetica">Location(s) </p>
                                    </div>

                                </div>

                            </div>

                        </div>
                            
                        <div className="row">

                            <div className="col-md-12">

                                <div className="overview-box">

                                    <h2 className="font-helveticamedium mb-2">Locations</h2>
                                    
                                    <div className="ui-dashboard-card">


                                        <table className="table custom-table">

                                            <thead >
                                                <tr className="font-helvetica  py-8 ">
                                                    <th>S/N</th>
                                                    <th>Address</th>
                                                    <th>Delivery Price</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td className="font-helvetica">1</td>
                                                    <td className="font-helvetica">Ojo</td>
                                                    <td className="font-helvetica">1500</td>
                                                    <td className="font-helvetica">Available</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">2</td>
                                                    <td className="font-helvetica">Challenge</td>
                                                    <td className="font-helvetica">1500</td>
                                                    <td className="font-helvetica">Available</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">3</td>
                                                    <td className="font-helvetica">Iwo</td>
                                                    <td className="font-helvetica">1500</td>
                                                    <td className="font-helvetica">Available</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">4</td>
                                                    <td className="font-helvetica">Sango</td>
                                                    <td className="font-helvetica">1500</td>
                                                    <td className="font-helvetica">Available</td>
                                                </tr>
                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                            </div>
                            
                        </div>
                            
                    </div>

                </main>

            </section>
            
        </>
    )
}

export default Locations;

import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Orders = () => {
    return (
        <>

            <section>

                <main className="dash-inner">

                    <div className="container">

                        <div className="row">

                            <div className="col-lg-6 col-md-6 col-sm-12">   

                                <div className="mrgt3 mrgb2">

                                    <div className="ui-full-bg-norm fooditem-bx ui-text-center ui-box-shadow-dark-light" style={{backgroundImage: 'url("../../../images/assets/fooditem.png")'}}>
                                        <h1 className="fs-30 brand-green font-helveticabold mrgb0">0</h1>
                                        <p className="mrgb0 brand-green fs-13 font-helvetica">0 Orders </p>
                                    </div>

                                </div>

                            </div>
                            
                            <div className="col-lg-6 col-md-6 col-sm-12">   

                                <div className="mrgt3 mrgb2">

                                    <div className="ui-full-bg-norm fooditem-bx ui-text-center ui-box-shadow-dark-light" style={{backgroundImage: 'url("../../../images/assets/fooditem.png")'}}>
                                        <h1 className="fs-30 brand-green font-helveticabold mrgb0">0</h1>
                                        <p className="mrgb0 brand-green fs-13 font-helvetica">0 Transactions </p>
                                    </div>

                                </div>

                            </div>

                        </div>
                            
                        <div className="row">

                            <div className="col-md-12">

                                <div className="overview-box">

                                    <h2 className="font-helveticamedium mb-2">Orders</h2>
                                    
                                    <div className="ui-dashboard-card frnd-list">


                                        <table className="table custom-table">

                                            <thead>
                                                <tr className="font-helvetica">
                                                    <th>S/N</th>
                                                    <th>Amount</th>
                                                    <th>Description</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td className="font-helvetica">1</td>
                                                    <td className="font-helvetica">1000</td>
                                                    <td className="font-helvetica">Rice and beans</td>
                                                    <td className="font-helvetica">Delivered</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">2</td>
                                                    <td className="font-helvetica">1500</td>
                                                    <td className="font-helvetica">Beans and Bread</td>
                                                    <td className="font-helvetica">Delivered</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">3</td>
                                                    <td className="font-helvetica">2000</td>
                                                    <td className="font-helvetica">Jollof and Chicken</td>
                                                    <td className="font-helvetica">Delivered</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">4</td>
                                                    <td className="font-helvetica">2500</td>
                                                    <td className="font-helvetica">Plantains and Beans</td>
                                                    <td className="font-helvetica">Delivered</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">5</td>
                                                    <td className="font-helvetica">3000</td>
                                                    <td className="font-helvetica">Rice and Beans</td>
                                                    <td className="font-helvetica">Delivered</td>
                                                </tr>
                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                            </div>
                            
                        </div>
                            
                        <div className="row">

                            <div className="col-md-12 mrgt3 mrgb2">

                                <div className="overview-box">

                                    <h2 className="font-helveticamedium mb-2">Transactions</h2>
                                    
                                    <div className="ui-dashboard-card frnd-list">


                                        <table className="table custom-table">

                                            <thead>
                                                <tr className="font-helvetica">
                                                    <th>S/N</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td className="font-helvetica">1</td>
                                                    <td className="font-helvetica">Rice + Chicken</td>
                                                    <td className="font-helvetica">1500</td>
                                                    <td className="font-helvetica">Available</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">2</td>
                                                    <td className="font-helvetica">Beans + Bread</td>
                                                    <td className="font-helvetica">1500</td>
                                                    <td className="font-helvetica">Available</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">3</td>
                                                    <td className="font-helvetica">Jollof + Chicken</td>
                                                    <td className="font-helvetica">1500</td>
                                                    <td className="font-helvetica">Available</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">4</td>
                                                    <td className="font-helvetica">Plantains + Beans</td>
                                                    <td className="font-helvetica">1500</td>
                                                    <td className="font-helvetica">Available</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helvetica">5</td>
                                                    <td className="font-helvetica">Rice + Beans</td>
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

export default Orders;

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
                                        <p className="mrgb0 brand-green fs-13 font-helveticamedium">0 Orders </p>
                                    </div>

                                </div>

                            </div>
                            
                            <div className="col-lg-6 col-md-6 col-sm-12">   

                                <div className="mrgt3 mrgb2">

                                    <div className="ui-full-bg-norm fooditem-bx ui-text-center ui-box-shadow-dark-light" style={{backgroundImage: 'url("../../../images/assets/fooditem.png")'}}>
                                        <h1 className="fs-30 brand-green font-helveticabold mrgb0">0</h1>
                                        <p className="mrgb0 brand-green fs-13 font-helveticamedium">0 Transactions </p>
                                    </div>

                                </div>

                            </div>

                        </div>
                            
                        <div className="row">

                            <div className="col-md-12">

                                <div className="overview-box">

                                    <h2 className="font-helveticamedium fs-20 mb-2">Orders</h2>
                                    
                                    <div className="ui-dashboard-card frnd-list">


                                        <table className="table custom-table">

                                            <thead>
                                                <tr className="font-helveticabold">
                                                    <th className="font-helveticabold onblack">S/N</th>
                                                    <th className="font-helveticabold onblack">Amount</th>
                                                    <th className="font-helveticabold onblack">Description</th>
                                                    <th className="font-helveticabold onblack">Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td className="font-helveticamedium">1</td>
                                                    <td className="font-helveticamedium">1000</td>
                                                    <td className="font-helveticamedium">Rice and beans</td>
                                                    <td className="font-helveticamedium">Delivered</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helveticamedium">2</td>
                                                    <td className="font-helveticamedium">1500</td>
                                                    <td className="font-helveticamedium">Beans and Bread</td>
                                                    <td className="font-helveticamedium">Delivered</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helveticamedium">3</td>
                                                    <td className="font-helveticamedium">2000</td>
                                                    <td className="font-helveticamedium">Jollof and Chicken</td>
                                                    <td className="font-helveticamedium">Delivered</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helveticamedium">4</td>
                                                    <td className="font-helveticamedium">2500</td>
                                                    <td className="font-helveticamedium">Plantains and Beans</td>
                                                    <td className="font-helveticamedium">Delivered</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helveticamedium">5</td>
                                                    <td className="font-helveticamedium">3000</td>
                                                    <td className="font-helveticamedium">Rice and Beans</td>
                                                    <td className="font-helveticamedium">Delivered</td>
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

                                    <h2 className="font-helveticamedium fs-20 mb-2">Transactions</h2>
                                    
                                    <div className="ui-dashboard-card frnd-list">


                                        <table className="table custom-table">

                                            <thead>
                                                <tr className="font-helvetica">
                                                    <th className="font-helveticabold onblack">S/N</th>
                                                    <th className="font-helveticabold onblack">Name</th>
                                                    <th className="font-helveticabold onblack">Price</th>
                                                    <th className="font-helveticabold onblack">Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td className="font-helveticamedium">1</td>
                                                    <td className="font-helveticamedium">Rice + Chicken</td>
                                                    <td className="font-helveticamedium">1500</td>
                                                    <td className="font-helveticamedium">Available</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helveticamedium">2</td>
                                                    <td className="font-helveticamedium">Beans + Bread</td>
                                                    <td className="font-helveticamedium">1500</td>
                                                    <td className="font-helveticamedium">Available</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helveticamedium">3</td>
                                                    <td className="font-helveticamedium">Jollof + Chicken</td>
                                                    <td className="font-helveticamedium">1500</td>
                                                    <td className="font-helveticamedium">Available</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helveticamedium">4</td>
                                                    <td className="font-helveticamedium">Plantains + Beans</td>
                                                    <td className="font-helveticamedium">1500</td>
                                                    <td className="font-helveticamedium">Available</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="font-helveticamedium">5</td>
                                                    <td className="font-helveticamedium">Rice + Beans</td>
                                                    <td className="font-helveticamedium">1500</td>
                                                    <td className="font-helveticamedium">Available</td>
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

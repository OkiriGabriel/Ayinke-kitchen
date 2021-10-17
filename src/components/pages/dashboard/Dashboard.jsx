import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TopBar from './TopBar'
import BottomNav from './BottomNav';
import OverView from './OverView'

import PieChart from './components/TwoPieChart';
import LineChart from './components/ProjLineChart';

import MoreDetails from '../../layouts/partials/MoreDetails';

const Dashboard = () => {

    const [show, setShow] = useState(false);

    const toggleModal = (e) => {
        if(e) e.preventDefault();
        setShow(!show)
    };

    return(
        <>
      

            <main className="dash-inner mrgb3 mrgt2">
                

                <section className="ord-ovw mrgb1">
                    <div className="">
                        <div className="row">

                            <div className="col-md-4 col-lg-4 col-sm-12">

                            <div className="ui-dashboard-card">
                                    <div className="ui-card-body ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blob-one.svg")'}}>

                                        <div className="d-flex">
                                            
                                        <div>
                                        <h3 className="brand-orange fs-18 mrgb0 font-weight-bold">
                                            Your Orders
                                        </h3>

                                        <p className="onmineshaft fs-14  mt-2 mb-2">Track your orders.</p>
                                    
                                        </div>

                                        <Link className="ui-upcase brand-orange fs-11 ml-auto font-weight-bold">
                                            View Orders
                                            <span className="fe fe-chevron-right fs-14 pdl" style={{position: 'relative', top: '2px'}}></span>
                                        </Link>

                                        </div>

                                    </div>
                                </div>

                            
                            </div>
                            <div className="col-md-4 col-lg-4 col-sm-12">
                                <div className="ui-dashboard-card">
                                    <div className="ui-card-body ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blob-one.svg")'}}>

                                        <div className="d-flex">
                                            
                                        <div>
                                        <h3 className="brand-orange fs-18 mrgb0 font-weight-bold">
                                          Transactions
                                        </h3>

                                        <p className="onmineshaft fs-14  mt-2 mb-2">View your transaction.</p>
                                    
                                        </div>

                                        <Link className="ui-upcase brand-orange fs-11 ml-auto font-weight-bold">
                                            View Transaction
                                            <span className="fe fe-chevron-right fs-14 pdl" style={{position: 'relative', top: '2px'}}></span>
                                        </Link>

                                        </div>

                                    </div>
                                </div>
                            </div>
                                <div className="col-md-4 col-lg-4 col-sm-12">

                                <div className="ui-dashboard-card">
                                    <div className="ui-card-body ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blob-one.svg")'}}>

                                        <div className="d-flex">
                                            
                                        <div>
                                        <h3 className="brand-orange fs-18 mrgb0 font-weight-bold">
                                            Meals
                                        </h3>

                                        <p className="onmineshaft fs-14  mt-2 mb-2">Track your orders.</p>
                                    
                                        </div>

                                        <Link className="ui-upcase brand-orange fs-11 ml-auto font-weight-bold">
                                            View Meals
                                            <span className="fe fe-chevron-right fs-14 pdl" style={{position: 'relative', top: '2px'}}></span>
                                        </Link>

                                        </div>

                                    </div>
                                </div>


                                </div>

                        </div>
                    </div>
                </section> 

                <div className="ui-separate-xsmall"></div>

                <div className="ui-separate-xsmall"></div>

                <section className="mng-bx ui-rounded-small">
                    
                    <div className="container">

                        <h3 className="onmineshaft fs-14 mrgb1 mt-1">Your details</h3>

                        <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12">
                                
                                <Link to="/dashboard/food-items/add" className="block-link">

                                    <div className="mng-item">

                                        <div className="avatar ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blobsq-one.svg")'}}></div>
                                        <span className="ui-upcase brand-orange fs-11 font-weight-bold pdl2">Add Meals</span>
                                        <span className="fe fe-chevron-right fs-14 pdl ml-auto brand-orange" style={{position: 'relative', top: '0px'}}></span>

                                    </div>

                                </Link>

                            </div>


                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <Link to="/dashboard/add-location" className="block-link">

                                    <div className="mng-item">

                                        <div className="avatar ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blobsq-two.svg")'}}></div>
                                        <span className="ui-upcase brand-orange fs-11 font-weight-bold pdl2">Add Locations</span>
                                        <span className="fe fe-chevron-right fs-14 pdl ml-auto brand-orange" style={{position: 'relative', top: '0px'}}></span>

                                    </div>

                                </Link>
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12">
                                    
                                <Link className="block-link">

                                    <div className="mng-item">

                                        <div className="avatar ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blobsq-three.svg")'}}></div>
                                        <span className="ui-upcase brand-orange fs-11 font-weight-bold pdl2">Add Admins</span>
                                        <span className="fe fe-chevron-right fs-14 pdl ml-auto brand-orange" style={{position: 'relative', top: '0px'}}></span>
                                        
                                    </div>

                                </Link>


                            </div>
                    
                        </div>
                    </div>
                    
                </section>  

                <div className="ui-separate-small"></div>

                <div className="row">

                    <div className="col-md-4">

                        <div className="overview-box">

                            <div className="ui-dashboard-card">

                                <PieChart />

                            </div>

                        </div>

                    </div>
                    
                    <div className="col-md-8">

                        <div className="overview-box">

                            <div className="ui-dashboard-card p-5">

                                <LineChart />

                            </div>

                        </div>

                    </div>

                </div>

                <div className="ui-separate-small"></div>
                       
                <div className="row">

                    <div className="col-md-12 mrgb2">

                        <div className="overview-box">

                            <h2 className="font-helveticamedium fs-20  onblack mb-2">Orders</h2>
                            
                            <div className="ui-dashboard-card ">


                                <table className="table custom-table">

                                    <thead>
                                        <tr className="font-helvetica">
                                        <th className="font-helveticabold onblack">SN</th>
                                            <th className="font-helveticabold onblack">Name</th>
                                            <th  className="font-helveticabold onblack">Phone Number</th>
                                            <th  className="font-helveticabold onblack">Email Address</th>
                                            <th  className="font-helveticabold onblack">Address</th>
                                            <th  className="font-helveticabold onblack">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td className="font-helveticamedium">1</td>
                                            <td className="font-helveticamedium">Rice and beans</td>
                                            <td className="font-helveticamedium">07014257371</td>
                                            <td className="font-helveticamedium">johndoe@gmail.com</td>
                                            <td className="font-helveticamedium">Along Alao Farms Road Tanke Akata, Ilorin</td>
                                            <td className="ui-text-center">
                                                <Link onClick={(e) => toggleModal(e)} ><span className="fe fe-align-center"></span></Link>
                                            </td>
                                        </tr>
                                        
                                        <tr>
                                        <td className="font-helveticamedium">2</td>
                                        <td className="font-helveticamedium">Jollof and Chicken</td>
                                            <td className="font-helveticamedium">07014257371</td>
                                            <td className="font-helveticamedium">johndoe@gmail.com</td>
                                            <td className="font-helveticamedium">Along Alao Farms Road Tanke Akata, Ilorin</td>
                                            <td className="ui-text-center">
                                                <Link onClick={(e) => toggleModal(e)} ><span className="fe fe-align-center"></span></Link>
                                            </td>
                                        </tr>
                                        
                                        <tr>
                                        <td className="font-helveticamedium">3</td>
                                            <td className="font-helveticamedium">Jollof and Chicken</td>
                                            <td className="font-helveticamedium">07014257371</td>
                                            <td className="font-helveticamedium">johndoe@gmail.com</td>
                                            <td className="font-helveticamedium">Along Alao Farms Road Tanke Akata, Ilorin</td>
                                            <td className="ui-text-center">
                                                <Link onClick={(e) => toggleModal(e)} ><span className="fe fe-align-center"></span></Link>
                                            </td>
                                        </tr>
                                        
                                        <tr>
                                        <td className="font-helveticamedium">4</td>
                                            <td className="font-helveticamedium">Plantains and Beans</td>
                                            <td className="font-helveticamedium">07014257371</td>
                                            <td className="font-helveticamedium">johndoe@gmail.com</td>
                                            <td className="font-helveticamedium">Along Alao Farms Road Tanke Akata, Ilorin</td>
                                            <td className="ui-text-center">
                                                <Link onClick={(e) => toggleModal(e)} ><span className="fe fe-align-center"></span></Link>
                                            </td>
                                        </tr>
                                        
                                        <tr>
                                        <td className="font-helveticamedium">5</td>
                                            <td className="font-helveticamedium">Rice and Beans</td>
                                            <td className="font-helveticamedium">07014257371</td>
                                            <td className="font-helveticamedium">johndoe@gmail.com</td>
                                            <td className="font-helveticamedium">Along Alao Farms Road Tanke Akata, Ilorin</td>
                                            <td className="ui-text-center">
                                                <Link onClick={(e) => toggleModal(e)} ><span className="fe fe-align-center"></span></Link>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>
                    
                </div>

            </main>
           

           <MoreDetails isShow={show} closeModal={toggleModal} />
        </>
    )

}

export default Dashboard;
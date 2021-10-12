import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TopBar from './TopBar'
import BottomNav from './BottomNav';
import OverView from './OverView'



const Dashboard = () => {

    
    

    return(
        <>
      

            <main className="dash-inner">
                <OverView  />

                <section className="ord-ovw">
                    <div className="container">
                        <div className="ui-dashboard-card">
                            <div className="ui-card-body ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blob-one.svg")'}}>

                                <h3 className="brand-orange fs-18 mrgb0 font-weight-bold">
                                    Your Orders
                                </h3>

                                <p className="onmineshaft fs-14  mt-2 mb-2">Track orders from your customers, see new orders.</p>

                                <Link className="ui-upcase brand-orange fs-11 font-weight-bold">
                                    View Orders
                                    <span className="fe fe-chevron-right fs-14 pdl" style={{position: 'relative', top: '2px'}}></span>
                                </Link>

                            </div>
                        </div>
                    </div>
                </section> 

                <div className="ui-separate-xsmall"></div>

                <div className="ui-separate-xsmall"></div>

                <section className="mng-bx">
                    
                    <div className="container">

                        <h3 className="onmineshaft fs-14 mrgb1 mt-1">Manage your restaurant</h3>

                        <Link className="block-link">

                            <div className="mng-item">

                                <div className="avatar ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blobsq-one.svg")'}}></div>
                                <span className="ui-upcase brand-orange fs-11 font-weight-bold pdl2">Add Food Items</span>
                                <span className="fe fe-chevron-right fs-14 pdl ml-auto brand-orange" style={{position: 'relative', top: '0px'}}></span>

                            </div>

                        </Link>

                        <Link className="block-link">

                            <div className="mng-item">

                                <div className="avatar ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blobsq-two.svg")'}}></div>
                                <span className="ui-upcase brand-orange fs-11 font-weight-bold pdl2">Add More Addresses</span>
                                <span className="fe fe-chevron-right fs-14 pdl ml-auto brand-orange" style={{position: 'relative', top: '0px'}}></span>

                            </div>

                        </Link>

                        <Link className="block-link">

                            <div className="mng-item">

                                <div className="avatar ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/blobsq-three.svg")'}}></div>
                                <span className="ui-upcase brand-orange fs-11 font-weight-bold pdl2">Add Managers</span>
                                <span className="fe fe-chevron-right fs-14 pdl ml-auto brand-orange" style={{position: 'relative', top: '0px'}}></span>

                            </div>

                        </Link>
                        

                    </div>
                    
                </section>  

            </main>

            <BottomNav />
           
        </>
    )

}

export default Dashboard;
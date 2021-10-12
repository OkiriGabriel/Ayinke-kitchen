import React, { Component } from 'react';

import Header from '../pages/dashboard/TopBar';
import SideMenu from '../layouts/partials/SideMenu';


const Dashboard = (DashboardComponent, flat) => {


    return class DashboardLayout extends Component {

        constructor(props){
            super();
        }

        render(){

            return (
                <>
                <Header />
                    <div className={`${flat && flat === true ? '' : 'container-fluid main-cont'}`}>

                        <SideMenu />

                         <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4 dash-body">

                            <DashboardComponent {...this.props} />
                        
                        </main>



                    </div>

                </>
            )

        }

    }

}

export default Dashboard;
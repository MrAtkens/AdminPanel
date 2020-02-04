import React, {Component} from 'react'
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux'

import 'react-toastify/dist/ReactToastify.css';

import { NavigationAppBar } from './components'
import { AccesGrid } from './containers'
import { adminAccept, fetchProducts, fetchOrders, fetchMails, fetchCategories, fetchUsers } from './actions'
import MainView from './view';

class Main extends Component{
    componentWillMount(){
      this.props.adminAccept()
      this.props.fetchProducts()
      this.props.fetchOrders()
      this.props.fetchMails()
      this.props.fetchUsers()
      this.props.fetchCategories()
    }

    render(){
        return(
          <div>
            {this.props.redirectStatus === true ? (<div>
              <NavigationAppBar mails={this.props.mails}/>
                <MainView/> {/* Тут роуты */}
            </div>) : (<AccesGrid/>)}      
            <ToastContainer
            position={'bottom-left'}
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover/>               
          </div>
        );
    }
}

const mapStateToProps = store => {
  return {
    redirectStatus: store.usersReducer.redirectStatus,
    mails: store.mailsRedurcer.mails
  }
}

const mapDispatchToProps = {
  adminAccept,
  fetchProducts,
  fetchOrders,
  fetchMails,
  fetchUsers,
  fetchCategories
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Main)
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { Fade, Slide } from 'react-reveal';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import StoreOutlinedIcon from '@material-ui/icons/StoreOutlined';
import './style.css';

import { fetchCategories, fetchProducts, fetchMails, fetchOrders, fetchUsers } from '../../actions'

class MainPage extends Component {

  componentWillMount(){
    this.props.fetchCategories()
    this.props.fetchProducts()
    this.props.fetchMails()
    this.props.fetchOrders()
    this.props.fetchUsers()
  }

  render(){
    return(
        <Grid container spacing={3}>
            <Grid item xs={4}>
             <Fade left duration={1800}>
                <Card>
                    <CardContent className="card-content">
                        <div style={{backgroundColor: '#3F6AD8'}} className="logo-background">
                            <ShoppingCartOutlinedIcon style={{color: 'white'}} className="icon-orders"/>
                        </div>
                        <Typography className="card-text" variant="h3" component="h3">
                            {this.props.ordersCount}
                            <br/>
                            Общее количество заказов
                        </Typography>
                    </CardContent>
                </Card>
             </Fade>
            </Grid>
            <Grid item xs={4}>
              <Fade top duration={1800}>
                <Card>
                    <CardContent className="card-content">
                        <div style={{backgroundColor: '#DD3B61'}} className="logo-background">
                            <MailOutlineIcon style={{color: 'white'}} className="icon-orders"/>
                        </div>
                        <Typography className="card-text" variant="h3" component="h3">
                            {this.props.mailsCount}
                            <br/>
                            Общее количество письм
                        </Typography>
                    </CardContent>
                </Card>
              </Fade>
            </Grid>
            <Grid item xs={4}>
              <Fade right duration={1800}>
                <Card>
                    <CardContent className="card-content">
                        <div style={{backgroundColor: '#4eca8a'}} className="logo-background">
                            <PersonOutlineIcon style={{color: 'white'}} className="icon-orders"/>
                        </div>
                        <Typography className="card-text" variant="h3" component="h3">
                            {this.props.usersCount}
                            <br/>
                            Общее количество пользователей
                        </Typography>
                    </CardContent>
                </Card>
              </Fade>
            </Grid>
            <Grid item xs={6}>
              <Slide left duration={1800}>
                <Card>
                    <CardContent className="card-content">
                        <div style={{backgroundColor: '#F6B824'}} className="logo-background">
                            <StoreOutlinedIcon style={{color: 'white'}} className="icon-orders"/>
                        </div>
                        <Typography className="card-text" variant="h3" component="h3">
                            {this.props.productsCount}
                            <br/>
                            Общее количество товаров
                        </Typography>
                    </CardContent>
                </Card>
              </Slide>
            </Grid>
            <Grid item xs={6}>
              <Slide right duration={1800}>
                <Card>
                    <CardContent className="card-content">
                        <div style={{backgroundColor: '#8BA5E7'}} className="logo-background">
                            <CategoryOutlinedIcon style={{color: 'white'}} className="icon-orders"/>
                        </div>
                        <Typography className="card-text" variant="h3" component="h3">
                            {this.props.categoriesCount}
                            <br/>
                            Общее количество категорий
                        </Typography>
                    </CardContent>
                </Card>
              </Slide>
            </Grid>
        </Grid>
      );
  }
}

const mapStateToProps = store => {
    return {
        mailsCount: store.mailsRedurcer.mails.length,
        ordersCount: store.ordersReducer.orders.length,
        usersCount: store.usersReducer.users.length,
        categoriesCount: store.categoriesReducer.categories.length,
        productsCount: store.productsReducer.products.length,
    }
  }

const mapDispatchToProps = {
    fetchCategories, 
    fetchProducts, 
    fetchMails, 
    fetchOrders, 
    fetchUsers
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(MainPage)
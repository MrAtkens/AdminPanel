import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Slide } from 'react-reveal';
import { Button, TextField, Paper, Grid, Typography  } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getAccesCode, singIn } from '../../actions'

import './style.css'

class AccesGrid extends Component {

  onSubmit = () => {
    const userEmail = this.inputEmail.value
    this.props.getAccesCode(userEmail, false)
  }
  
  onSingIn = () => {
    const userCode = this.inputCode.value
    const userEmail = this.inputEmail.value
    console.log(userEmail)
    this.props.singIn(userEmail,userCode)
  }

  render(){
    return( 
      <Grid className="primaryBackGround" container alingitems="center" justify="center" direction="row">
          <Grid className="cardBlock" item xs={6} sm={3}>
            <Slide top duration={3}>
              <Paper className="paper">
                  <Grid className="inputGrid">
                    <Typography className="header" variant="h4" component="h5">
                      Вход
                    </Typography>
                      <TextField type="email" className="input" name="code" label="Почта" placeholder="Почта" variant="outlined"  margin="normal" fullWidth inputRef={inputEmail => this.inputEmail = inputEmail}/>
                      <Button variant="contained" color="primary" disabled={this.props.disabled} onClick={this.onSubmit}>Отправить код</Button>
                      {this.props.singUpCodeStatus === true ? (
                        <div>
                          <TextField className="input" name="code" label="Код" placeholder="Код" variant="outlined"  margin="normal" fullWidth type="number" inputRef={inputCode => this.inputCode = inputCode}/>
                          <Button onClick={this.onSingIn} variant="contained" color="secondary">Подтвердить</Button>
                        </div>
                      ) : (false)}
                  </Grid>
              </Paper>
            </Slide>
          </Grid>
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
    </Grid>);
  }
}

const mapStateToProps = store => {
    return {
      redirectStatus: store.usersReducer.redirectStatus,
      singUpCodeStatus: store.usersReducer.singUpCodeStatus,
      disabled: store.usersReducer.disabled
    }
  }

const mapDispatchToProps = {
  getAccesCode,
  singIn
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(AccesGrid)
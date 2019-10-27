import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Slide } from 'react-reveal';
import InputMask from 'react-input-mask'
import { Button, TextField, Paper, Grid, Typography  } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { accesPhone, singIn } from '../../actions'

import './style.css'

class AccesGrid extends Component {

  constructor(props) {
    super(props);

    this.phoneRef = React.createRef();
  }
  
  onSubmit = () => {
      console.log(this.phoneRef.current)
      console.log(this.phoneRef.current.value)
    const userPhone = this.phoneRef.current.value
    this.props.accesPhone(userPhone, false)
    this.setState({ phone: userPhone })
  }
  
  onSingIn = () => {
    const userCode = this.inputCode.value
    this.props.singIn(this.state.phone,userCode)
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
                      <InputMask autoFocus={true} className="input" disabled={this.props.disabled} name={'phone'} mask="+7 (999) 999-99-99" maskChar={null} ref={this.phoneRef}>
                        {(inputProps) => <TextField  {...inputProps} type="tel" label="Телефон" placeholder={'Телефон*'} variant="outlined" />}
                      </InputMask>
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
    accesPhone,
    singIn
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(AccesGrid)
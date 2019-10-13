
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Icon from '../components/images/icon.png'
import {Link} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { Typography, CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import axios from 'axios';


const styles = (theme)=>({
    ...theme
})

class Login extends Component {
    constructor(props){
        super(props)
        this.state ={
            email:'',
            password:'',
            loading:false,
            errors:{}
        }
    }


    handleSubmit = (event)=>{
        event.preventDefault();
        this.setState({
            loading:true
        })
        const userData ={
            email: this.state.email,
            passowrd: this.state.password
        }
        axios.post('/login', userData)
            .then(res =>{
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
                this.setState({
                    loading:false
                });
                this.props.history.push('/')
            })
            .catch(err =>{
                this.setState({
                    errors: err.response.data,
                    loading:false

                })
            })
    }

    handleChange = (event)=>{
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render() {

        const {classes } = this.props;

        const { errors, loading }= this.state

        return (
           <Grid container className={classes.form} >
               <Grid item sm />
               <Grid item sm >
               <img src={Icon} alt="icon" className={classes.image}/>
               <Typography variant="h2" className={classes.pageTitle} >
                    Login
                   </Typography>
                   <form noValidate onSubmit={this.handleSubmit} >
                       <TextField id="email" name="email" 
                       type="email" label="Email" 
                       className={classes.textField} 
                       helperText={errors.email}
                       error={errors.email ? true: false}
                       value={this.state.email} fullWidth
                       onChange = {this.handleChange}
                       />
                        <TextField id="password" name="password" 
                       type="password" label="Password" 
                       className={classes.textField} 
                       helperText={errors.password}
                       error={errors.password ? true: false}
                       value={this.state.password} fullWidth
                       onChange = {this.handleChange}
                       />
                       { errors.general && (
                           <Typography variant="body2" className={classes.customError}>
                            {errors.general}

                            </Typography>
                       )}
                       <Button type="submit" variant="contained" color="primary" className={classes.button} >
                                Login
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                           </Button>
                   </form>
                   <small> You don't have account ? <Link to={`/signup`}>Click Here</Link></small>
               </Grid >
               <Grid item sm />

           </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired
}



export default withStyles(styles)(Login);
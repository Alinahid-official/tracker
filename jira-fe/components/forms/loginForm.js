import classes from "../../styles/LoginForm.module.css"
import userService from '../../services/auth'
import React, { useState } from "react";
import { useRouter } from 'next/router'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export default function LoginForm(){
    const router = useRouter()
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            console.log("login")
            setLoading(true)
            const data = await userService.login({
                email : email,
                password : password
            })
            window.localStorage.setItem(
                'userToken', `bearer ${data.accessToken}`
            )
            window.localStorage.setItem(
                'user', JSON.stringify(data.user)
            )
            setEmail('')
            setPassword('')
           
            router.push('/dashboard/projectBoard')
            setLoading(false)
            
        }catch(e){
            console.log(e)
        }
    }
    return(
        // className='flex align-center jc-center'
        <div className={classes.grid}>
            <div className={classes.sideBar}>
                       <h1>Tracker</h1>
            </div>
                 
         <div>
          <form className={classes.form} onSubmit={handleLogin}>
            <div>
              <h1>Login</h1>
              </div>
              <div className={classes["login-field"]}>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter your email address' />
              </div>
              <div className={classes["login-field"]}>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your password' />
              </div>
              <div className={classes['password-forgot']}>
                  <p>Forgot Password?</p>
              </div>
              <div>
              {/* {loading?<button className={classes.btn} disabled> logging In</button>:<button className={classes.btn} type="submit">Login</button>} */}
              {loading?<Backdrop className={classes.backdrop} open >
               <CircularProgress color="inherit" />
               </Backdrop>:<button className={classes.btn} type="submit">Login</button>}
              </div>
             
          </form>
          </div>
      </div>
    )
}
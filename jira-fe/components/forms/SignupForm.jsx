import classes from "../../styles/AuthForm.module.css"
import {useFormik} from "formik"
import userService from '../../services/auth'

import * as Yup from "yup"
import { useRouter } from "next/router"
import { useState,useEffect,useContext } from "react"
import axios from "axios"
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material"


const initialValues  = {
    name:"",
    email:"",
    password:"",
    jobRole:""
}


const validationSchema = Yup.object({
    name:Yup.string().required("Required"),
    email:Yup.string().email("Invalid Email Format").required("Required"),
    password:Yup.string().required("Required"),
    jobRole:Yup.string().oneOf([ "developer", "manager"], "Invalid Job Type") .required("Required")
})

const SignupForm = ({token,role})=>{
    // console.log(role)
    // console.log(token)
    const [open,setOpen] = useState(false)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [emailErr,setEmailErr] = useState("")
    const [success,setSuccess] = useState("")
// console.log(emailErr)

    const onSubmit = async(values,actions)=>{
        // console.log(values)
        setLoading(true)
        // console.log(token)
       try {
        const response = await userService.signup(
        {
           
            name:values.name,
            email:values.email,
            job_role:values.jobRole,
            password:values.password,
            
           },
        {
            headers:{
                "Access-Control-Allow-Origin" : "*",
                'Content-Type': 'application/json',
                'Authorization' : token
            }
        }
        )
        console.log(response?.data)
        
       } catch (error) {

        console.log(error)
        // if(error.response?.status === 400){
        //             setEmailErr("Email already exists")
        // }else if(error.response?.status === 500){
        //     setEmailErr("Something went wrong")
        // }else if(error.response?.status === 401){
        //     // setEmailErr("You are not authorized")
        //     // setEmailErr("Something went wrong")
        //     setEmailErr("Email already exists")
        // }
        
       }
       
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
        
        setLoading(false)
        
    }

    const handleClose = ()=>{
         
          setOpen(false)
    }

    


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
     })

    
    return (
        // <div>
     <div className={classes.signup}>
     <div>
          <h1>Sign Up</h1>
          </div>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
      <div className={classes['form-control']}>
              <label htmlFor='name'>Name</label>
              <input 
              type="text" 
              name="name" 
              id="name" 
              placeholder="Name"
              onChange={formik.handleChange} 
             value={formik.values.name}
             onBlur={formik.handleBlur}
              />
            {formik.touched.name && formik.errors.name?<p className={classes.error}>{formik.errors.name}</p>:null}
        </div>

        <div className={classes['form-control']}>
              <label htmlFor='email'>Email</label>
              <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Email"
              onChange={formik.handleChange} 
             value={formik.values.email}
             onBlur={formik.handleBlur}
              />
            {formik.touched.email && formik.errors.email?<p className={classes.error}>{formik.errors.email}</p>:null}
        </div>

        <div className={classes['form-control']}>
              <label htmlFor='jobRole'>Job Role</label>
              <select 
              type="text" 
              name="jobRole" 
              id="jobRole" 
              onChange={formik.handleChange} 
              value={formik.values.jobRole}
              onBlur={formik.handleBlur}
              >
              <option value=""  disabled>Select</option>
              <option value="manager" >Manager</option>
              <option value="developer" >Developer</option>
              </select>
            {formik.touched.jobRole && formik.errors.jobRole?<p className={classes.error}>{formik.errors.jobRole}</p>:null}
        </div>

        <div className={classes['form-control']}>
              <label htmlFor='password'>Password</label>
              <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Password"
              onChange={formik.handleChange} 
             value={formik.values.password}
             onBlur={formik.handleBlur}
              />
            {formik.touched.password && formik.errors.password?<p className={classes.error}>{formik.errors.password}</p>:null}
        </div>
         
          <div className={classes.btn}>
          <button onClick={()=>setOpen(true)} disabled={!formik.isValid || formik.isSubmitting} onSubmit={onSubmit}   type="submit">Create Account</button>
          </div>
         
      </form>

      {/* {emailErr?  <Snackbar 
            onClose={handleClose} 
            autoHideDuration={2000} 
            open={open} 
            anchorOrigin={{
             vertical:"top",
             horizontal:"right"
            }}>
             <Alert severity="error">{emailErr}</Alert>
            </Snackbar>:<Snackbar 
            onClose={handleClose} 
            autoHideDuration={2000} 
            open={open} 
            anchorOrigin={{
             vertical:"top",
             horizontal:"right"
            }}>
             <Alert severity="success">Account Created</Alert>
            </Snackbar>} */}
      </div>
               /* </div> */
    )
}

export default SignupForm
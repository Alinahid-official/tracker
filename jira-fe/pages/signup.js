
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Layout from '../layout/layout'
import SignupForm from "../components/forms/SignupForm";

const Signup = ({user,token})=>{
  
    const router = useRouter()
    useEffect(() =>{
        if(!user){
            router.push('/login')
        }
    })

    return (
        <div>
            
            <Layout role={user ? JSON.parse(user).job_role : null}>
                <SignupForm token={token} role={user ? JSON.parse(user).job_role : null}/>
            </Layout>
        </div>
    )
}

export default Signup
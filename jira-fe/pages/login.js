import Layout from '../layout/layout'
import React, { useEffect, useState} from "react";
import LoginForm from "../components/forms/loginForm"
import { useRouter } from 'next/router'

export default function Login({user}){
    const router = useRouter()
    useEffect(() => {
        if(user){
            router.push('/dashboard/projectBoard')
        }
           
    })
    return(
        <>
            {/* <Layout> */}
            
                <LoginForm/>
            {/* </Layout> */}
        </>
    )
}

import { useContext , useEffect } from "react";
import { Context } from "../../context";
import { useRouter } from 'next/router'
import Layout from '../../layout/managerLayout'

export default function ManagerDashBoard(){
    const router = useRouter()
    const { state, dispatch } = useContext(Context);
    useEffect(() =>{
        if(!state && state.user.job_role!='manager'){
            router.push('/login')
        }
    })
    
    return(
        <>
            <Layout>
                <div>
                    manager Dash
                </div>
            </Layout>
        </>
    )
}
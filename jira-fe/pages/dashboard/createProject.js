import { useEffect } from "react";
import { useRouter } from 'next/router'
import Layout from '../../layout/layout'
import CreateProjectForm from "../../components/forms/createProject";
import Header from '../../components/headers/searchbar'

export default function CreateProject({user, token}){
    const router = useRouter()
    useEffect(() =>{
        if(!user){
            router.push('/login')
        }
    })
    return(
        <>
            <Layout role={user ? JSON.parse(user).job_role : null}>
                <Header/>
                <CreateProjectForm token={token}/>
            </Layout>
        </>
    )
}
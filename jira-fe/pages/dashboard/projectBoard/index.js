import { useEffect } from "react";
import { useRouter } from 'next/router'
import Layout from '../../../layout/layout'
import ProjectList from "../../../components/containers/projectList";
import SearchBar from '../../../components/headers/searchbar'

export default function ProjectBoard({user,token}){
    const router = useRouter()
    
    useEffect(() =>{
        if(!user){
            router.push('/login')
        }
    })
    
    return(
        <>
            <Layout  role={user ? JSON.parse(user).job_role : null}>
                <SearchBar/>
                <ProjectList token={token}/>
            </Layout>
        </>
    )
}
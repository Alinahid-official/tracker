import { useEffect,useState } from "react";
import { useRouter } from 'next/router'
import Layout from '../../../layout/layout'
import ProjectDetailsContent from "../../../components/containers/projectDetails";
import Header from '../../../components/headers/searchbar'

export default function ProjectDetails({user,token}){
    // const [projectId , setProjectId] = useState(null)
    const router = useRouter()
    console.log('route',router.query.projectId)
    useEffect(() =>{
        // setProjectId(router.query.projectId)
        if(!user){
            router.push('/login')
        }
        
    })
    
    return(
        <>
            <Layout role={user ? JSON.parse(user).job_role : null}>
                <Header/>
                <ProjectDetailsContent projectId={router.query.projectId} token={token}/>
            </Layout>
        </>
    )
}
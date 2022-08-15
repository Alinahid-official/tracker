import { useEffect } from "react";
import { useRouter } from 'next/router'
import Layout from '../../../../layout/layout'
import EditIssueForm from "../../../../components/forms/editIssue";
import Header from '../../../../components/headers/searchbar'

export default function CreateIssue({user,token}){
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
                <EditIssueForm issueId={router.query.issueId} user={user} token={token}/>
            </Layout> 
        </>
    )
}
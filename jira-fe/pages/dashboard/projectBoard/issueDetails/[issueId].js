import { useEffect,useState } from "react";
import { useRouter } from 'next/router'
import Layout from '../../../../layout/layout'
import IssueDetailsContent from "../../../../components/containers/issueDetails";
import Header from '../../../../components/headers/searchbar'

// import issue from "../../../../services/issue";

export default function IssueDetails({user,token}){
    const router = useRouter()
    const [issueId , setIssueId] = useState(null)
    useEffect(() =>{
        if(!user){
            router.push('/login')
        }
        // const issueIde = router.query.issueId
        // // console.log('issueIde',issueIde)
        // setIssueId(issueIde)
    })
    // console.log('issue',issueId)
    return(
        <>
            <Layout role={user ? JSON.parse(user).job_role : null}>
                <Header/>
                <IssueDetailsContent issueId={router.query.issueId} token={token} user={user} />
            </Layout>
        </>
    )
}
import { useContext , useEffect,useState } from "react";
import { Context } from "../../context";
import { useRouter } from 'next/router'
import Layout from '../../layout/layout'
import IssueDetailsContent from "../../components/containers/issueDetails";

export default function IssueDetails(){
    const router = useRouter()
    const [role, setRole] = useState(null)
    const [userId, setUserId] = useState(null)
    // const { state, dispatch } = useContext(Context);
    useEffect(() =>{
        // if(!state.user){
        //     router.push('/login')
        // }
        // if(state && state.user){
        //     setRole(state.user.job_role)
        //     setUserId(state.user.id)
        // }
    })
    
    return(
        <>
            <Layout role={role}>
                {/* <IssueDetailsContent userId={userId} issueId='62d435e37964151508034f39'/> */}
            </Layout>
        </>
    )
}
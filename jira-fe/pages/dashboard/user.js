import { useContext , useEffect } from "react";
import { Context } from "../../context";
import { useRouter } from 'next/router'

export default function UserDashBoard(){
    const router = useRouter()
    const { state, dispatch } = useContext(Context);
    useEffect(() =>{
        if(!state.user && state.user.job_role=='manager'){
            router.push('/login')
        }
    })
    console.log(state)
    
    return(
        <div>
            {JSON.stringify(state)}
        </div>
    )
}
import styles from '../../styles/header.module.css'
import { useRouter } from 'next/router'
import {useEffect} from 'react'
export default function Nav(){
    const router = useRouter()

    const logout=()=>{
        console.log('click')
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('userToken')
        router.reload()
    }
    return(
        <>
        <div className={styles.content}>
            <button onClick={logout}>Log Out</button>
        </div>
        </>
  
    )
}
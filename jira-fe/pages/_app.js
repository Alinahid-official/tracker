import '../styles/globals.css'
import {useEffect, useState} from "react";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')

  useEffect(()=>{
    if(window.localStorage.userToken){
      setUser(window.localStorage.getItem('user'));
      setToken(window.localStorage.getItem('userToken'));
    }
  })
  return(
      <Component token={token} user={user} {...pageProps} />
  ) 
}

export default MyApp

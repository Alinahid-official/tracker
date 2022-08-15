import axios from 'axios'
import config from '../config'
// const baseUrl ="http://localhost:4000/user"
const baseUrl = `${config.getServerHost()}/user`
  
const getUsers = async headers =>{
  console.log(baseUrl)
  const res = await axios.get(baseUrl,headers)
  return res.data
}

export default { getUsers }
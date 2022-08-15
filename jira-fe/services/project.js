import axios from 'axios'
import config from '../config'
// const baseUrl = "http://localhost:4000/project"
const baseUrl = `${config.getServerHost()}/project`

const createProject = async (dataObj,header) => {
    console.log(dataObj,header)
    const response = await axios.post(baseUrl, dataObj,header)
    return response.data
  }

const getProjectById = async (id,header)=>{
  const response = await axios.get(`${baseUrl}/${id}`,header)
  return response.data
}  

const getProjects = async (header)=>{
  const response = await axios.get(baseUrl,header)
  return response.data
}

export default { createProject, getProjects , getProjectById}
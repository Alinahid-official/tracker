import axios from 'axios'
import config from '../config'
// const baseUrl = "http://localhost:4000/comment/"
const baseUrl = `${config.getServerHost()}/comment`

const addComment = async (dataObj,header) => {
    console.log(dataObj,header)
    const response = await axios.post(baseUrl, dataObj,header)
    return response.data
  }

  const getComments = async (issueId,header) => {
    const response = await axios.get(`${baseUrl}/${issueId}`,header)
    return response.data
  }

export default  {getComments,addComment}

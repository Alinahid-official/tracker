import {Formik,Form,Field,ErrorMessage} from "formik"
import * as Yup from "yup"
// import classes from "../../styles/CreateIssueForm.module.css"
import classes from "../../styles/CreateProjectForm.module.css"
import TextField from "./TextField";
import CustomSelect from "./CustomSelect";
import { useEffect,useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { MultiSelect } from "react-multi-select-component";
import projectService from '../../services/project'
import issueService from '../../services/issue'
import { useRouter } from 'next/router'

const EditIssueForm = ({token,issueId})=>{
    const router = useRouter()
    // const [token, setToken] = useState('')
    const [loading,setLoading] = useState(false)
    const [projectName,setProjectName] = useState([])
    const [project,setProject] = useState(null)
    const [assignee,setAssignee] = useState("")
    const [selected,setSelected] = useState([]);
    const [a,setA] = useState(JSON.stringify([]));
    const [status, setStatus] = useState(null)
    const [priority, setPriority] = useState(null)
    const [summary, setSummary] = useState(null)
    const [description, setDescription] = useState(null)
    // console.log(projectId)
    // console.log("",assignee)


  async function  getAssignees(projectId){
        // console.log(projectId)
        try {
            const project = await projectService.getProjectById(projectId,{
                headers :{ "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            'Authorization' : token}
            })
            console.log('p',project)

                // const b =  a.map(m=>m.members)
                // setAssignee(JSON.stringify(project.members))
                // console.log("members",a)
            const a =  project.members.map(m=>{
                return {value:m._id ,
                        label: m.name
                    }
            })
                
            setA(JSON.stringify(a));
            
        } catch (e) {
            console.log(e)
        }
  }
    
    useEffect(()=>{
        // setToken(window.localStorage.getItem('userToken'))
        async function getIssueData(){
            try{
                const data = await issueService.getIssueById(issueId,{
                    headers :{ "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                'Authorization' : token}
                });
                // console.log("name",project)
                if(!data){
                    setLoading(false)
                    return
                }
                console.log('issue',data)
                setStatus(data.status)
                setPriority(data.priority)
                setProject(data.project_id._id)
                let arr = data.issued_to.map(assignee=>{
                    return {value :assignee._id,
                            label : assignee.name
                    }
                })
                getAssignees(data.project_id._id)
                setSummary(data.summary)
                setDescription(data.description)
                // console.log('arr',ass)
                setSelected(arr)
                // setSelected(data.issued_to)
                // console.log("owner",owner)
            
            }catch(e){
                 console.log(e)
            }
        }
        async function getData(){
            try{
                const project = await projectService.getProjects({
                    headers :{ "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                'Authorization' : token}
                });
                // console.log("name",project)
                if(!project){
                    setLoading(false)
                    return
                }
                setProjectName(project)
                setLoading(true)
                console.log(project)
                // console.log("owner",owner)
            
            }catch(e){
                 console.log(e)
            }
        }
        setLoading(true)
        getData()
        getIssueData()
        setLoading(false)
       
        console.log(a)
        
    },[])
    const onSubmit =async (values,{resetForm})=>{
        const issued_to = selected.map(values=>{
            return values.value
        })
        console.log(issued_to)
        setLoading(false)
        const data = await issueService.updateIssue(issueId,{
            project_id:project,
            issued_to:issued_to,
            status : status,
            priority:priority,
            summary:summary,
            description :description
        },
        
        { headers :{ "Access-Control-Allow-Origin" : "*",
        "Content-type": "Application/json",
        'Authorization' : token}})
        console.log(data)
        resetForm()
        reset()
        router.push(`/dashboard/projectBoard`)
        
    }
    const reset = ()=>{
        setSelected([])
        setProjectName([])
        setPriority(null)
        setStatus(null)
    }
    // const a ={
    //         //  value:assignee.members.map(i=>i._id),
    //         //  label:assignee.members.map(m=>m.name)
           
    // }

    
    // console.log("sd",a)

    if(!loading){
        return <Backdrop open>
   <CircularProgress color="inherit" />
 </Backdrop>
    }
    else{
        return (
            <Formik
             initialValues={{
                summary:"",
                status:"",
                project:"",
                description:"",
                priority:"",
                asignee:"",
                tags:"",
                sprint:"",
                storyPoints:""
             }}
             onSubmit={onSubmit}
             >
    
             
            {
                formik=>{
                  console.log(formik)  
                    return(
                        <Form >
                            <h1 className={classes.head}>Edit User Stories/Tasks/Bugs</h1>
                            <div className={classes.grid}>
                                {/* summary */}
                                <div className={classes.summary}>
                                    <TextField
                                      label= "Summary"
                                      name = "summary"
                                      type = "text"
                                      placeholder="Add Summary"
                                      value ={summary}
                                      onChange={e=>setSummary(e.target.value)}
                                      disabled
                                    >
                                    </TextField>
                                    </div>
    
                                    {/* description */}
                                    <div className={classes.description}>
                                    <TextField
                                      label= "Description"
                                      name = "description"
                                      type = "text"
                                      placeholder="Write Description"
                                      value={description}
                                      onChange={e=>setDescription(e.target.value)}
                                      disabled
                                    >
                                    </TextField>
                                    </div>
    
                                    {/* priority */}
                                    <div className={classes.priority}>
                                        <CustomSelect
                                         label="Priority"
                                         name="priority"
                                         placeholder="Select"
                                         value={priority}
                                         onChange={e=>{
                                            e.preventDefault()
                                            setPriority(e.target.value)}}
                                        >
                                            <option disabled selected value> -- select an option -- </option>  
                                            <option value="high">High</option>
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
    
                                        </CustomSelect>
                                    </div>
    
                                    {/* project */}
                                    <div className={classes.project}>
                                        <CustomSelect
                                         label="Project"
                                         name="project"
                                         placeholder="Select"
                                         value ={project}
                                         onChange = {(event)=>{
                                            event.preventDefault()
                                            setProject(event.target.value)
                                            getAssignees( event.target.value)
                                         }}
                                         disabled
                                        >
                                          <option disabled selected value> -- select an option -- </option>  
                                           {projectName.map((v)=>{
                                        {/* // {console.log(value._id)} */}
                                        return  <option  className={classes.option}  key={v._id} value={v._id}>{v.name}</option> 
                                        })} 
                                        </CustomSelect>
                                    </div>

                                    {/* assignee */}
                                    <div className={classes.assignee}>
                                        <label className={classes.label} htmlFor="assignees">Assignees</label>
                                        <MultiSelect
                                          options={ JSON.parse(a)}
                                          name="assignees"
                                          required="true"
                                          displayValue = "value"
                                          value={selected}
                                          onChange={setSelected}
                                          className={classes.multiInput}
                                          onRemove = {(event)=>{console.log(event)}}
                                          disabled

                                        >

                                        </MultiSelect>
                                        
                                             {/* {<option value={assignee.members} key={assignee._id}>{assignee.members}</option>} */}
                                            {/* {assignee.map((value)=>{
                                                return <option className={classes.option} value={value._id} key={value._id} >{value.members}</option>
                                            })} */}
                                          
                                        
                                    </div>
                                    <div >
                                        <CustomSelect
                                         label="Status"
                                         name="status"
                                         placeholder="Select"
                                         value={status}
                                         onChange={e=>{
                                            e.preventDefault()
                                            setStatus(e.target.value)}}
                                        >
                                            <option disabled selected value> -- select an option -- </option>
                                            <option value="todo">To do</option>
                                            <option value="development">Development</option>
                                            <option value="testing">Testing</option>
                                            <option value="completed">Completed</option>
                                            {/* <option value="completed">Completed</option> */}
    
                                        </CustomSelect>
                                    </div>
    
                                
                            </div>
                            <div className={classes["pro-btn"]}>
                                <button   className={classes.resetBtn} type="reset"  >Reset</button>
                                {/* {validationSchema ?<button className={classes.createBtn} type="submit">Create</button>:<button className={classes.createBtn} disabled type="submit">Create</button>} */}
                                <button className={classes.createBtn}  type="submit" >Update</button>
                                {/* disabled={!(formik.isValid || formik.dirty)} */}
                                {/* disabled={!(formik.isValid && formik.dirty)} */}
                     
 
                            </div>
                        </Form>
                    )
                }
            }    
    
            </Formik>
        )
    }
    
}


export default EditIssueForm;
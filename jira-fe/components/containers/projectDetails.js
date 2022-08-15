import issueServices from "../../services/issue"
import React, {useEffect, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import IssueCard from "../cards/issue";
import Link from 'next/link'
import functions from '../functions'
import classes from "../../styles/ProjectDetails.module.css"
import projectService from '../../services/project'

export default function ProjectDetails({projectId,token}){
    // console.log('p',projectId)
    const [load, setLoad] = useState(true)
    const [issues, setIssues] = useState([])
    const [project,setProject] = useState(null)
    const [todo, setTodo] = useState([])
    const [development, setDevelopment] = useState([])
    const [testing, setTesting] = useState([])
    const [completed, setCompleted] = useState([])
    const [a,setA] = useState([]);
    const [assignee,setAssignee] = useState(null);
    const [priority,setPriority] = useState(null);

    async function  getAssignees(projectId){
        // console.log(projectId)
        try {
            const project = await projectService.getProjectById(projectId,{
                headers :{ "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            'Authorization' : token}
            })
            

                // const b =  a.map(m=>m.members)
                // setAssignee(JSON.stringify(project.members))
                // console.log("members",a)
            setProject(project)
            const a =  project.members.map(m=>{
                return {value:m._id ,
                        label: m.name
                    }
            })
                
            setA(a);
            
        } catch (e) {
            console.log(e)
        }
    }

    const secondFilter = (assignee,priority)=>{
        let  fissue =[]
        // console.log('tow',assignee,priority,issues)
        if(priority && assignee){
            for( let i in issues){
                issues[i].issued_to.map(a=>{
                    if(assignee==a._id){
                        fissue.push(issues[i])
                    }
                })
            }
            fissue = fissue.filter(i=>{
                return i.priority==priority
            })
            filter(fissue)
            return
        }
        if(priority){
            fissue =issues.filter(issue=>{
                return issue.priority==priority
            })
            filter(fissue)
            return
        }
        for( let i in issues){
            issues[i].issued_to.map(a=>{
                if(assignee==a._id){
                    fissue.push(issues[i])
                }
            })
        }
        filter(fissue)
        return
    }

    const filter = issues=>{

        setTodo(functions.filterByStatus('todo',issues))
        setDevelopment(functions.filterByStatus('development',issues))
        setTesting(functions.filterByStatus('testing',issues))
        setCompleted(functions.filterByStatus('completed',issues))
    }

    useEffect( () => {
       
       const getIssueList = async ()=>{
            console.log('called',projectId)
            try{
                // const token = window.localStorage.getItem('userToken')
                const data = await issueServices.getIssuesByProjectId(projectId,
                    { headers :{ "Access-Control-Allow-Origin" : "*",
                        "Content-type": "Application/json",
                        'Authorization' : token}})
                if(data){
                    setIssues(data)
                    // setFirstIssues(data)
                    // setSecondIssues(data)
                    filter(data)
                }
                
                
                setLoad(false)
                
                // console.log(data)
                
            }catch(e){
                console.log(e)
            }
        }

        getIssueList()
        getAssignees(projectId)
        // if(projectId){
        //     getAssignees(projectId)
        // }
        // if(issues){
        //      todo =functions.filterByStatus('todo',JSON.parse(issues))
        //      development =functions.filterByStatus('development',JSON.parse(issues))
        //      testing =functions.filterByStatus('testing',JSON.parse(issues))
        //      completed =functions.filterByStatus('completed',JSON.parse(issues))
        // }
        
    },[])
    // console.log('todo',todo)
    return(
        load?<Backdrop open>
                <CircularProgress color="inherit" />
            </Backdrop>:
            <>
                <div className={classes.projectDetails}>
            <h1>Project Details</h1>
            <div className={classes.dGrid}>
                <div className={classes.input}>
                   
                <label htmlFor="projectName">Project Name</label>
                <input value={project?project.name:null} type="text" disabled/>
                    <div>
                        <p className={classes.date}>Start Date : {project?project.start_date:null} |   End Date : {project?project.end_date:null}</p>
                    </div>
                </div>
                <div className={classes.input}>
                <label htmlFor="projectOwner">Project Owner</label>
                <input value={project?project.owner.name:null} type="text" disabled/>
                   
                </div>
                <div className={classes.apGrid}>
                <div className={classes["assignee-priority"]}>
                
                    <select 
                    onChange={e=>{
                        setAssignee(e.target.value)
                        secondFilter(e.target.value,priority)
                    }}
                    name="assignee" id="assignee">
                        <option value="">Select</option>
                        {a.map(as=>{
                            return( <option key={as.value} value={as.value}>{as.label}</option>)
                        })}
                    </select>
                    <label className={classes.label} htmlFor="assignee">Filter Assignee</label>
                </div>
                <div className={classes["assignee-priority"]}>
               
                    <select
                    onChange={e=>{
                        setPriority(e.target.value)
                        secondFilter(assignee, e.target.value)
                    }}
                     name="priority" id="priority">
                        <option value="">Select</option>
                        <option vlaue="low">low</option>
                        <option vlaue="medium">medium</option>
                        <option vlaue="high">high</option>
                    </select>
                    <label className={classes.label} htmlFor="priority">Filter Priority</label>
                </div>
                </div>

            </div>
            
        </div>
        <div className='flex'>
                <div className='width-25'>
                    <h3>To Do</h3>
                    {todo.map(issue=>{
                        return(
                            <Link key={issue._id} href={`/dashboard/projectBoard/issueDetails/${issue._id}`}>
                                <a><IssueCard  issue={issue}/></a>
                            </Link>
                        )
                    })}
                </div>
                <div className='width-25'>
                    <h3>Development</h3>
                    {development.map(issue=>{
                        return(
                            <Link key={issue._id} href={`/dashboard/projectBoard/issueDetails/${issue._id}`}>
                                <a><IssueCard  issue={issue}/></a>
                            </Link>
                        )
                    })}
                </div>
                <div className='width-25'>
                    <h3>Testing</h3>
                    {testing.map(issue=>{
                        return(
                            <Link key={issue._id} href={`/dashboard/projectBoard/issueDetails/${issue._id}`}>
                                <a><IssueCard  issue={issue}/></a>
                            </Link>
                        )
                    })}
                </div>
                <div className='width-25'>
                    <h3>Completed</h3>
                    {completed.map(issue=>{
                        return(
                            <Link key={issue._id} href={`/dashboard/projectBoard/issueDetails/${issue._id}`}>
                                <a><IssueCard  issue={issue}/></a>
                            </Link>
                        )
                    })}
                </div>
            </div>
            </>
            
    )
}
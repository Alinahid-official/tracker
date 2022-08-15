
import projectServices from "../../services/project"
import React, {useEffect, useState, useContext } from "react";
import Link from 'next/link'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ProjectDetailsCard from "../cards/projectDetails";

export default function ProjectList({token}){
    const [load, setLoad] = useState(false)
    const [projects, setProjects] = useState('[]')
    useEffect( () => {
        
       const getProjectsList = async ()=>{
            
            try{
            
                // const token = window.localStorage.getItem('userToken')
                
                const data = await projectServices.getProjects(
                    { headers :{ "Access-Control-Allow-Origin" : "*",
                        "Content-type": "Application/json",
                        'Authorization' : token}})
                if (!data){
                    setLoad(false)
                    return
                }
                setProjects(JSON.stringify(data))
                setLoad(true)
            }catch(e){
                console.log(e)
            }
            
        }
        getProjectsList()
        
        // setLoad(true)
        // const projectList = JSON.parse(projects)
    },[])
    return(
        <>
        {!load ? <Backdrop open>
                    <CircularProgress color="inherit" />
                </Backdrop>:
            <div>
                <h1>Welcome to Tracker</h1>
                <h3>Project Board</h3>
                <div style={{overflowY : "scroll"}}>
                {projects?JSON.parse(projects).map(project =>{
                return(
                        <Link key={project._id} href={`/dashboard/projectBoard/${project._id}`} >
                            <a><ProjectDetailsCard  project={project}/></a>
                        </Link> 
                    )
                }):null}
                </div>
            </div>
        }
        </>
        
    )
}
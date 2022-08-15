import { style } from '@mui/system'
import styles from '../../styles/issueCard.module.css'
export default function IssueCard({issue}){
    // console.log(issue.created_by)
    const doc =new Date(issue.date_of_creation).toLocaleDateString()
    let bg
    if(issue.priority=='high'){
        bg='red'
    }
    else if(issue.priority=='medium'){
        bg='yellow'
    }
    else{
        bg='green'
    }
    return(
        <div className={styles.box}>
            <div className='flex jc-between ' >
                <span style={{fontSize:"90%"}}>id:{issue._id}</span>
                <span style={{color:"rgba(0, 0, 0, 0.5)",fontSize:"70%"}}>{doc}</span>
            </div>
            <div className="pad-10" >
                <div style={{fontSize:"110%"}} >
                    {issue.summary}
                </div>
                <div style={{color:"rgba(0, 0, 0, 0.5)"}}>{issue.summary}.</div>
            </div>
            <div className='flex jc-between pad-10'>
                <div className='flex height-100'>
                    <img height="50px" width="50px" src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" />  
                    <span style={{marginTop : "15px",paddingLeft:"10px"}}> {issue.created_by.name} </span>
                </div>
                
                <div>
                    <div style={{color:"rgba(0, 0, 0, 0.4)",fontSize:"90%"}}>priority</div>
                    <div 
                    style={{color:"#fff",borderRadius:"5px",fontSize:"80%",padding:"2px 5px",marginTop:"5px",backgroundColor : bg}} 
                    className="align-center ">
                        {issue.priority}
                    </div>
                </div>
            </div>
            
        </div>
)}
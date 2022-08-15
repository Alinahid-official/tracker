import classes from '../../styles/container.module.css'

export default function ButtonBox({edit}){
    return(
        <div >
            <button>Related Issues</button> <br/>
            {edit?<button>Edit</button>:null}   
        </div>
    )
}
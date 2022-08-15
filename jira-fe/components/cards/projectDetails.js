import styles from '../../styles/projectCard.module.css'
import functions from '../functions'
export default function ProjectDetailsCard({project}){
    console.log(project)
   
    const todo =functions.filterByStatus('todo',project.issues)
    const development =functions.filterByStatus('development',project.issues)
    const testing =functions.filterByStatus('testing',project.issues)
    const completed =functions.filterByStatus('completed',project.issues)
    return(
        <div className={styles.project}>
            {/* <h1>Welcome to Tracker</h1> */}

           <div className={styles.left}>
                  <div className={styles.title}> {project.name}</div>
                  <div>Total Number Of Issues:{project.issues.length}</div> 
                  <h6 className='width-75'> <hr></hr> </h6> 
            <table className="width-75">
                <tr>
                    <td>TO DO</td>
                    <td>Development</td>
                    <td>Testing</td>
                    <td>Completed</td>
                </tr>
                <tr className={styles.big}>
                    <td className={styles.yellow}>{todo.length}</td>
                    <td className={styles.orange}>{development.length}</td>
                    <td className={styles.blue}>{testing.length}</td>
                    <td className={styles.green}>{completed.length}</td>
                </tr>
            </table>
           </div>
        </div>
        )
}
import classes from '../../styles/container.module.css'

export default function RightContainer({children}){
    return(
        <div className={classes.container}>
            {children}        
        </div>
    )
}
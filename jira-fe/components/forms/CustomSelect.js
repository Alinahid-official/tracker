import {useField}  from "formik";
import classes from  "../../styles/CreateProjectForm.module.css"

const CustomSelect = ({label,...props})=>{
    // console.log(props)
    const [field,meta] = useField(props)

    return(
        <>
        
        <label className={classes.label}>{label}<span className={classes.star}>*</span></label>
            <div className={classes.select}>
            <select
            {...field}
            {...props}

            className = {meta.touched && meta.error ? classes["input-error"] :""}
            />
            </div>
            {meta.touched && meta.error && <div className={classes["error"]}>{meta.error}</div>}
        </>
    )
}

export default CustomSelect;
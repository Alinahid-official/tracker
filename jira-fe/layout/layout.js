import SideNavBar from "../components/sidebars/sidebar"
import RightContainer from "../components/containers/rightContainer"
import classes from "../styles/Layout.module.css"


export default function Layout({children,role}){
    return(
        <div className={classes.grid}>
          
            <SideNavBar role={role}/>
            <RightContainer>
                {children}
            </RightContainer>
        </div>
    )
}

import SideNavBar from "../components/sidebars/sidebar"
import RightContainer from "../components/containers/rightContainer"

export default function Layout({children}){
    return(

        <div className="flex">
         
            <SideNavBar role='manager'/>
            <RightContainer>
                {children}
            </RightContainer>
        </div>
    )
}
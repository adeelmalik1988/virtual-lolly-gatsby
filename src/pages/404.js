
import React from "react"


const NotFoundPage = () => {
    
    if(typeof window !== "undefined" ){

        window.location.reload()
    }
    return(
        <div>
            Let us get you lolly....
        </div>
    )
}
export default NotFoundPage
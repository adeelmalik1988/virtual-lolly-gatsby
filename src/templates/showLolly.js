import React from "react"
import Header from "../component/Header"
import Lolly from "../component/Lolly"


export default function ShowLolly({ pageContext }) {
    console.log("Page Context", JSON.stringify(pageContext))
    const showLollyData = pageContext
    console.log(showLollyData)

    return (
        <div>
            <Header />

        <div className="showLollyDiv" >
            <Lolly fillLollyTop={showLollyData.flavourTop} fillLollyMiddle={showLollyData.flavourMedium} fillLollyBottom={showLollyData.flavourBottom} />
            <div>
                <h2>{ showLollyData.recipientName }</h2>
                <h2>{ showLollyData.message }</h2>
                <h2>{ showLollyData.sender }</h2>

            </div>
            

        </div>

        </div>
    )

}

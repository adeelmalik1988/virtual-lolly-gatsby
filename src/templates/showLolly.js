import React from "react"
import Header from "../component/Header"


export default function ShowLolly({ pageContext }) {
    console.log("Page Context", JSON.stringify(pageContext))
    return (
        <div>
            <Header />

        </div>

    )

}

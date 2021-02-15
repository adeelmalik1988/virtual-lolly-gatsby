import React, { useEffect } from "react"
import Header from "../component/Header"
import { Router } from "@reach/router"
import ShowLolly from "../templates/showLolly"
import Test from "../component/test"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"

const GETDATA = gql`
    {    
        getLolly{
            recipientName
            message
            sender
            flavourTop
            flavourMedium
            flavourBottom
            lollyPath
        }
    }

`




export default function Lolly() {
    const { data, loading, error, refetch } = useQuery(GETDATA)
    
    // useEffect(
    //     () => {
    //         async function fetchData() {
    //             await refetch()
    //             console.log(data)
    //         }

    //         fetchData()
    //     }
    //      ,[]
    // )



    if (error) {
        return (
            <h2>{error}</h2>
        )
    }

    //refetch()
    //  window.location.reload()

    return (
        <div>


            <Router basepath="/lolly">
                {
                    data.getLolly.map((value, key) => (
                        <ShowLolly key={key} pageContext={value} path={`/${value.lollyPath}`} />

                    ))

                }

            </Router>



        </div>



    )
}

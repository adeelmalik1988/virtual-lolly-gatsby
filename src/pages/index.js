import { navigate } from "gatsby"
import React from "react"
import Header from "../component/Header"
import Lolly from "../component/Lolly"



export default function Home() {
  return (
    <div className="container" >
       
        <Header />
      
      <div className="listLollies" >

      <Lolly fillLollyTop="#d52358" fillLollyMiddle="#e95946" fillLollyBottom="#deaa43" />
      <Lolly fillLollyTop="red" fillLollyMiddle="blue" fillLollyBottom="green" />
      <Lolly fillLollyTop="#d52358" fillLollyMiddle="#e95946" fillLollyBottom="#deaa43" />
      <Lolly fillLollyTop="red" fillLollyMiddle="blue" fillLollyBottom="green" />


      </div>
<div>
  <input  type="button" value="Create New Lolly" onClick={
    ()=>{
      console.log("create new lolly")
      navigate("/createNew")
    }
  } />
</div>
    </div>

  )

}

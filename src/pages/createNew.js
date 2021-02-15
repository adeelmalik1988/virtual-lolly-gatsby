import { useQuery, gql, useMutation } from "@apollo/client"
import { navigate, Router } from "@reach/router"
import React, { useRef, useState } from "react"
import { render } from "react-dom"
import Header from "../component/Header"
import Lolly from "../component/Lolly"
import ShowLolly from "../templates/showLolly"




const GETDATA = gql`
    {    
        getLolly{
            message
            lollyPath
        }
    }

`
const CREATELOLLYMUTATION = gql`
    mutation createLolly($recipientName: String!, $message: String!, $sender: String!, $flavourTop: String!, $flavourMedium: String!, $flavourBottom: String!){
      createLolly(recipientName: $recipientName, message: $message, sender: $sender, flavourTop: $flavourTop, flavourMedium: $flavourMedium, flavourBottom: $flavourBottom) {
          
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


export default function CreateNew() {
    const [color1, setColor1] = useState("#d52358")
    const [color2, setColor2] = useState("#e95946")
    const [color3, setColor3] = useState("#deaa43")
    const recipientNameRef = useRef()
    const messageRef = useRef()
    const senderRef = useRef()
    const { loading, error, data } = useQuery(GETDATA)
    const [createLolly] = useMutation(CREATELOLLYMUTATION)
    !loading && console.log(data)


    const submitLollyForm = async () => {
        console.log("clicked")
        console.log("color 1 :", color1)
        console.log("color 2 :", color2)
        console.log("color 3 :", color3)
        console.log("recipientName :", recipientNameRef.current.value)
        console.log("message :", messageRef.current.value)
        console.log("sender", senderRef.current.value)
        const result = await createLolly({
            variables: {
                recipientName: recipientNameRef.current.value,
                message: messageRef.current.value,
                sender: senderRef.current.value,
                flavourTop: color1,
                flavourMedium: color2,
                flavourBottom: color3,

            }
        }).then(result => {
            navigate(`/lolly/${result.data.createLolly.lollyPath}`)
            
            console.log(result)
        })
        
        // console.log(result.data.createLolly.lollPath)

    }


    return (
        <div className="container" >

            {
                // !loading && !error && <div>{JSON.stringify(data.getLolly)}</div>
            }
            <Header />

            <h1>
                Create new lollipop
        </h1>
            <div className="lollyFormDiv" >

                <div>
                    <Lolly fillLollyTop={color1} fillLollyMiddle={color2} fillLollyBottom={color3} />

                </div>
                <div className="lollyFlavourDiv" >

                    <label htmlFor="flavourTop" className="colorPickerLabel" >

                        <input type="color" value={color1} className="colorPicker" name="flavourTop" id="flavourTop"
                            onChange={(e) => {
                                setColor1(e.target.value)
                            }}
                        />
                    </label>
                    <label htmlFor="flavourMiddle" className="colorPickerLabel" >
                        <input type="color" value={color2} className="colorPicker" name="flavourMiddle" id="flavourMiddle"
                            onChange={(e) => {
                                setColor2(e.target.value)
                            }}
                        />

                    </label>
                    <label htmlFor="flavourBottom" className="colorPickerLabel">
                        <input type="color" value={color3} className="colorPicker" name="flavourBottom" id="flavourBottom"
                            onChange={(e) => {
                                setColor3(e.target.value)
                            }}
                        />

                    </label>

                </div>
                <div className="lollyForm" >
                    <label htmlFor="recipientName"  >
                        To
                    </label>
                    <input type="text" name="recipientName" id="recipientName" ref={recipientNameRef} />
                    <label htmlFor="message"  >
                        Message
                    </label>
                    <textarea rows="15" columns="30" ref={messageRef} />
                    <label htmlFor="sender"  >
                        From
                    </label>
                    <input type="text" name="sender" id="sender" ref={senderRef} />
                    <input type="button" value="create" onClick={submitLollyForm} />
                </div>

            </div>


        </div>

    )

}

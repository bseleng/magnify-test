import Magnifier from "react-magnifier"
import passport from "./assets/passport.jpg"
import regis from "./assets/registration.jpg"
import { useState } from "react"

const photos = [passport, regis]

const Slider = () => {
    const [currentImage, setCurrentImage] = useState(0)

    return (

        <div style={{ display: "flex", flexDirection: "column" }}>

            <div>
                    <Magnifier src={photos[currentImage]} width={300}  style={{  transform: `${currentImage ===1 ? "rotate(-90deg)":""}` }}/>
            </div>


            <div style={{ display: "flex" }}>

            </div>

            <div style={{ display: "flex",  width: "100px", gap: "30px" }}>
                {photos.map((item, i) => {
                    if (i === 1) {
                        return (<img src={item} style={{  width: "100%", transform: "rotate(-90deg)" }} onClick={()=> setCurrentImage(i)}></img>)
                    }
                    return (<img src={item} style={{ width: "100%" }}   onClick={()=> setCurrentImage(i)}></img>)

                }

                )}
            </div>
        </div>
    )
}

export default Slider

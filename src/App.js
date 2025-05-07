import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-image-crop/dist/ReactCrop.css';
import passport from "./assets/passport.jpg";
import Magnifier from "react-magnifier";
import { useState } from 'react';
import DraggableCropArea from './croppedOnly';



function App() {
  const [coords, setCoords] = useState({
    torx: 423,
    tory: 261,
    tolx:229,
    toly: 261,
    
    borx: 423,
    bory: 451,
    bolx:229,
    boly:451,
  })
  
  const onChangeCoord = (value, field) => {
    setCoords(oldCoords =>( {...oldCoords, [field]: Number(value)}))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Magnifier src={passport} width={500} />

        <div style={{ display: 'flex', gap: "30px" , marginTop: "30px", marginBottom: "30px"}}>
          {/* <div>


          <div style={{ display: 'flex', gap: "10px", marginTop: "10px" }}>
            <label>верх-лево</label>
            <input type='number' step={10} placeholder='x' value={coords.tolx} onChange={(e) => {onChangeCoord(e.target.value, "tolx")}}/>
            <input type='number' step={10}  placeholder='y'  value={coords.toly} onChange={(e) => {onChangeCoord(e.target.value, "toly")}}/>
            </div>
            <div style={{ display: 'flex', gap: "10px", marginTop: "10px" }}>
            <label>верх-право</label>
            <input type='number' step={10}  placeholder='x' value={coords.torx} onChange={(e) => {onChangeCoord(e.target.value, "torx")}}/>
            <input type='number' step={10}  placeholder='y' value={coords.tory} onChange={(e) => {onChangeCoord(e.target.value, "tory")}}/>
            </div>

            <div style={{ display: 'flex', gap: "10px", marginTop: "10px" }}>
            <label>низ-лево</label>
            <input type='number' step={10}  placeholder='x' value={coords.bolx} onChange={(e) => {onChangeCoord(e.target.value, "bolx")}}/>
            <input type='number'step={10}   placeholder='y' value={coords.boly} onChange={(e) => {onChangeCoord(e.target.value, "boly")}}/>
            </div>


            <div style={{ display: 'flex', gap: "10px", marginTop: "10px" }}>
            <label>низ-право</label>
            <input type='number' step={10}  placeholder='x' value={coords.borx} onChange={(e) => {onChangeCoord(e.target.value, "borx")}}/>
            <input type='number' step={10}  placeholder='y' value={coords.bory} onChange={(e) => {onChangeCoord(e.target.value, "bory")}}/>
            </div>
          
          </div> */}

<DraggableCropArea
  imgSrc={passport}
  initialCoords={[
    [229, 261],
    [423, 261],
    [423, 451],
    [229, 451]
  ]}
/>

        </div>

      </header>


    </div>
  );
}

export default App;

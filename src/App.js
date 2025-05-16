import logo from './logo.svg';
import './App.css';
import 'react-image-crop/dist/ReactCrop.css';
import passport from "./assets/passport.jpg";
import Magnifier from "react-magnifier";
import { useState } from 'react';
import DraggableCropArea from './croppedOnly';
import Slider from './slider';



function App() {
  const [coords, setCoords] = useState({
    torx: 423,
    tory: 261,
    tolx: 229,
    toly: 261,

    borx: 423,
    bory: 451,
    bolx: 229,
    boly: 451,
  })

  const onChangeCoord = (value, field) => {
    setCoords(oldCoords => ({ ...oldCoords, [field]: Number(value) }))
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

        <div style={{ display: 'flex', gap: "30px", marginTop: "30px", marginBottom: "30px" }}>

          <DraggableCropArea
            isDraggable={false}
            imgSrc={passport}
            initialCoords={[
              [229, 261],
              [423, 261],
              [423, 451],
              [229, 451]
            ]}
          />

        


        </div>
          <div>
            <Slider />
          </div>
      </header>


    </div>
  );
}

export default App;

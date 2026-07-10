import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'



function getRandomInt(max) {
  return (Math.floor(Math.random() * max) + 1);
}

function generateRandIntArrayNoRepeats(size) {
  var arr = [];
  var temp = 0;
  for (var i = 0; i < size; i++) {

    if (i != 0) {
      while(1) {
        temp = getRandomInt(9);
        if (temp != arr[i - 1]) {
          arr.push(temp);
          break;
        }
      }     
    } else {
      arr.push(getRandomInt(9));
    }
  }

  return arr;
}

function App() {
  const [flashQueue, setFlashQueue] = useState([1, 2, 3, 4, 5]);
  const [clickLog, setClickLog] = useState([]);

  
  const [temp1, setTemp1] = useState(0);

  const [count, setCount] = useState(0);

  const [b1Lit, setb1Lit] = useState(false);
  const [b2Lit, setb2Lit] = useState(false);
  const [b3Lit, setb3Lit] = useState(false);
  const [b4Lit, setb4Lit] = useState(false);
  const [b5Lit, setb5Lit] = useState(false);
  const [b6Lit, setb6Lit] = useState(false);
  const [b7Lit, setb7Lit] = useState(false);
  const [b8Lit, setb8Lit] = useState(false);
  const [b9Lit, setb9Lit] = useState(false);



  const RandomizeFlashQueue = (queueSize) => {
    setFlashQueue([]);

    setFlashQueue(generateRandIntArrayNoRepeats(queueSize));
    return;
  }





  const Fail = () => {
    RandomizeFlashQueue(5);
    setClickLog([]);

    return;
  }
  const NextLevel = () => {
    RandomizeFlashQueue(5);
    setClickLog([]);

    return;
  }

  // runs when clickLog updated
  useEffect(() => {
    setCount(clickLog.length);

    if (clickLog.length == 0) {
      return
    }

    if (clickLog.length >= flashQueue.length) {
      for (var i = 0; i < flashQueue.length; i++) {
        if (flashQueue[i] != clickLog[i]) {
          Fail();
          setClickLog([]);
        }
      }


    }


  }, [clickLog]); // Triggers every time 'clickLog' updates

  const UpdateLog = (buttonNum) => {


    setClickLog(prevItems => [...prevItems, buttonNum]);
    



    // if (clickLog.length() == flashQueue.length()) {
    //   NextLevel();
    // }
    return;
  }

  return (
    <>
      {/* <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section> */}
      <div className="ticks"></div>
      <div className="ticks"></div>
      <section id="spacer"></section>
      <div className="ticks"></div>
      <div className="ticks"></div>


      <h>{count}</h>
      <h>{clickLog}</h>
      <h>{flashQueue}</h>


      <div class="button-grid">
        <button class={`${(b1Lit == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(1)}>Button 1</button>
        <button class={`${(b2Lit == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(2)}>Button 2</button>
        <button class={`${(b3Lit == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(3)}>Button 3</button>
        <button class={`${(b4Lit == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(4)}>Button 4</button>
        <button class={`${(b5Lit == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(5)}>Button 5</button>
        <button class={`${(b6Lit == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(6)}>Button 6</button>
        <button class={`${(b7Lit == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(7)}>Button 7</button>
        <button class={`${(b8Lit == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(8)}>Button 8</button>
        <button class={`${(b9Lit == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(9)}>Button 9</button>
      </div>

      

      <div className="ticks"></div>



      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

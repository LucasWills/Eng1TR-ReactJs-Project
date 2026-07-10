import { useState, useEffect, use } from 'react'
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

  const [anim, setAnim] = useState(false);


  // const [b1Lit, setb1Lit] = useState(false);
  // const [b2Lit, setb2Lit] = useState(false);
  // const [b3Lit, setb3Lit] = useState(false);
  // const [b4Lit, setb4Lit] = useState(false);
  // const [b5Lit, setb5Lit] = useState(false);
  // const [b6Lit, setb6Lit] = useState(false);
  // const [b7Lit, setb7Lit] = useState(false);
  // const [b8Lit, setb8Lit] = useState(false);
  // const [b9Lit, setb9Lit] = useState(false);

  const [buttonsLit, setButtonsLit] = useState([false, false, false,
                                                false, false, false,
                                                false, false, false ]);


  const setButton = (button, val) => {
    setButtonsLit(prevItems => 
      prevItems.map((item, index) => 
        index === (button - 1) ? val : item
      )
    );
  }

  const clearButtons = () => {
    setButtonsLit([false, false, false,
                   false, false, false,
                   false, false, false ])
  }


  const RandomizeFlashQueue = (queueSize) => {
    setFlashQueue([]);
    var arr = generateRandIntArrayNoRepeats(queueSize)
    setFlashQueue(arr);
    return;
  }




  useEffect(() => {

    let timeout;
    let flash = false;
    let flashQueueCopy = []
    flashQueueCopy = flashQueue;

    if (!anim) {
      return;
    }

    clearButtons();

    /// WHY THE FUCK IS FLASHQUEUE GETTING CLEARED???????
    const timeoutCallback = () => {
      clearButtons();
      setCount(count => count + 1);
      setButton(flashQueueCopy[0], true);


      if (flashQueueCopy.length == 0) {
        clearButtons();
        setAnim(false);
        return;
      }

      flashQueueCopy.splice(0, 1);

      timeout = setTimeout(timeoutCallback, 500);
      
    }

    timeout = setTimeout(timeoutCallback, 500);


    return () => clearTimeout(timeout);

  }, [anim])




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
    if (buttonNum == 9) {
      setAnim[true];
    }

    // if (clickLog.length() == flashQueue.length()) {
    //   NextLevel();
    // }
    return;
  }


  const TestButton = () => {

    setAnim(true);

    return;
  }


  return (
    <>

      <div className="ticks"></div>
      <div className="ticks"></div>
      <section id="spacer"></section>
      <div className="ticks"></div>
      <div className="ticks"></div>


      <h>count{count}</h>
      <h>clklog{clickLog}</h>
      <h>{flashQueue}</h>
      <h>anim: {`${(anim == false ? 'false' : 'true')}`}</h>



      <div class="button-grid">
        <button class={`${(buttonsLit[0] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(1)}>Button 1</button>
        <button class={`${(buttonsLit[1] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(2)}>Button 2</button>
        <button class={`${(buttonsLit[2] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(3)}>Button 3</button>
        <button class={`${(buttonsLit[3] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(4)}>Button 4</button>
        <button class={`${(buttonsLit[4] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(5)}>Button 5</button>
        <button class={`${(buttonsLit[5] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(6)}>Button 6</button>
        <button class={`${(buttonsLit[6] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(7)}>Button 7</button>
        <button class={`${(buttonsLit[7] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(8)}>Button 8</button>
        <button class={`${(buttonsLit[8] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(9)}>Button 9</button>
      </div>

      <div class="button-grid">
        <button onClick={() => TestButton()}>tester</button>
      </div>

      

      <div className="ticks"></div>



      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

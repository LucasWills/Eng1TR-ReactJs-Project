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
  const [flashQueue, setFlashQueue] = useState([1, 2, 3]);
  const [clickLog, setClickLog] = useState([]);

  const [startingNumFlashes, setStartingNumFlashes] = useState(3);

  
  const [temp1, setTemp1] = useState(0);

  const [count, setCount] = useState(0);

  // START, GAME_FLASH, GAME_PLAY, WIN, FAIL
  const [gameState, setGameState] = useState("START");

  const [anim, setAnim] = useState(false);

  const [gameLevel, setGameLevel] = useState(1);

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
    // attempting to fopy flashQueue like flashQueueCopy = flashQueue breaks everything
    for (var i = 0; i < flashQueue.length; i++) {
      flashQueueCopy[i] = flashQueue[i];
    }

    if (!anim) {
      return;
    }

    clearButtons();

    const timeoutCallback = () => {
      clearButtons();
      setCount(count => count + 1);
      setButton(flashQueueCopy[0], true);


      if (flashQueueCopy.length == 0) {
        clearButtons();
        setAnim(false);
        setGameState("GAME_PLAY");
        return;
      }

      flashQueueCopy.splice(0, 1);

      timeout = setTimeout(timeoutCallback, 500);
      
    }

    timeout = setTimeout(timeoutCallback, 500);


    return () => clearTimeout(timeout);

  }, [anim])




  const Fail = () => {
    RandomizeFlashQueue(startingNumFlashes);
    setClickLog([]);
    setGameState("FAIL");

    return;
  }

  const NextLevel = () => {
    RandomizeFlashQueue(gameLevel + startingNumFlashes);
    setClickLog([]);
    setGameState("WIN");

    return;
  }

  // runs when clickLog updated
  useEffect(() => {
    setCount(clickLog.length);

    if (clickLog.length == 0) {
      return
    }

    // faliure
    if (clickLog.length >= flashQueue.length) {
      for (var i = 0; i < flashQueue.length; i++) {
        if (flashQueue[i] != clickLog[i]) {
          Fail();
          setClickLog([]);
          return;
        }
      }
    }
    // success
    if (clickLog.length == flashQueue.length) {
      NextLevel();
    }


  }, [clickLog]); // Triggers every time 'clickLog' updates

  const UpdateLog = (buttonNum) => {

    if (gameState !== "GAME_PLAY") {
      return;
    }

    setClickLog(prevItems => [...prevItems, buttonNum]);
    if (buttonNum == 9) {
      setAnim[true];
    }


    return;
  }


  const TestButton = () => {

    setAnim(true);

    return;
  }

  const HeaderButton = () => {
    switch (gameState) {
      case "START":
        setGameState("GAME_FLASH");
        setAnim(true);
        break;
      case "WIN":
        setGameLevel(gameLevel => gameLevel + 1);
        setGameState("GAME_FLASH");
        setAnim(true);
        break;
      case "FAIL":
        setGameLevel(1);
        setGameState("GAME_FLASH");
        setAnim(true);
        break;
      default:
        break;
    }
  }

  const GameHeader = () => {
    return (
      <div>
        {(gameState === "START") && 
          <div>
            <div class="game-header">
              <h>START!!</h>
            </div>
            <div>
              <button class="continue-btn" onClick={() => HeaderButton()}>Get Started!</button>
            </div>
          </div>
        }
        {(gameState === "GAME_FLASH") && 
          <div>
            <div class="game-header">
              <h>WATCH!!!!</h>
            </div>
            <div>
              <section id="continue-btn-spacer"></section>
            </div>
          </div>
        }
        {(gameState === "GAME_PLAY") && 
          <div>
            <div class="game-header">
              <h>PLAY!!!!</h>
            </div>
            <div>
              <section id="continue-btn-spacer"></section>
            </div>
          </div>
        }
        {(gameState === "WIN") && 
          <div>
            <div class="game-header">
              <h>WIN!!!!</h>
            </div>
            <div>
              <button class="continue-btn" onClick={() => HeaderButton()}>You passed level {gameLevel}! Next!</button>
            </div>
          </div>
        }
        {(gameState === "FAIL") && 
          <div>
            <div class="game-header">
              <h>LOSER!!!!</h>
            </div>
            <div>
              <button class="continue-btn" onClick={() => HeaderButton()}>You reached level {gameLevel}! Start over!</button>
            </div>
          </div>
        }

      </div>
    );
  }

  return (
    <>


      <section id="spacer"></section>



      {/* <h>count{count}</h>
      <h>clklog{clickLog}</h>
      <h>{flashQueue}</h>
      <h>anim: {`${(anim == false ? 'false' : 'true')}`}</h> */}

      {GameHeader()}



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

      {/* <div class="button-grid">
        <button onClick={() => TestButton()}>tester</button>
      </div> */}

      

      <div className="ticks"></div>



      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

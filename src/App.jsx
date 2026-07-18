import { useState, useEffect, use } from 'react'
import Wes from './assets/Wes.jpg'
import James from './assets/James.jpg'
import Julian from './assets/Julian.jpg'
import LAX from './assets/LAX.jpg'
import Lilly from './assets/Lilly.jpg'
import Phone from './assets/Phone.jpg'
import Poe from './assets/Poe.jpg'
import CutestThingOnThePlanet from './assets/IfAnythingHappenedToThisCatIWouldKillEveryoneAndThenMyself.jpg'
import SOYSAUCE from './assets/soysauce.jpg'
import './App.css'


// function to generate random number from 1 to n
function getRandomInt(max) {
  return (Math.floor(Math.random() * max) + 1);
}

// function to generate a sequence of random numbers from 1 to n, with no consecutive repeats (i.e. nothing like 1,2,2,3)
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

// the actual app..
function App() {
  // array to store the current sequence
  const [flashQueue, setFlashQueue] = useState([1, 2, 3]);
  // array to store what buttons the player has pressed
  const [clickLog, setClickLog] = useState([]);

  // stores how many button presses should be at level 1
  const startingNumFlashes = 3;
  //const [startingNumFlashes, setStartingNumFlashes] = useState(3);

  // dummy variable for debugging
  const [count, setCount] = useState(0);

  // stores the current state of the game/website
  // states: START, GAME_FLASH, GAME_PLAY, WIN, FAIL
  const [gameState, setGameState] = useState("START");

  // bool, button flash sequence plays when it's set to true
  const [anim, setAnim] = useState(false);

  // stores current level reached
  const [gameLevel, setGameLevel] = useState(1);

  // array for the buttons, if true then they will light up. used for the button flashing sequence
  const [buttonsLit, setButtonsLit] = useState([false, false, false,
                                                false, false, false,
                                                false, false, false ]);

  // wrapper for the above array so it's easier to use
  const setButton = (button, val) => {
    setButtonsLit(prevItems => 
      prevItems.map((item, index) => 
        index === (button - 1) ? val : item
      )
    );
  }

  // function to unlight all the buttons
  const clearButtons = () => {
    setButtonsLit([false, false, false,
                   false, false, false,
                   false, false, false ])
  }

  // function to generate new flashQueue with specified size
  const RandomizeFlashQueue = (queueSize) => {
    setFlashQueue([]);
    var arr = generateRandIntArrayNoRepeats(queueSize)
    setFlashQueue(arr);
    return;
  }

  // this function runs on any change of bool anim. If anim is set true, it plays the button flashing animation thing
  useEffect(() => {

    // avoid running the rest of the code if anim is set false
    if (!anim) {
      return;
    }

    let timeout;
    let flash = false;
    // copy of flashQueue for the animation, we will remove elements as they're displayed.
    let flashQueueCopy = []
    // attempting to copy flashQueue like `flashQueueCopy = flashQueue` breaks everything idk why
    for (var i = 0; i < flashQueue.length; i++) {
      flashQueueCopy[i] = flashQueue[i];
    }

    clearButtons();

    // recursive function for playing the button flashing animation
    const timeoutCallback = () => {
      clearButtons();
      //setCount(count => count + 1);

      // if we're done with the animation...
      if (flashQueueCopy.length == 0) {
        setAnim(false);
        setGameState("GAME_PLAY");
        return;
      }

      // light up the corresponding button
      setButton(flashQueueCopy[0], true);

      // otherwise, remove the first element from flashQueueCopy
      flashQueueCopy.splice(0, 1);

      // then call myself in 500 milliseconds
      timeout = setTimeout(timeoutCallback, 500);
      
    }

    // start the animation
    timeout = setTimeout(timeoutCallback, 500);

    // clean up the timeouts
    return () => clearTimeout(timeout);

  }, [anim]); // triggers every time anim updates

  // when clickLog is updated, check if player has won or lost
  useEffect(() => {
    //setCount(clickLog.length);

    // if clicklog was just reset, ignore the rest of the code
    if (clickLog.length == 0) {
      return
    }

    // check if the player has lost the level
    if (clickLog.length >= flashQueue.length) {
      for (var i = 0; i < flashQueue.length; i++) {
        if (flashQueue[i] != clickLog[i]) {
          Fail();
          setClickLog([]);
          return;
        }
      }
    }
    // check if the player has won the level
    if (clickLog.length == flashQueue.length) {
      Success();
    }


  }, [clickLog]); // triggers every time clickLog changes

  // reset things and change game state to FAIL
  const Fail = () => {
    RandomizeFlashQueue(startingNumFlashes);
    setClickLog([]);
    setGameState("FAIL");

    return;
  }

  // reset things and change game state to WIN
  const Success = () => {
    RandomizeFlashQueue(gameLevel + startingNumFlashes);
    setClickLog([]);
    setGameState("WIN");

    return;
  }

  // update clickLog with a specific button pressed
  const UpdateLog = (buttonNum) => {

    // skip the rest of the code if we're not in the gameplay phase
    if (gameState !== "GAME_PLAY") {
      return;
    }

    setClickLog(prevItems => [...prevItems, buttonNum]);

    return;
  }

  // handle the functions of the button in the game header
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

  // display the game header appropriate for the current game state
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

  // website HTML...
  return (
    <>
      <section id="spacer"></section>

      {/* debugging stuff */}
      {/* <h>count{count}</h>
      <h>clklog{clickLog}</h>
      <h>{flashQueue}</h>
      <h>anim: {`${(anim == false ? 'false' : 'true')}`}</h> */}

      { // display the dynamic header...
        GameHeader()
      }

      {/* all the grid buttons and their functions... */}
      <div class="button-grid" >
        <button class={`${(buttonsLit[0] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(1)}><img src={Poe} width={120} height={90}></img></button>
        <button class={`${(buttonsLit[1] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(2)}><img src={Phone} width={120} height={90}></img></button>
        <button class={`${(buttonsLit[2] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(3)}><img src={Lilly} width={120} height={90}></img></button>
        <button class={`${(buttonsLit[3] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(4)}><img src={CutestThingOnThePlanet} width={120} height={90}></img></button>
        <button class={`${(buttonsLit[4] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(5)}><img src={Wes} width={120} height={90}></img></button>
        <button class={`${(buttonsLit[5] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(6)}><img src={SOYSAUCE} width={120} height={90}></img></button>
        <button class={`${(buttonsLit[6] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(7)}><img src={LAX} width={120} height={90}></img></button>
        <button class={`${(buttonsLit[7] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(8)}><img src={Julian} width={120} height={90}></img></button>
        <button class={`${(buttonsLit[8] == false ? 'grid-btn' : 'grid-btn-lit')}`} onClick={() => UpdateLog(9)}><img src={James} width={120} height={90}></img></button>
      </div>
      <div className="ticks"></div>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

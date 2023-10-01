import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

import GuessResults from '../GuessResults/GuessResults';
import GuessInput from '../GuessInput/GuessInput';
import WonBanner from '../WonBanner/WonBanner';
import LostBanner from '../LostBanner/LostBanner';

// Pick a random word on every pageload.
const answer = sample(WORDS);

// To make debugging easier, we'll log the solution in the console.
// console.info({ answer });

function Game() {
  // running / won / lost
  const [gameStatus, setGameStatus] = React.useState('running');
  const [guessList, setGuessList] = React.useState([]);

  function handleSubmitGuess(guess) {
    const nextGuesses = [...guessList, guess];
    setGuessList(nextGuesses);

    if (guess.toUpperCase() === answer) {
      setGameStatus('won');
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost');
    }
  }

  return (
    <>
      <GuessResults guessList={guessList} answer={answer} />
      <GuessInput
        gameStatus={gameStatus}
        handleSubmitGuess={handleSubmitGuess}
      />

      {gameStatus === 'won' && (
        <WonBanner numberOfGuesses={guessList} />
      )}

      {gameStatus === 'lost' && <LostBanner answer={answer} />}
    </>
  );
}

export default Game;

import { AI } from 'boardgame.io/ai'
import { Client } from 'boardgame.io/react'
import { TicTacToe } from './game'
import TicTacToeBoard from './gameBoard'

const App = Client({
  board: TicTacToeBoard,
  game: TicTacToe,
  ai: AI({
    enumerate: (G, ctx) => {
      let moves = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: 'clickCell', args: [i] });
        }
      }
      return moves;
    },
  }),
})

export default App

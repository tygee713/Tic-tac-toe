import { Client } from 'boardgame.io/react'
import { Game } from 'boardgame.io/core'

// Return true if `cells` is in a winning configuration.
const IsVictory = (cells) => {
  const victoryConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  victoryConditions.forEach((line) => {
    const value = cells[line[0]]
    if (value !== null) {
      let winner = value

      line.forEach((i) => {
        if (cells[i] !== winner) {
          winner = null
          break
        }
      })
      winner !== null && return true
    }
  })
  return false
}

// Return true if all `cells` are occupied.
const IsDraw = (cells) => {
  return cells.filter(c => c === null).length == 0
}

const TicTacToe = Game({
  setup: () => ({ cells: Array(9).fill(null) }),

  moves: {
    clickCell(G, ctx, id) {
      if (G.cells[id] === null) {
        G.cells[id] = ctx.currentPlayer
      }
    },
  },

  flow: {
    endGameIf: (G, ctx) => {
      if (IsVictory(G.cells)) {
        return { winner: ctx.currentPlayer }
      }
      if (IsDraw(G.cells)) {
        return { draw: true }
      }
    },
  },
})

const App = Client({ game: TicTacToe })

export default App

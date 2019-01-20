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

  let winner = null

  for (let line of victoryConditions) {
    const value = cells[line[0]]
    if (value !== null) {
      winner = value

      for (let i of line) {
        if (cells[i] !== winner) {
          winner = null
          break
        }
      }
      if (winner !== null) {
        break
      }
    }
  }
  return !!winner
}

// Return true if all `cells` are occupied.
const IsDraw = (cells) => {
  return cells.filter(c => c === null).length == 0
}

export const TicTacToe = Game({
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
    movesPerTurn: 1,
  },
})

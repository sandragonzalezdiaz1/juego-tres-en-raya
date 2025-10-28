import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

//El componente Board está totalmente controlado por las props que le pasa el componente Game
function Board({ xIsNext, squares, onPlay }) {

  //Funcion para actualizar el array que contiene el estado del tablero
  const handleClick = (i) => {
    //Comprobamos si esa posicion contiene el valor 'X' o 'O' o si hay un ganador
    if (squares[i] || calculateWinner(squares)) {
      return; //Salimos de la funcion
    }

    //Si esa posicion es null
    //Creamos una copia del array squares
    const nextSquares = squares.slice(); //Copia todo el array

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);

  let status;

  if (winner) {
    status = "GANADOR: " + winner;
  } else {
    status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  //Variables de estado
  const [history, setHistory] = useState([Array(9).fill(null)]); //Matriz con un solo elemento, que a su vez es una matriz de 9 nulls
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  const xIsNext = currentMove % 2 === 0; //Si el numero es par devuelve true y si es impar false

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1); //Cada vez que se realiza un movimiento es necesario actualizar currentMove para que apunte a la ultima entrada del historial

  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
    
  };

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = "Ir al movimiento # " + move;
    } else {
      description = "Ir al inicio del juego";
    }

    /* Para cada movimiento en el historial del juego, creamos un elemento <li> que contiene un boton.
      El boton tiene un controlador click que llama a la funcion jumpTo.
      Cada movimiento pasado tiene una identificación única asociada: es el número secuencial del movimiento. 
      Los movimientos nunca se reordenarán, eliminarán o insertarán en el medio, por lo que es seguro usar el 
      índice de movimiento como key */
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

//Funcion que determina si hay un ganador
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], //fila superior
    [3, 4, 5], //fila del medio
    [6, 7, 8], //fila inferior
    [0, 3, 6], //columna izquierda
    [1, 4, 7], //columna central
    [2, 5, 8], //columna derecha
    [0, 4, 8], //diagonal principal
    [2, 4, 6], //diagonal secundaria
  ];

  //Bucle que recorrer cada combinacion ganadora y se extraen los indices a,b,c
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //Si la posicion a no esta vacia y el valor de a, b, c en el array es igual
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; //Devolvemos 'X' o 'O' en funcion de la letra que esta en esa posicion
    }
  }
  return null; //Si no hay ganador devuelve null
};

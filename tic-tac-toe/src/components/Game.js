import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }
    jumpTo(step){
        this.setState({
            history: this.state.history.slice(0, step +1),
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }
    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber +1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({ 
            history: history.concat([{squares: squares}]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
            
            
        })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const Winner = calculateWinner(current.squares);
        const linhas = calculateWinner2(current.squares);
        let quadradosPintados= null;
        if(linhas){
            quadradosPintados = linhas;
        }
        var status;
        var desativarBotaoFimDoJogo = false;
        if (Winner){
            if (Winner === 'X')
            status = "Ganhador foi: " + this.props.player1;
            else
            status = "Ganhador foi: " + this.props.player2;
            desativarBotaoFimDoJogo = true;
        }else{
            if(this.state.stepNumber === 9){
                status = "Deu velha";
                desativarBotaoFimDoJogo = true;
            }else{
                status = "Próximo jogando:" + (this.state.xIsNext? this.props.player1 :  this.props.player2)
            }
        }

        const moves = history.map((step, move) => {
            const desc = move ? 'Ir para movimento # ' + move : 'Ir para o começo do jogo';
                return (
                    <li key={move}>
                        <button disabled={desativarBotaoFimDoJogo}  onClick = {(()=> this.jumpTo(move))}>
                           { desc }
                        </button>
                    </li>
                )
        });
        
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board
                    squares ={current.squares}
                    onClick = {(i) => this.handleClick(i)}
                    quadradosPintados={quadradosPintados}
                    />
                </div>
                <div className='game-info'>
                <div>{status}</div>
            <ol>{ moves}</ol>
            </div>
            </div>
        )
    }
}
function  calculateWinner(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for (let i=0; i <lines.length; i++){
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

function  calculateWinner2(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for (let i=0; i <lines.length; i++){
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return lines[i];
        }
    }
    return null;
}

function Restart({ onClick }) {

  return (
    <button className="restart" onClick={onClick}>
      Play again
    </button>
  );
}

export default Game;
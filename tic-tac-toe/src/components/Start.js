import React, { Fragment } from 'react';
import Game from './Game';

class Start extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            jogoComecou: false,
        }
    }

    handleTextChangeJogador1 = (event) => {
        this.setState(
            {player1: event.target.value}
        )
    }

    handleTextChangeJogador2 = (event) => {
        this.setState(
            {player2: event.target.value}
        )
    }

    handleClick = () => {
        this.setState(
            {
                jogoComecou: true,
                quantidadeJogos: this.state.quantidadeJogos + 1,
            }
        )
    }
    
    render(){
        if(this.state.jogoComecou){
            return (
                <Game player1={this.state.player1} player2={this.state.player2}></Game>
            )
        }else{
            return(
                <div>
                    <Fragment>
                        <label>
                            Nome
                            <input type="text" onChange={ this.handleTextChangeJogador1 } />
                        </label>
                        <label>
                            Nome
                            <input type="text" onChange={ this.handleTextChangeJogador2 } />
                        </label>
                        <br/>
                        <button onClick={() => this.handleClick()}>
                            Começar partida
                        </button>
                    </Fragment>
                </div>
            )
        }
    }
}

export default Start;
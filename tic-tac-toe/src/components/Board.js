import React from 'react';
import Square from './Square';

class Board extends React.Component {
    constructor(props){
        super(props);
    }

    renderSquare(i){
        let estilo = 'square';
        if(this.props.quadradosPintados != null){
            for (let a in this.props.quadradosPintados){
                if (this.props.quadradosPintados[a] === i){
                    estilo = 'square-black';
                    break;
                }else{
                    estilo = 'square';
                }
            }
        }
        console.log(estilo);
        return <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                corSquare={estilo}
            />
    }

    render() {
        
        return (
            <div>
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

export default Board;
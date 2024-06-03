import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({ board, socket, setBoard, chess }: {
    chess: any;
    setBoard: any
    board: (
        {
            square: Square;
            type: PieceSymbol;
            color: Color;
        } | null)[][];
    socket: WebSocket;
}) => {
    const [from, setFrom] = useState<null | Square>(null);
    const [to, setTo] = useState<null | Square>(null);

    return <div className="text-white text-2xl border-x-8 border-y-8 border-cyan-800 rounded-lg overflow-hidden">
        {board.map((row, i) => {
            return <div key={i} className="flex"> 
                {row.map((square, j) => {
                    const squareNotation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
                    // console.log(squareNotation);
                    
                    return <div key={j} onClick={() => {
                        if (!from) {
                            setFrom(squareNotation);
                        } else {
                            console.log(square);
                            
                            socket.send(JSON.stringify({
                                type: MOVE, 
                                payload: {
                                    move: {
                                        from, 
                                        to: squareNotation
                                    }
                                }
                            }))
                            setFrom(null);
                            chess.move({
                                from, 
                                to: squareNotation
                            });
                            setBoard(chess.board());
                            console.log({
                                from, 
                                to: squareNotation
                            });
                        }
                    }} className={`w-20 h-20 ${(i + j) % 2 ? 'bg-pink-900' : 'bg-pink-300'}`}>
                        <div className="flex justify-center w-full h-full">
                            <div className="flex flex-col justify-center h-full">
                                {
                                    square ? 
                                    <img className="w-14" 
                                    src={`/${square?.color === "b" ? square?.type : `${square?.type.toUpperCase()} copy`}.png`} 
                                    alt="Piece asset" /> : null
                                }
                                {/* {square ? square.type : ""} */}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        })}
    </div>
}
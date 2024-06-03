import { Chess } from "chess.js";
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";


export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
                case INIT_GAME:
                    setBoard(chess.board());
                    setStarted(true);
                    console.log("Game started");
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());

                    console.log("Move made");
                    break;
                case GAME_OVER:
                    console.log("Game finished");
                    break;
            }
        }
    }, [socket]);

    if (!socket) return <div>Connecting...</div>

    return <div className="flex justify-center">
        <div className="pt-8 max-w-screen-lg w-full">
            <div className="grid grid-cols-6 
            gap-4 w-full">
                <div className="col-span-4 w-full flex justify-center">
                    <ChessBoard board = {board} socket = { socket } chess = {chess} setBoard = { setBoard } />
                </div>
                <div className="col-span-2 bg-cyan-800 w-full flex justify-center rounded-lg">
                    <div className="pt-12 rounded-xl overflow-hidden">
                        {!started && <Button color = "bg-pink-500" hoverColor = "bg-pink-600" onClick={() => {
                            socket.send(JSON.stringify({
                                type: INIT_GAME
                            }))
                        }}>
                            Play
                        </Button>}
                        {started && <Button color = "bg-gray-400" hoverColor = "bg-gray-600" onClick={() => {
                            // nothing happens on clicking this button
                        }}>
                            ...
                        </Button>}
                    </div>
                </div>

            </div>
        </div>
    </div>
}
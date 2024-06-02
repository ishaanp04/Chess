import { WebSocket } from "ws";
import { Chess } from 'chess.js';
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess 
    private startTime: Date;
    private moveCount;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.moveCount = 0;

        this.player1.send(JSON.stringify({
            type: INIT_GAME, 
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME, 
            payload: {
                color: "black"
            }
        }));
    }

    makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
    }) {
        // checking which player's move is this        
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            return;
        }

        console.log("didn't early return");
        

        try {
            this.board.move(move);
        } catch(e) {
            // send error if move invalid
            console.log(e);
            return;
        }

        console.log("move succeeded");
        

        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: GAME_OVER, 
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            this.player2.send(JSON.stringify({
                type: GAME_OVER, 
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }

        console.log("game is not over buddy");
        

        if (this.moveCount % 2 === 0) {
            // player 1 just moved
            console.log("player 1 just moved");
            
            this.player2.send(JSON.stringify({
                type: MOVE, 
                payload: move
            }))
        } else {
            // player 2 just moved
            console.log("player 2 just moved");
            this.player1.send(JSON.stringify({
                type: MOVE, 
                payload: move
            }))
        }

        this.moveCount++;
    }
}
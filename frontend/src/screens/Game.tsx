import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"

export const Game = () => {
    return <div className="flex justify-center">
        <div className="pt-8 max-w-screen-lg w-full">
            <div className="grid grid-cols-6 
            gap-4 w-full">
                <div className="col-span-4 bg-red-300 w-full">
                    <ChessBoard />
                </div>
                <div className="col-span-2 bg-gray-400 w-full">
                    <Button onClick={() => {
                        navigate("/game")
                    }}>
                        Play
                    </Button>
                </div>

            </div>
        </div>
    </div>
}
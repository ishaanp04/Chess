import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button";

export const Landing = () => {
    const navigate = useNavigate();
    return <div className="flex justify-center">
        <div className="pt-8 max-w-screen-lg">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-center">
                    <img src={"/image-chess-board.png"}
                        alt="Image of a chess board"
                        className="max-w-192 rounded-lg" />
                </div>
                <div className="pt-16 px-16">
                    <div className="flex justify-center">
                        <h1 className="text-5xl font-bold text-center">
                            Play chess online on the #1 site!
                        </h1>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <Button color = "bg-pink-500" hoverColor = "bg-pink-600" onClick={() => { 
                            navigate("/game")
                        }}>
                            Play Online
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
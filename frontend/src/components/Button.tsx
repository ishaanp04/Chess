interface ButtonProps {
    onClick: () => void;
    color: string;
    hoverColor: string;
    children: React.ReactNode;
}

export const Button = ({ onClick, color, hoverColor, children }: ButtonProps) => {
    return <button onClick={onClick}
        className={`${color} 
        hover:${hoverColor} text-2xl text-white 
        font-bold py-6 px-24 rounded-2xl`}>
        {children}
    </button>
}
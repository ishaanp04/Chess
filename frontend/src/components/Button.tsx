export const Button = ({ onClick, children }: { onClick: () => void, children: React.ReactNode}) => {
    return <button onClick={onClick}
        className="bg-pink-500 
        hover:bg-pink-600 text-2xl text-white 
        font-bold py-8 px-28 rounded">
        {children}
    </button>
}
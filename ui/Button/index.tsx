type ButtonProps = {
    onClick : (e:React.MouseEvent<HTMLElement,MouseEvent>)=>void,
    StartIcon? : React.ElementType,
    EndIcon? : React.ElementType,
    disable: Boolean,
    color:String,
    loading:Boolean,
    
}

const Button = (props:ButtonProps) => {
    return <button className="">{}</button>
}

export default Button;
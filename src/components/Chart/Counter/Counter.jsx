import { useState } from "react";

const Counter = () => {

    const [counter, setCounter] = useState(0);

    return (
        <>
            <h2>Counter</h2>
            <div className="d-flex">
                <p onClick={()=> setCounter((val)=> val - 1 )} role="button" >-</p>
                <span className="mx-2">{counter}</span>
                <p onClick={()=> setCounter((val)=> val + 1 )} role="button" >+</p>
            </div>
        </>
    )
}

export default Counter;
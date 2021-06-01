import React, { useEffect, useState } from 'react';

function ExampleCount() {

    const [count, setCount] = useState(0);

    useEffect(() => {

        setCount(count + 1);
        console.log("count", count);

        setCount(count + 1);
        console.log("count", count);

        setCount(count + 1);
        console.log("count", count);
    }, []);

    return ( 
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

export default ExampleCount;
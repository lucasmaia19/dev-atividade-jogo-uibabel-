import React, { useEffect, useState } from 'react';

import axios from 'axios';

function ExampleHttpFunction() {

    // const debug = '';

    const [count, setCount] = useState(0);
    const [atividades, setAtividades] = useState([]);

    useEffect(() => {

        // let mounted = true;

		axios.get('http://localhost:8001/atividade-caixa')
            .then(response => response.data)
            .then(data => {

                // if (mounted) {

                    console.log("atividades", atividades);
                    setAtividades(data);
                    console.log("atividades", atividades);

                    setCount(count + 1)
                    console.log("count", count);

                    setCount(count + 1)
                    console.log("count", count);

                    setCount(count + 1)
                    console.log("count", count);
                // }
            })

            // return () => mounted = false;
    }, []);

    return (

        <div>
            <h1>
                Count: {count}
            </h1>

            <h2>
                {atividades.map(e => <div key={e.id}> {e.perguntaTitulo} </div>)}
            </h2>
        </div>
    );
}

export default ExampleHttpFunction;
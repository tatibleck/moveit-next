import { useState } from 'react';
/* useState = funcionalidade para definir estados dentro do componente
ela retorna um array com duas posições: variavel em si e a função pra atualizar seu valor */

interface ButtonProps {
    color: string;
    children: string;
}
// propriedades que eu posso setar em cada botão individualmente

export function Button(props: ButtonProps) {
    const [counter, setCounter] = useState(1)
    // counter = valor atual do estado
    // setCounter = variavel criada para calcular o novo valor

    function increment() {
        setCounter(counter + 1);
    }
    // criei a função que calcula o novo estado do contador

    return (
        <button
            type="button"
            style={{ backgroundColor: props.color }}
            onClick={increment} >
            {props.children}
            <strong> {counter} </strong>
        </button>
    );
}

/* criação do componente de um botão que espera receber como atributo uma cor
podem ser definidos vários atributos e cada vez que forem modificados em cada elemento, muda o elemente especifico
o que é alterado diretamente no componente, altera TODOS os elementos. */

//tudo que vai dentro de um componente (quando ele é personalizado na tela) é um children

//se quiser um texto padrão no botão por ex, escreve ele no lugar do props.children

/* quando queremos um elemento não estático dentro do componente usamos o estado
no caso deste botão é um contador que eu quero que mude a cada vez que clico nele */
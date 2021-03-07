/*
  * o useEffect é um estado de "efeito colateral"
  * quando algo mudar/acontecer na minha aplicação a função do useEffect é executada
  * seu primeiro parâmetro é "o que eu quero executar?" que é sempre uma função
  * o segundo parâmetro é "quando eu quero executar isso?"
*/

import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'


export function Countdown() {
  const { minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');

  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  /* 
    * com o String nós transformamos o valor em texto
    * o split vai dividir esse texto em duas partes (pois temos duas caixas pros minutos e duas pros segundos) e nos retorna-las em um array 
    * desmembramos esse array em minuteLeft/secondLeft e minuteRight/secondRight
    * o padStart verifica se a string tem dois caracteres, em caso negativo ela acrescenta na esquerda um 0 pra então o split poder fazer a divisão
    
    * não há necessidade de colocar estas condições dentro do componente visto que elas são essenciais apenas no front, não fazem parte da regra de negocio como um todo
  */



  return (
    <div>
      <div className={styles.countdownContainer}>

        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button disabled className={styles.countdownButton}> Ciclo encerrado </button>
      ) : (
        <>
          { isActive ? (
            <button type="button" className={` ${styles.countdownButton} ${styles.countdownButtonActive} `}
              onClick={resetCountdown}> Abandonar ciclo </button>
          ) : (
            <button type="button" className={styles.countdownButton}
              onClick={startCountdown}> Iniciar ciclo </button>
          )
          }
        </>
      )}
    </div>
  )
}
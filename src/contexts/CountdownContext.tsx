import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;
// Timeout é uma variável/tipagem global

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60);
  // 25 minutos (nosso tempo inicial) mutltiplicado por 60 segundos

  const [isActive, setIsActive] = useState(false);
  // o estado isActive vai armazenar se o contador esta parado ou iniciado, neste caso ele inicia parado pois o start quem dá é o botão

  const [hasFinished, setHasFinished] = useState(false);
  // estado para declarar que o contador chegou ao fim

  const minutes = Math.floor(time / 60);
  // cálculo para retornar quanto minutos totais eu tenho. o floor arredonda o numero pra baixo quando temos valores quebrados na divisão

  const seconds = time % 60;
  // cálculo para retornar quanto segundos eu tenho. pega o resto da divisão que são nossos segundos

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time == 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])
  /*
    * toda vez que o valor de active e do time mudar (segundo parametro passado no useEffect), eu vou realizar toda a função descrita no primeiro parametro:
    * se o active estiver true (ou seja, ativo apos clique do botão pois seu valor inicial é false) e o meu contador (time) ainda não chegou a 0
    * depois de um timeout de um segundo (1000) eu vou reduzir meu time em um segundo
  */


  return (
    <CountdownContext.Provider value={{
      minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}
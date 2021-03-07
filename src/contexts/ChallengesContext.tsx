/*
  * dentro do objeto ChallengesContext eu tenho um componente chamado Provider
    * todos os elementos que estiverem dentro do Provider vão ter acesso aos dados do contexto do Challenges
      * um valor deve ser passado dentro do context.provider e ele pode ser uma string, um objeto, uma função
        * esse valor pode ser modificado atraves de funções, de estados, etc
*/

import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}
/*
  * quando criamos um componente e ele recebe conteúdo, precisamos declarar a propriedade children
    * uma boa pratica para o children é declarar qual seu conteudo, pois não o fazendo ele fica com tipo 'any'
      * quando o children de um componente também é um componente React nós o definimos com o tipo ReactNode (importado do React)
        * o ReactNode aceita todos os tipos de dados
*/

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, [])
  /*
    * sempre que um useEffect recebe como segundo parâmetro um array vazio [], ele vai executar a função do primeiro parametro apenas uma vez
      * essa execução ocorre quando o componente for chamado/exibido em tela
      
    * o Notification é uma API de browsers. passando o requestPermission ele pede permissão do usuário para poder mostrar as notificações
  */

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play;

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio disponível! 👈🏻', {
        body: `Valendo ${challenge.amount}xp !!!`
      })
    }
  }
  /*
    * o ramdom gera numeros aleatorios entre 0 a 1, quando queremos valores diferentes disto devemos passar apos a condição o multiplicando
      * neste caso pegamos o lenght (tamanho) do meu arquivo json que estou importando dentro da constante challenge
        * Math.floor arredonda o numero para baixo, quando o numero foi quebrado 
  */

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);

  }
  /*
    * o primeiro if é uma validação retornando vazio, apenas verificando se existe um desafio ativo, visto que, se o usuario não possuir desafio ativo, essa função não pode ser chamada
    * busco quanto de experiencia o desafio atual dá ao usuario atraves do amount (do arquivo challenges.json)
    * a finalExperience vai ser a soma da experiencia que o usuario ja tem com o amount da experiencia atual do desafio
        
    * se a soma da finalExperience for maior ou igual a experiencia necessária para o usuario avançar de nivel
    * pegamos esse valor final e diminuimos da experiencia necessaria, o que sobrar vai ser nossa experiencia final
      * por ex: estou com 80xp e preciso de 100xp para o proximo nivel. 
      * completei um desafio de 40xp logo fiquei com 20xp a mais do que o necessario para passar de nivel
      * meu xp vai ser zerado e os 20xp vão ser mostrados já para o proximo nivel
    * vai ser chamada a função de upar de level levelUp
    
    
    * a experiência atual vai ser setada com o valor final da experiencia após a soma
    * zeramos o desafio
    * acrescentamos ao numero de desafios completos + 1
  */

  return (
    < ChallengesContext.Provider value={{
      level, currentExperience, challengesCompleted, levelUp,
      startNewChallenge, activeChallenge, resetChallenge, experienceToNextLevel, completeChallenge
    }}>
      {children}
    </ ChallengesContext.Provider >
  );
}
/* 
  * arquivo para reaproveitar a estrutura básica da aplicação, por ex um menu ou o rodape que é presente em todas as páginas
    * o que está aqui dentro fica por volta de TODA aplicaçao 
      * é recarregado toda vez, não é conteudo estático como o Document 
*/
/*
  * dentro do objeto ChallengesContext eu tenho um componente chamado Provider
    * todos os elementos que estiverem dentro do Provider vão ter acesso aos dados do contexto do Challenges
      * como o App fica por volta de toda a aplicação, colocando o Provider nesta posição, toda aplicação tb tem acesso ao conexto do Challenges
*/
/*
  * um valor deve ser passado dentro do context.provider e ele pode ser uma string, um objeto, uma função 
    * esse valor pode ser modificado atraves de funções, de estados, etc
*/

import '../styles/global.css';
// importanto o arquivo de estilos

import { ChallengesProvider } from '../contexts/ChallengesContext';

function MyApp({ Component, pageProps }) {
  return (

    < ChallengesProvider >
      < Component {...pageProps} />
    </ ChallengesProvider >
  )
}

export default MyApp
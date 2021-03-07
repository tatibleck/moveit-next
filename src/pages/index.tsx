/* 
  * arquivo principal, é a homepage da aplicação
    * quando a aplicação é acessada, é o que esta aqui que é mostrado ao user 
      * aqui também podemos importar os Providers dos contextos e componentes criados 
*/

import { CompletedChallenges } from "../components/CompletedChalleges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { ChallengeBox } from "../components/ChallengeBox";
import { Profile } from "../components/Profile";
import styles from "../styles/components/Home.module.css";

import Head from 'next/head';
// essa tag coloca tudo o que estiver dentro dela no Head do HTML como, por exemplo, a fonte utilizada na aplicação, titulo, icone etc

import { CountdownProvider } from "../contexts/CountdownContext";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Página Inicial | move.it</title>
      </Head>

      <ExperienceBar />

      <CountdownProvider >
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  )
}

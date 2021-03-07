import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';
// importando o estilo Modulo CSS do Experience Bar que pode ser usado somente nele

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      {/* chaves para colocar uma variavel JS, styles + . + nome da classe no css module */}
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }}>
        </div>
        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>{currentExperience} xp</span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}
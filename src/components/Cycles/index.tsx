import { useTaskContext } from '../../context/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();

  const cycleStep = Array.from({ length: state.currentCycle });

  const cycleDecriptio = {
    workTime: 'Tempo de foco',
    shortBreakTime: 'Pausa curta',
    longBreakTime: 'Pausa longa',
  };
  console.log(cycleStep);
  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>

      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              key={nextCycle}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              aria-label={`indicador de ciclo de ${cycleDecriptio[nextCycleType]}`}
              title={`indicador de ciclo de ${cycleDecriptio[nextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}

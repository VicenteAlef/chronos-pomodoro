import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefautInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../context/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { formateSecondsToMinutes } from '../../utils/formateSecondsToMinutes';

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null); //forma não controlada de capturar oi valor do input

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskNameInput.current) return; //verifica se a ref está atribuída onde se for nula, sai da função

    const taskName = taskNameInput.current.value.trim(); // obtém o valor do input usando a ref e trata espaços em branco

    if (!taskName) {
      alert('Digite o nome da tarefa'); // validação simples para garantir que o nome da tarefa não esteja vazio
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(), // Gera um ID único baseado no timestamp atual em string
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formateSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };
    });
    console.log(newTask);
  }

  function handleInterruptTask(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setState(prevState => {
      return {
        ...prevState,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: prevState.tasks.map(task => {
          if (prevState.activeTask && prevState.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    });
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <DefaultInput
          id='inputTask'
          type='text'
          labelText='Task:'
          placeholder='Insira uma tarefa'
          ref={taskNameInput} // utiliza a ref para capturar o valor do input
          disabled={!!state.activeTask}
        />
      </div>

      <div className='formRow'>
        <p>Próximo intervalo é de xx min.</p>
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask ? (
          <DefaultButton
            aria-label='Iniciar tarefa'
            title='Iniciar tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
          />
        ) : (
          <DefaultButton
            aria-label='Iniciar tarefa'
            title='Iniciar tarefa'
            type='button'
            color='red'
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}

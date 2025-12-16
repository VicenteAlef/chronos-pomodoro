import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefautInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../context/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

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
        formattedSecondsRemaining: '00:00',
        tasks: [...prevState.tasks, newTask],
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
        />
      </div>

      <div className='formRow'>
        <p>Próximo intervalo é de xx min.</p>
      </div>

      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}

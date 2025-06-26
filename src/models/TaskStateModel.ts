import type { TaskModel } from './TaskModel';

export type TaskStateModel = {
  task: TaskModel[];
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  activeTask: TaskModel | null;
  currentCycle: number; // 1 - 8
  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};

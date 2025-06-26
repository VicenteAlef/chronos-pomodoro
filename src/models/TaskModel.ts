import type { TaskStateModel } from './TaskStateModel';

export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  completeDate: number | null; // quando o timer chega ao fim
  interruptDate: number | null; // qunado a task for interrompida
  type: keyof TaskStateModel['config'];
};

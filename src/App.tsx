import { Home } from './pages/Home';
import { TaskContextProvider } from './context/TaskContext/TaskContextProvider';

import './styles/theme.css';
import './styles/global.css';
// import { AboutPomodoro } from './pages/AboutPomodoro';
// import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <TaskContextProvider>
      <Home />;
    </TaskContextProvider>
  );
}

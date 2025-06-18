import { Container } from './components/Container';
import { Heading } from './components/Heading';

import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <>
      <Container>
        <Heading>Chronos</Heading>
      </Container>
      <Container>Menu</Container>
      <Container>Main</Container>
      <Container>Footer</Container>
    </>
  );
}

import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <>
      <Nav currentSection="home" />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;

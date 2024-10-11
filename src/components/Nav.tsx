import {useLocation, NavLink} from 'react-router-dom';
import {useState, useEffect} from 'react';

interface NavProps {
  currentSection: string;
}

const Nav = ({currentSection}: NavProps) => {
  const location = useLocation();
  const [section, setSection] = useState(currentSection);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setSection('Home');
    else if (path === '/SavedCandidates') setSection('Potential Candidates');
    else setSection('404: Page Not Found');
  }, [location]);

  return (
    <div>
      <NavLink to = '/' className = {section === 'Home' ? 'active' : ''}>Home</NavLink>
      <NavLink to = '/SavedCandidates' className = {section === 'Potential Candidates' ? 'active' : ''}>Potential Candidates</NavLink>
    </div>
  );
};

export default Nav;

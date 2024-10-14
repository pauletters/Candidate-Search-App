import {useLocation, NavLink} from 'react-router-dom';
import {useState, useEffect} from 'react';

interface NavProps {
  currentSection: string;
}

// This component is used to display the navigation bar at the top of the page. Use Effect is used to update 
// the section based on the current path. NavLink is used to navigate to different pages.
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

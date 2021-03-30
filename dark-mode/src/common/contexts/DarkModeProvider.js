import { useState } from 'react';
import DarkMode from './DarkMode';

export default function DarkModeProvider({ children }){
  const [darkMode, setDarkMode ] = useState(false);

  const handleDarkMode = (darkModeState) => {
    if(darkModeState){
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }

    setDarkMode(darkModeState);
  }

  return (
    <DarkMode.Provider value={{ darkMode, handleDarkMode }}>
      { children }
    </DarkMode.Provider>
  )
}
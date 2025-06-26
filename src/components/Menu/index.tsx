import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />
  }

  function HandleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={styles.menu}>
      <a href='#' aria-label='Home' title='Home'>
        <HouseIcon />
      </a>
      <a href='#' aria-label='Ver Histórico' title='Histórico'>
        <HistoryIcon />
      </a>
      <a href='#' aria-label='Configurações' title='Configurações'>
        <SettingsIcon />
      </a>
      <a href='#' aria-label='Tema' title='Tema' onClick={HandleThemeChange}>
        {nextThemeIcon[theme]}
      </a>
    </div>
  );
}

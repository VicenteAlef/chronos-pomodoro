import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';

export function Menu() {
  return (
    <div className={styles.menu}>
      <a href='#'>
        <HouseIcon />
      </a>
      <a href='#'>
        <HistoryIcon />
      </a>
      <a href='#'>
        <SettingsIcon />
      </a>
      <a href='#'>
        <SunIcon />
      </a>
    </div>
  );
}

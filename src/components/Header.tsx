import type { FC } from 'react';
import BillsLogo from './BillsLogo';
import './Header.css';

const Header: FC = () => {
  return (
    <header className="header">
      <BillsLogo />
      <h1 className="app-title">PrimeTime</h1>
    </header>
  );
};

export default Header; 
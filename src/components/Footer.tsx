import type { FC } from 'react';
import './Footer.css';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <button className="nav-button">
        <span className="nav-icon home-icon">🏠</span>
      </button>
      <button className="nav-button">
        <span className="nav-icon menu-icon">≡</span>
      </button>
      <button className="nav-button">
        <span className="nav-icon settings-icon">⚙️</span>
      </button>
    </footer>
  );
};

export default Footer; 
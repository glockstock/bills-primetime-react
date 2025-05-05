import type { FC } from 'react';
import billsLogo from '../assets/bills-logo.png';
import './BillsLogo.css';

const BillsLogo: FC = () => {
  return (
    <div className="bills-logo-container">
      <img 
        src={billsLogo} 
        alt="Buffalo Bills Logo" 
        className="bills-logo-image" 
        width={40} 
        height={40} 
      />
    </div>
  );
};

export default BillsLogo; 
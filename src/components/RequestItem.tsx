import type { FC } from 'react';
import type { Request } from '../data/requestsData';
import './RequestItem.css';

interface RequestItemProps {
  request: Request;
}

const RequestItem: FC<RequestItemProps> = ({ request }) => {
  return (
    <div className="request-item">
      <div className="request-info">
        <div className="request-name-row">
          <span className="request-name">{request.name}</span>
          {request.hasTicket && <span className="ticket-icon">🎟️</span>}
          {request.hasBillsIcon && <span className="bills-icon">🏈</span>}
        </div>
        <p className="request-description">{request.description}</p>
      </div>
      <div className="request-meta">
        <span className="request-time">{request.time}</span>
        <div className="request-location">
          <span className="location-icon">📍</span>
          <span>{request.location}</span>
        </div>
      </div>
    </div>
  );
};

export default RequestItem; 
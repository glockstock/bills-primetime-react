import type { FC } from 'react';
import type { Request } from '../data/requestsData';
import './RequestItem.css';

interface RequestItemProps {
  request: Request;
}

const RequestItem: FC<RequestItemProps> = ({ request }) => {
  // Get priority class based on the priority level
  const getPriorityClass = () => {
    switch (request.priority) {
      case 0:
        return 'priority-low';
      case 1:
        return 'priority-medium';
      case 2:
      default:
        return 'priority-high';
    }
  };

  return (
    <div className="request-item">
      <div className="request-main-content">
        <div className="request-description">{request.description}</div>
        <div className="request-location">{request.location}</div>
      </div>
      <div className="request-meta">
        <div className="request-time">{request.time}</div>
        <div className={`request-priority ${getPriorityClass()}`}>
          Pri. {request.priority}
        </div>
      </div>
    </div>
  );
};

export default RequestItem; 
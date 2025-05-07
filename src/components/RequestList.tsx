import type { FC } from 'react';
import { requests } from '../data/requestsData';
import RequestItem from './RequestItem';
import './RequestList.css';

const RequestList: FC = () => {
  const unassignedRequests = requests.filter(request => !request.assigned);
  const assignedRequests = requests.filter(request => request.assigned);

  return (
    <div className="request-list-container">
      <h2 className="page-title">Requests</h2>
      
      <div className="request-section">
        <h3 className="section-title">Unassigned ({unassignedRequests.length})</h3>
        <div className="request-list">
          {unassignedRequests.map((request) => (
            <RequestItem key={request.id} request={request} />
          ))}
        </div>
      </div>

      <div className="request-section">
        <h3 className="section-title">Assigned ({assignedRequests.length})</h3>
        <div className="request-list">
          {assignedRequests.map((request) => (
            <RequestItem key={request.id} request={request} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestList; 
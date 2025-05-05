import type { FC } from 'react';
import { requests } from '../data/requestsData';
import RequestItem from './RequestItem';
import './RequestList.css';

const RequestList: FC = () => {
  return (
    <div className="request-list-container">
      <div className="request-list-header">
        <h2 className="request-list-title">Requests</h2>
        <div className="request-list-actions">
          <button className="icon-button map-button">
            <span className="map-icon">📍</span>
          </button>
          <button className="icon-button list-button">
            <span className="list-icon">📋</span>
          </button>
        </div>
      </div>
      <div className="request-list">
        {requests.map((request) => (
          <RequestItem key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
};

export default RequestList; 
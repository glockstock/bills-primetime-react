import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { Request } from '../data/requestsData';
import { fallbackRequests } from '../data/requestsData';
import { fetchAllRequests } from '../services/api';
import RequestItem from './RequestItem';
import './RequestList.css';

const RequestList: FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);
        const data = await fetchAllRequests();
        
        if (data.length === 0) {
          // If the API returned no data, use fallback data
          setRequests(fallbackRequests);
          setIsUsingFallback(true);
        } else {
          setRequests(data);
          setIsUsingFallback(false);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load requests. Please try again later.');
        setRequests(fallbackRequests);
        setIsUsingFallback(true);
        console.error('Error loading requests:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  // Handle the deletion of a request
  const handleRequestDelete = (id: number) => {
    // Update state to remove the deleted request
    setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
  };

  const assignedToMeRequests = requests.filter(request => request.assignedToMe);
  const unassignedRequests = requests.filter(request => !request.assigned);
  const assignedRequests = requests.filter(request => request.assigned && !request.assignedToMe);

  return (
    <div className="request-list-container">
      <div className="request-content">
        <h2 className="page-title">Requests</h2>
        
        {loading && <div className="loading-indicator">Loading requests...</div>}
        
        {error && (
          <div className="error-message">
            {error}
            {isUsingFallback && <div className="fallback-notice">Showing demo data instead</div>}
          </div>
        )}

        {isUsingFallback && !loading && !error && (
          <div className="fallback-message">
            Unable to connect to the server. Showing demo data instead.
          </div>
        )}
        
        {!loading && (
          <>
            <div className="request-section">
              <h3 className="section-title">Assigned to me ({assignedToMeRequests.length})</h3>
              {assignedToMeRequests.length > 0 ? (
                <div className="assigned-to-me">
                  {assignedToMeRequests.map((request) => (
                    <RequestItem 
                      key={request.id} 
                      request={request} 
                      onDelete={handleRequestDelete}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">No requests assigned to you</div>
              )}
            </div>
            
            <div className="request-section">
              <h3 className="section-title">Unassigned ({unassignedRequests.length})</h3>
              {unassignedRequests.length > 0 ? (
                <div className="request-list">
                  {unassignedRequests.map((request) => (
                    <RequestItem 
                      key={request.id} 
                      request={request} 
                      onDelete={handleRequestDelete}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">No unassigned requests</div>
              )}
            </div>

            <div className="request-section">
              <h3 className="section-title">In progress ({assignedRequests.length})</h3>
              {assignedRequests.length > 0 ? (
                <div className="request-list">
                  {assignedRequests.map((request) => (
                    <RequestItem 
                      key={request.id} 
                      request={request} 
                      onDelete={handleRequestDelete}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">No assigned requests</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestList; 
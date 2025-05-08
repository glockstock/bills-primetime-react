import type { Request } from '../data/requestsData';
import { fallbackRequests } from '../data/requestsData';

const API_BASE_URL = 'https://primetimeai-service-297759956270.us-central1.run.app';

export interface ApiRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  priority: string | number;
  created_at: string;
  assigned_to?: string;
}

// Transform API response to match our frontend model
export const transformApiRequest = (apiRequest: ApiRequest): Request => {
  // Parse priority from string or use number directly, default to 0 if invalid
  const priorityValue = typeof apiRequest.priority === 'string' 
    ? parseInt(apiRequest.priority, 10) 
    : apiRequest.priority;
  
  // Use parsed value or default to 0 if NaN
  const priority = isNaN(priorityValue as number) ? 0 : priorityValue as number;
  
  return {
    id: parseInt(apiRequest.id, 10) || Math.floor(Math.random() * 1000), // Fallback for invalid IDs
    originalId: apiRequest.id, // Store the original string ID for API operations
    title: apiRequest.title || 'Untitled Request',
    description: apiRequest.description || 'No description provided',
    location: apiRequest.location || 'Unknown location',
    time: apiRequest.created_at ? 
      new Date(apiRequest.created_at).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true
      }) : 
      new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    priority: priority > 2 ? 2 : priority, // Clamp priority to our known range (0-2)
    assigned: apiRequest.status === 'assigned',
    assignedToMe: apiRequest.status === 'assigned' && apiRequest.assigned_to === 'me',
  };
};

export const fetchAllRequests = async (): Promise<Request[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/request/get_all`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // Include credentials if your API requires authentication
      // credentials: 'include',
    });
    
    if (!response.ok) {
      console.warn(`API returned status code: ${response.status}`);
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.warn('API did not return an array:', data);
      return fallbackRequests;
    }
    
    return data.map(transformApiRequest);
  } catch (error) {
    console.error('Error fetching requests:', error);
    console.log('Using fallback data instead');
    return fallbackRequests;
  }
};

export const deleteRequest = async (id: string): Promise<boolean> => {
  try {
    // Make sure the ID is properly formatted as expected by the API
    // The API expects the ID in the exact format it was returned from the server
    console.log('Attempting to delete request with ID:', id);
    
    const response = await fetch(`${API_BASE_URL}/request/delete`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
    
    // Log the response status for debugging
    console.log('Delete request response status:', response.status);
    
    if (!response.ok) {
      // Try to get more detailed error information from the response
      let errorDetails = '';
      try {
        const errorResponse = await response.json();
        errorDetails = JSON.stringify(errorResponse);
      } catch (e) {
        // If we can't parse the error response, just continue
      }
      
      console.warn(`API returned status code: ${response.status}`, errorDetails ? `Details: ${errorDetails}` : '');
      throw new Error(`API error: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting request:', error);
    return false;
  }
}; 
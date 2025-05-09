import { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';
import type { Request } from '../data/requestsData';
import { deleteRequest } from '../services/api';
import ConfirmDialog from './ConfirmDialog';
import './RequestItem.css';

interface RequestItemProps {
  request: Request;
  onDelete?: (id: number) => void; // Optional callback for when deletion succeeds
  isExpanded?: boolean; // Whether this item is expanded, controlled by parent
  onToggleExpand?: (id: number) => void; // Callback to toggle expansion
}

// Threshold in pixels to trigger swipe action
const SWIPE_THRESHOLD = 100;

const RequestItem: FC<RequestItemProps> = ({ 
  request, 
  onDelete,
  isExpanded = false,
  onToggleExpand
}) => {
  // Use internal state only if external control is not provided
  const [localExpanded, setLocalExpanded] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasTouchSupport, setHasTouchSupport] = useState(false);
  
  const touchStartX = useRef<number | null>(null);
  const currentOffsetX = useRef<number>(0);
  const itemRef = useRef<HTMLDivElement>(null);

  // Determine if expanded from props or local state
  const expanded = onToggleExpand ? isExpanded : localExpanded;

  // Get priority class based on the priority level
  const getPriorityClass = () => {
    switch (request.priority) {
      case 1:
        return 'priority-low';
      case 2:
        return 'priority-medium';
      default:
        return 'priority-high';
    }
  };

  const toggleExpanded = (e: React.MouseEvent) => {
    // Don't toggle when swiping or right-clicking
    if (isSwiping || e.type === 'contextmenu') return;
    
    if (onToggleExpand) {
      // If parent is controlling expansion, call the toggle callback
      onToggleExpand(request.id);
    } else {
      // Otherwise use local state
      setLocalExpanded(!localExpanded);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    try {
      // Use the original string ID from the API for deletion
      const result = await deleteRequest(request.originalId);
      if (result && onDelete) {
        onDelete(request.id);
      }
    } catch (error) {
      console.error('Failed to delete request:', error);
    } finally {
      setIsDeleting(false);
      setShowConfirmDialog(false);
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !isSwiping) return;
    
    const currentX = e.touches[0].clientX;
    const diff = touchStartX.current - currentX;
    
    // Only allow left swipe (positive diff)
    if (diff > 0) {
      currentOffsetX.current = diff;
      setSwipeOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    
    if (currentOffsetX.current > SWIPE_THRESHOLD) {
      // Threshold reached, show delete confirmation
      setShowConfirmDialog(true);
    }
    
    // Reset swipe state
    touchStartX.current = null;
    currentOffsetX.current = 0;
    setSwipeOffset(0);
    setIsSwiping(false);
  };

  // Clean up swipe if user leaves the element
  const handleTouchCancel = () => {
    touchStartX.current = null;
    currentOffsetX.current = 0;
    setSwipeOffset(0);
    setIsSwiping(false);
  };

  // Detect if device has touch support (mobile or tablet including iPad)
  useEffect(() => {
    const checkTouchSupport = () => {
      // Check if the device supports touch events
      const isTouchDevice = (
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore - for compatibility with older browsers
        navigator.msMaxTouchPoints > 0
      );
      
      // Additionally check if it's an iPad specifically
      const isIPad = /iPad|iPad Simulator|MacIntel/.test(navigator.platform) && 'ontouchend' in document;
      
      setHasTouchSupport(isTouchDevice || isIPad);
    };
    
    checkTouchSupport();
    window.addEventListener('resize', checkTouchSupport);
    
    return () => {
      window.removeEventListener('resize', checkTouchSupport);
    };
  }, []);

  // Calculate transform style based on swipe
  const swipeStyle = {
    transform: swipeOffset > 0 ? `translateX(-${swipeOffset}px)` : 'none',
    transition: isSwiping ? 'none' : 'transform 0.3s ease'
  };

  return (
    <>
      <div 
        ref={itemRef}
        className={`request-item ${expanded ? 'expanded' : ''}`} 
        onClick={toggleExpanded}
        onContextMenu={!hasTouchSupport ? handleRightClick : undefined}
        onTouchStart={hasTouchSupport ? handleTouchStart : undefined}
        onTouchMove={hasTouchSupport ? handleTouchMove : undefined}
        onTouchEnd={hasTouchSupport ? handleTouchEnd : undefined}
        onTouchCancel={hasTouchSupport ? handleTouchCancel : undefined}
        style={swipeStyle}
      >
        <div className="request-main-content">
          <div className="request-title">{request.title}</div>
          <div className="request-location">{request.location}</div>
          {expanded && (
            <div className="request-description">
              {request.description}
            </div>
          )}
        </div>
        <div className="request-meta">
          <div className="request-time">{request.time}</div>
          <div className={`request-priority ${getPriorityClass()}`}>
            Pri. {request.priority}
          </div>
        </div>
        
        {/* Show delete indicator when swiping on touch devices */}
        {hasTouchSupport && swipeOffset > 0 && (
          <div 
            className="swipe-delete-indicator"
            style={{ opacity: Math.min(swipeOffset / SWIPE_THRESHOLD, 1) }}
          >
            Delete
          </div>
        )}
      </div>
      
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Delete Request"
        message={`Are you sure you want to delete "${request.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirmDialog(false)}
      />
    </>
  );
};

export default RequestItem; 
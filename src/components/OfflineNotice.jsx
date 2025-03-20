import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { testConnection } from '../api';

export default function OfflineNotice() {
  const { t } = useLanguage();
  const [isOffline, setIsOffline] = useState(false);
  
  // Check connection status when component mounts and periodically
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Try to test the connection to the server
        const result = await testConnection();
        console.log("Connection test result:", result);
        // If we don't get a successful response, consider offline
        setIsOffline(!result || !result.success);
      } catch (error) {
        console.log("Connection test failed with error:", error);
        // If there's an error, definitely offline
        setIsOffline(true);
      }
    };
    
    // Check immediately on mount
    checkConnection();
    
    // Then check periodically
    const interval = setInterval(checkConnection, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Listen for specific API error events
  useEffect(() => {
    const handleApiError = () => {
      console.log("API error event detected");
      setIsOffline(true);
    };
    
    // Listen for a custom event that could be dispatched from the API module
    window.addEventListener('api-error', handleApiError);
    
    // Also listen to online/offline browser events
    const handleOffline = () => {
      console.log("Browser went offline");
      setIsOffline(true);
    };
    
    const handleOnline = () => {
      console.log("Browser went online, testing connection");
      // When browser detects online, verify with the server
      testConnection()
        .then(result => {
          const isConnected = result && result.success;
          console.log("Connection test after online event:", isConnected);
          setIsOffline(!isConnected);
        })
        .catch(err => {
          console.log("Connection test failed after online event:", err);
          setIsOffline(true);
        });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('api-error', handleApiError);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // For debugging - log when offline status changes
  useEffect(() => {
    console.log("OfflineNotice - isOffline state:", isOffline);
  }, [isOffline]);
  
  // Return null when online to not render anything
  if (!isOffline) return null;
  
  // Render the offline notice with a prominent style
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-100 border-t-2 border-yellow-400 px-4 py-3 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-yellow-800 font-medium">
            {t('errors.connectionError') || 'Could not connect to the server. Using local data.'}
          </span>
        </div>
        <button 
          onClick={() => {
            console.log("Manual connection retry requested");
            // Manually retry the connection
            testConnection()
              .then(result => {
                const isConnected = result && result.success;
                console.log("Manual connection test result:", isConnected);
                setIsOffline(!isConnected);
              })
              .catch(err => {
                console.log("Manual connection test failed:", err);
                setIsOffline(true);
              });
          }}
          className="px-4 py-2 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 rounded font-medium transition-colors"
        >
          {t('app.retryConnection') || 'Retry Connection'}
        </button>
      </div>
    </div>
  );
}

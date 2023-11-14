import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Import necessary libraries and modules

const TokenHandler = () => {
    const { isAuthenticated, user, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  
    useEffect(() => {
      const fetchData = async () => {
        if (isAuthenticated) {
          try {
            // Get the access token
            const accessToken = await getAccessTokenSilently();
  
            // Get the ID token claims (including the ID token itself)
            const idTokenClaims = await getIdTokenClaims();
  
            // Now you can send both tokens to your backend
            sendTokensToBackend({ accessToken, idToken: idTokenClaims.__raw });
          } catch (error) {
            console.error('Error getting tokens:', error);
          }
        }
      };
  
      fetchData();
    }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims]);
  
    const sendTokensToBackend = async ({ accessToken, idToken }) => {
      try {
        const response = await fetch('/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken,
            idToken,
          }),
        });
 
        if (!response.ok) {
          console.error('Error:', response.statusText);
        } else {
          const userData = await response.json();
          console.log('User data from backend:', userData);
        }
      } catch (error) {
        console.error('Error sending tokens to backend:', error);
      }
    };
  
    return null;
  };
  
  export default TokenHandler;
  
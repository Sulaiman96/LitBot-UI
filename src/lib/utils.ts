import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type requestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * Method for making request to backend that requires the user to be authenticated
 * @param protectedUrl
 * @param requestMethod
 * @param headers
 * @param data
 */
const makeProtectedRequest = async (protectedUrl: string, requestMethod: requestMethods, headers?: Record<string, string>, data?: any) => {
  try {
    const response = await fetch(protectedUrl, {
      method: requestMethod,
      credentials: 'include',
      headers,
    ...( data ? {body: JSON.stringify(data)} : '')
    });

    if (response.status === 403) {
      console.log('Access token expired or invalid. Attempting to refresh...');
      const refreshResponse = await fetch(refreshTokenURL, {
        method: 'POST',
        credentials: 'include'
      });

      if ( refreshResponse.ok ) {
        console.log('Access token refreshed successfully! Retrying original request...');
        // Retry the original request
        const retryResponse = await fetch(protectedUrl, {
          method: requestMethod,
          credentials: 'include'
        });

        if ( retryResponse.ok ) {
          const data = await retryResponse.json();
          console.log('Protected data after refresh:', data);
          return data;
        } else {
          console.error('Failed to get protected data after refresh:', await retryResponse.json());
          // Handle logout or re-login
        }
      } else {
        console.error('Failed to refresh token:', await refreshResponse.json());
        // Refresh token also failed or invalid, force logout
        console.log('Forcing logout...');
        await fetch(logoutURL, {credentials: 'include', method: 'POST'});
        // Redirect to login page
        // navigate('/account?action=logout');
      }
    } else if ( response.ok ) {
      const data = await response.json();
      console.log('Protected data:', data);
      return data;
    } else {
      console.error('Failed to get protected data:', await response.json());
    }
  } catch ( error ) {
    console.error('Error fetching protected data:', error);
  }
}

export default makeProtectedRequest;
// Simple utility to test API connection
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Test the API connection
export const testApiConnection = async () => {
  try {
    console.log('Testing API connection to:', API_URL);
    const response = await axios.get(`${API_URL}/health`);
    console.log('API connection successful:', response.data);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('API connection failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

// Test the auth endpoints
export const testAuthEndpoints = async () => {
  try {
    console.log('Testing auth endpoints...');
    
    // Test register endpoint (without actually registering)
    try {
      await axios.options(`${API_URL}/auth/register`);
      console.log('Register endpoint is accessible');
    } catch (error) {
      console.error('Register endpoint test failed:', error.message);
    }
    
    // Test login endpoint (without actually logging in)
    try {
      await axios.options(`${API_URL}/auth/login`);
      console.log('Login endpoint is accessible');
    } catch (error) {
      console.error('Login endpoint test failed:', error.message);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Auth endpoints test failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Export a function to run all tests
export const runApiTests = async () => {
  const connectionTest = await testApiConnection();
  const authTest = await testAuthEndpoints();
  
  return {
    connectionTest,
    authTest
  };
};

export default runApiTests;

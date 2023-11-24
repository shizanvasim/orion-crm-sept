import axios from 'axios';

axios.defaults.baseURL = 'https://orion-crm-server-79qy.onrender.com/api/v1';

export const instance = axios.create({
  baseURL: 'https://orion-crm-server-79qy.onrender.com/api/v1', // Set the base URL for all requests
  timeout: 5000, // Set the default timeout for requests to 5 seconds
  headers: {
    'Content-Type': 'application/json', // Set the default content type for requests
  },
});



export const fetchClients = async () => {
  try {
    const response = await axios.get('/clients');
    return response.data;
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err;
  }
};

export const fetchClientById = async (id) => {
  try {
    const response = await axios.get(`/clients/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err;
  }
};

export const postClient = async (formData) => {
  try {
    const response = await axios.post(`/clients`, formData);
    return response.data;
  } catch (err) {
    console.error('Error Posting Client:', err);
    throw err;
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`/clients/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error Deleting User');
    throw err;
  }
};


export const updateClient = async (formData, id) => {
  try {
    const response = await axios.put(`/clients/${id}`, formData)
    return response.data
  } catch (err) {
    console.error('Error Updating Client')
    throw err
  }
}




// Products
export const fetchProducts = async () => {
  try {
    const response = await axios.get('/products');
    return response.data;
  } catch (err) {
    console.error('Error fetching products:', err);
    throw err;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`/products/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching products:', err);
    throw err;
  }
};


// Users
export const fetchUsers = async () => {
  try {
    const response = await axios.get('/users');
    return response.data;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`/users/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    throw err;
  }
};


export const login = async (username, password) => {
  try {
    const { data } = await axios.post('/login', { username, password });

    if (data.success) {
      // Store the token securely (e.g., in localStorage)
      localStorage.setItem('token', data.data.token);
    }

    return data;
  } catch (error) {
    console.error(error);
  }

  return { success: false, message: "Login failed" };
};



export const adminLogin = async (username, password) => {
  try {
    const { data } = await axios.post('/login/admin', { username, password });

    if (data.success) {
      // Store the token securely (e.g., in localStorage)
      localStorage.setItem('token', data.data.token);
    }

    return data;
  } catch (error) {
    console.error(error);
  }

  return { success: false, message: "Login failed" };
};

import axios from "axios";
const tokenKey = "token";
const userKey = "user";

export const baseUrl = "https://alpha-api-gateway-dev.up.railway.app";
//API_URL: 'https://alpha-api-gateway-dev.up.railway.app',
// "http://localhost:6050

export const getLoggedInUser = () => {
  const user = localStorage.getItem(userKey);
  return user ? JSON.parse(user) : null;
};

export const signIn = (token: string, user: any) => {
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(userKey, JSON.stringify(user));
};

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${baseUrl}/auth/api/v1/login`, {
    email,
    password,
  });
  return res.data;
};

export const getApiStats = async () => {
  const res = await axios.get(`${baseUrl}/users/api/v1/admin/stats`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

export const getAPIBodyguards = async (filterParam: string) => {
  const res = await axios.get(
    `${baseUrl}/users/api/v1/admin/bodyguards?searchString=${filterParam}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return res.data;
};

export const getAPIClients = async (filterParam: string) => {
  const res = await axios.get(
    `${baseUrl}/users/api/v1/admin/clients?searchString=${filterParam}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return res.data;
};

export const getUser = async (userID: string) => {
  const res = await axios.get(`${baseUrl}/users/api/v1/admin/user/${userID}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

export const getUserJobs = async (data: string) => {
  const res = await axios.post(`${baseUrl}/jobs/api/v1/request/user/jobs/all`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    data,
  });
  return res.data;
};

export const getAllJobs = async () => {
  const res = await axios.get(
    `${baseUrl}/jobs/api/v1/request/user/job-requests`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return res.data;
};

export const getPendingKyc = async () => {
  const res = await axios.get(`${baseUrl}/users/api/v1/admin/pending-kycs`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

export const actPendingKyc = async (id: string, approved: boolean) => {
  const res = await axios.post(
    `${baseUrl}/users/api/v1/admin/kyc-review/${id}`,
    {
      approved: approved,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      data: {
        approved: approved,
      },
    }
  );
  return res.data;
};

export const getToken = () => {
  return localStorage.getItem(tokenKey);
};

export const isUserLoggedIn = () => {
  return getToken() !== null && getLoggedInUser() !== null;
};

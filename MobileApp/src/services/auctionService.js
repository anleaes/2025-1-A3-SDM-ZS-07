import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// USUÁRIO
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/register/`, {
      name,
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao registrar usuário');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login/`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Credenciais inválidas');
  }
};

// LEILÕES
export const createAuction = async (auctionData) => {
  try {
    const response = await axios.post(`${API_URL}/auctions/`, auctionData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao criar leilão');
  }
};

export const getAuctions = async () => {
  try {
    const response = await axios.get(`${API_URL}/auctions/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar leilões');
  }
};

export const getAuctionDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/auctions/${id}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar detalhes do leilão');
  }
};

export const deleteAuction = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/auctions/${id}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao excluir leilão');
  }
};

// LANCES
export const placeBid = async (bidData) => {
  try {
    const response = await axios.post(`${API_URL}/bids/`, bidData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer lance');
  }
};

export const getBidsForAuction = async (auctionId) => {
  try {
    const response = await axios.get(`${API_URL}/bids/?auction=${auctionId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar lances');
  }
};
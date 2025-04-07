import axios from 'axios';

const API_BASE_URL = 'http://localhost:5101';

export const uploadItems = async (data: Record<string, string>[]) => {
  return await axios.post(`${API_BASE_URL}/api/v1/items`, data);
};

export const getItems = async (
  codeFilter?: number,
  valueFilter?: string,
  pageNumber = 1,
  pageSize = 10
) => {
  const params: Record<string, any> = { pageNumber, pageSize };
  if (codeFilter !== undefined) params.codeFilter = codeFilter;
  if (valueFilter) params.valueFilter = valueFilter;

  return await axios.get(`${API_BASE_URL}/api/v1/items`, { params });
};
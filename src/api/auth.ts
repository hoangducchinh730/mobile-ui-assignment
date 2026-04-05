import { BASE_URL } from './client';

export const loginApi = async (email: string, password: string) => {
  // Cả tài liệu của thầy ghi rõ Query param thay vì body:
  const url = `${BASE_URL}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Sai tài khoản hoặc mật khẩu!');
  }
  
  return response.json(); 
};

export const registerApi = async (data: {email: string, password: string, name: string, description: string}) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Đăng ký thất bại, email có thể đã bị trùng!');
  }
  
  return response.json();
};

export const getProfileApi = async (email: string) => {
  const response = await fetch(`${BASE_URL}/profile/${encodeURIComponent(email)}`);
  
  if (!response.ok) {
    throw new Error('Không thể tải hồ sơ người dùng');
  }
  
  return response.json();
};

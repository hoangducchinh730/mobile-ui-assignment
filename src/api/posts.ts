import { BASE_URL } from './client';

export const getPostsApi = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) throw new Error('Không thể tải bài viết');
  return response.json();
};

export const createPostApi = async (title: string, description: string, creator_email: string) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, creator_email })
  });
  if (!response.ok) throw new Error('Không thể đăng bài');
  return response.json();
};

export const deletePostApi = async (postId: string) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Không thể xoá bài');
  return response.json();
}

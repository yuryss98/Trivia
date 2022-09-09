export const getToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const data = await response.json();
  const { token } = data;
  localStorage.setItem('token', token);
};

export const getQuestions = async () => {
  const token = localStorage.getItem('token');
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

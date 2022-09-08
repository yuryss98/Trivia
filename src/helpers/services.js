const getToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const data = await response.json();
  const { token } = data;
  localStorage.setItem('token', token);
};

export default getToken;

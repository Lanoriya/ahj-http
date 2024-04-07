const createRequest = async (options = {}) => {
  const {
    url,
    method = 'GET',
    headers = {},
    body = null
  } = options;

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default createRequest;

export async function handleResponse(response) {
  if (response.ok) return response.json();
  else {
    throw new Error('Invalid Response');
  }
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  let message = `` + error;
  if (message === 'TypeError: Failed to fetch') {
    message = 'Internal server is unavailable.';
  }
  console.error(message);
  throw message;
}

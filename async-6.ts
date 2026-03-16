import { delay } from './async-5';

/** User type matching JSONPlaceholder response */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string };
}

/**
 * Fetches users from JSONPlaceholder and returns them after a delay.
 * @param {number} delayTime - Optional delay in milliseconds before resolving. Default is 2000.
 * @returns {Promise<User[]>} - Promise resolving to array of users
 */
export async function getUsers(delayTime = 2000): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  await delay(delayTime);
  return res.json();
}

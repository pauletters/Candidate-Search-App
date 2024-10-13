import { Candidate } from "../interfaces/Candidate.interface";

const fetchDetailedUserInfo = async (username: string): Promise<Candidate | null> => {
  try {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) {
    console.warn(`Failed to fetch detailed info for ${username}. Status: ${response.status}`);
    return null;
  }

  const user = await response.json();
  return {
    name: user.name || null,
    username: user.login,
    location: user.location || null,
    avatar_url: user.avatar_url,
    email: user.email || null,
    html_url: user.html_url,
    company: user.company || null,
    bio: user.bio || null,
  };
} catch (error) {
  console.error(`Error fetching information for ${username}:`, error);
  return null;
  }
};

const searchGithub = async (): Promise<Candidate[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}&per_page=50`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('GitHub API error:', response.status, errorBody);
      throw new Error(`Github API responded with status ${response.status}: ${errorBody}`);
    }

    const users = await response.json();
    console.log('Initial GitHub API Response:', users);

    // Fetch detailed information for each user
    const detailedUsers = await Promise.all(
      users.map((user: any) => fetchDetailedUserInfo(user.login))
    );

    const validUsers = detailedUsers.filter((user): user is Candidate => user !== null);

    console.log('Detailed Users:', validUsers);
    
    if (validUsers.length === 0) {
      throw new Error('No valid user data could be fetched. Please try again.');
    }

    return validUsers;
  } catch (err) {
    console.error('Error in searchGithub:', err);
    throw err;
  }
};

const searchGithubUser = async (username: string): Promise<Candidate | null> => {
    return await fetchDetailedUserInfo(username);
};

export { searchGithub, searchGithubUser };

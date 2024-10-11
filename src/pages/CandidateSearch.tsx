import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { saveCandidate } from '../utils/storage';

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

const fetchCandidates = async () => {
  try {
    setLoading(true);
    const data = await searchGithub();
    setCandidates(data);
    setLoading(false);
  } catch (err) {
    setError('An error occurred while searching for candidates');
    setLoading(false);
  }
};

const handleSaveCandidate = () => {
  if (currentCandidateIndex < candidates.length) {
    saveCandidate(candidates[currentCandidateIndex]);
    moveToNextCandidate();
  }
};

const moveToNextCandidate = () => {
  setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
};

if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <div>{error}</div>;
}

if (currentCandidateIndex >= candidates.length) {
  return <div>No more candidates available</div>;
}

const currentCandidate = candidates[currentCandidateIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
      <img src={currentCandidate.avatar_url} alt={currentCandidate.name || 'Candidate avatar'} />
        <h2>{currentCandidate.name || 'No name provided'}</h2>
        <p>Username: {currentCandidate.username}</p>
        <p>Location: {currentCandidate.location || 'Not specified'}</p>
        <p>Email: {currentCandidate.email || 'Not provided'}</p>
        <p>Company: {currentCandidate.company || 'Not specified'}</p>
        <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
    </div>
    <button onClick={handleSaveCandidate}>+</button>
    <button onClick={moveToNextCandidate}>-</button>
    </div>
  );
};

export default CandidateSearch;

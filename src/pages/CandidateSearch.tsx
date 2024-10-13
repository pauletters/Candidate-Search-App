import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { saveCandidate } from '../utils/storage';
import './CandidateSearch.css';

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
    setError(null);
    const data = await searchGithub();
    setCandidates(prevCandidates => [...prevCandidates, ...data]);
    setCurrentCandidateIndex(prevIndex => prevIndex || 0);
  } catch (err) {
    console.error('An error occurred while fetching candidates:', err);
    setError(`An error occurred while fetching candidates. ${err instanceof Error ? err.message : String(err)}`);
  } finally {
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
  setCurrentCandidateIndex(prevIndex => {
    if (prevIndex + 1 < candidates.length) {
      return prevIndex + 1;
    } else {
      fetchCandidates();
      return 0;
    }
  });
};

if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <div>
    <h2>Error</h2>
    <p>{error}</p>
    <button onClick={fetchCandidates}>Retry</button>
  </div>;
}

if (candidates.length === 0) {
  return <div>No more candidates available</div>;
}

const currentCandidate = candidates[currentCandidateIndex];

  return (
    <div className='candidate-page'>
      <h1>Candidate Search</h1>
      <div className='candidate-search'>
      <img src={currentCandidate.avatar_url} alt={currentCandidate.name || 'Candidate avatar'} />
        <h2>{currentCandidate.name || 'No name provided'}</h2>
        <p>Username: {currentCandidate.username}</p>
        <p>Location: {currentCandidate.location || 'Not specified'}</p>
        <p>Email: {currentCandidate.email || 'Not provided'}</p>
        <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
        <p>Company: {currentCandidate.company || 'Not specified'}</p>
        <p>Bio: {currentCandidate.bio || 'Not provided'}</p>
        
    </div>
    <div className='button-container'>
    <button className='save-button' onClick={handleSaveCandidate}>+</button>
    <button className='discard-button' onClick={moveToNextCandidate}>-</button>
    </div>
    </div>
  );
};

export default CandidateSearch;

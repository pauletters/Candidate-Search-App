import React, { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import { getSavedCandidates } from '../utils/storage';
import './SavedCandidates.css';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    setSavedCandidates(getSavedCandidates());
  }, []);

  const handleReject = (username: string) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.username !== username);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  }

  if (savedCandidates.length === 0) {
    return <div>No potential candidates are available to view</div>;
  }

  
  return (
    <div className='potential-candidates'>
      <h1>Potential Candidates</h1>
      <table className='candidates-table'>
        <thead>
          <tr>
            <th className='avatar-column'>Avatar</th>
            <th className='name-column'>Name</th>
            <th className='username-column'>Username</th>
            <th className='location-column'>Location</th>
            <th className='email-column'>Email</th>
            <th className='profile-column'>GitHub Profile</th>
            <th className='company-column'>Company</th>
            <th className='bio-column'>Bio</th>
            <th className='reject-column'>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate, index) => (
            <tr key={index}>
              <td className='avatar-column'>
                <img src={candidate.avatar_url} alt={candidate.name || 'Candidate avatar'} className='candidate-avatar'/>
              </td>
              <td className='name-column'>{candidate.name || 'No name provided'}</td>
              <td className='username-column'>{candidate.username}</td>
              <td className='location-column'>{candidate.location || 'Not specified'}</td>
              <td className='email-column'><span>{candidate.email || 'Not specified'}</span></td>
              <td className='profile-column'><a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a></td>
              <td className='company-column'>{candidate.company || 'Not specified'}</td>
              <td className='bio-column'><span>{candidate.bio || 'Not provided'}</span></td>
              <td className='reject-column'><button onClick={() => handleReject(candidate.username)} className='reject-button'>-</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;

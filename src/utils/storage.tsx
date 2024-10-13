import { Candidate } from '../interfaces/Candidate.interface';

const STORAGE_KEY = 'savedCandidates';

export const getSavedCandidates = (): Candidate[] => {
    const savedCandidates = localStorage.getItem(STORAGE_KEY);
    return savedCandidates ? JSON.parse(savedCandidates) : [];
};

export const saveCandidate = (candidate: Candidate): void => {
    const savedCandidates = getSavedCandidates();
    savedCandidates.push(candidate);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCandidates));
};

export const updateSavedCandidates = (candidates: Candidate[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
};

export const clearSavedCandidates = (): void => {
    localStorage.removeItem(STORAGE_KEY);
};
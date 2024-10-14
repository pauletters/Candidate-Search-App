// This is the candidate interface that is used to define the structure of the candidate object.
interface Candidate {
    name: string | null;
    username: string;
    location: string | null;
    avatar_url: string;
    email: string | null;
    html_url: string;
    company: string | null;
    bio: string | null;
};

export type { Candidate };
export interface ICreateResume {
    userName: string | null | undefined;
    userEmail: string | null | undefined;
    resumeId: string;
    title: string
}

interface Experience {
    id: number;
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    workSummery: string;
  }
  
  interface Education {
    id: number;
    universityName: string;
    startDate: string;
    endDate: string;
    degree: string;
    major: string;
    description: string;
  }
  
  interface Skill {
    id: number;
    name: string;
    rating: number;
  }
  
  export interface UserProfile {
    firstName: string;
    lastName: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
    github?: string; 
    linkedin?: string; 
    themeColor: string;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
  }
  
  export interface ResumeInfoContextType {
    resumeInfo: UserProfile | null;
    setResumeInfo: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  }
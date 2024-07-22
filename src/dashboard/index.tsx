import { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "@/services/GlobalApi";

const DashboardPage = () => {
  const [resumes, setResumes] = useState([]);

  const { user, isLoaded } = useUser();

  useEffect(() => {
    const getResumes = async () => {
      const res = await GlobalApi.getUserResumes(
        user?.primaryEmailAddress?.emailAddress || ""
      );
      console.log(user?.primaryEmailAddress?.emailAddress);
      setResumes(res.data.data);
    };
    if (user && isLoaded) {
      getResumes();
    }
  }, [user, isLoaded]);
  return (
    <div className="p-10 md:px-20 lg:px-24">
      <h1 className="text-2xl font-bold">My Resume</h1>
      <p className="text-secondary-foreground">
        Get your portfolio ready for your next job!
      </p>
      <div className="my-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
        <AddResume />
        {resumes &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          resumes.map((resume: any) => {
            return (
              <ResumeCard
                resume={resume.attributes}
                key={resume.attributes.resumeId}
              />
            );
          })}
      </div>
    </div>
  );
};
export default DashboardPage;

import { useResumeInfo } from "@/context/resumeInfoContext";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationPreview from "./preview/EducationPreview";
import SkillPreview from "./preview/SkillPreview";

const ResumePreview = () => {
  const { resumeInfo } = useResumeInfo();
  return (
    <div style={{
      borderColor: resumeInfo?.themeColor
    }} 
    className="shadow-lg h-full p-10 border-t-[20px]">
      <PersonalDetailPreview />
      <SummaryPreview />
      <ExperiencePreview />
      <EducationPreview />
      <SkillPreview />
    </div>
  )
}
export default ResumePreview
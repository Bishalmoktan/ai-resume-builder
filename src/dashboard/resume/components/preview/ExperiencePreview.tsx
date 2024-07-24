import { useResumeInfo } from "@/context/resumeInfoContext";

const ExperiencePreview = () => {
  const { resumeInfo } = useResumeInfo();
  return (
    <div className="my-6">
      <h2
        className="font-bold mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Experience
      </h2>

      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {experience?.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>
              {experience?.startDate} To{" "}
              {experience?.currentlyWorking ? "Present" : experience.endDate}{" "}
            </span>
          </h2>

          <div
            className="text-xs my-2 rsw-ce"
            dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
          />
        </div>
      ))}
    </div>
  );
};
export default ExperiencePreview;

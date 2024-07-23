import { useResumeInfo } from "@/context/resumeInfoContext"
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const PersonalDetailPreview = () => {
  const {resumeInfo} = useResumeInfo();
  return (
    <div>
      <div className="text-center">
      <h2 className={`font-bold text-2xl`} style={{
        color: resumeInfo?.themeColor
      }}>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
      <p>{resumeInfo?.jobTitle}</p>
      <div className="flex gap-3 justify-center text-xs">
        {resumeInfo?.email && <>
        <div className="flex gap-1 items-center">
          <FaEnvelope fill={resumeInfo.themeColor} className="text-xl" />
          <a className="underline underline-offset-2" href={resumeInfo.email}>{resumeInfo.email}</a>
        </div>
        </>}

        {resumeInfo?.github && <>
        <div className="flex gap-1 items-center">
          <FaGithub fill={resumeInfo.themeColor} className="text-xl" />
          <a className="underline underline-offset-2" href={resumeInfo.github}>@{resumeInfo.github.split("/").slice(-1).toString().toLowerCase()}</a>
        </div>
        </>}

        {resumeInfo?.linkedin && <>
        <div className="flex gap-1 items-center">
          <FaLinkedin fill={resumeInfo.themeColor} className="text-xl" />
          <a className="underline underline-offset-2" href={resumeInfo.linkedin}>@{resumeInfo.linkedin.split("/").slice(-1).toString().toLowerCase()}</a>

        </div>
        </>}
        
      </div>
      </div>

      <hr className='border-[1.5px] my-2'
        style={{
            borderColor:resumeInfo?.themeColor
        }}
        />
    </div>
  )
}
export default PersonalDetailPreview
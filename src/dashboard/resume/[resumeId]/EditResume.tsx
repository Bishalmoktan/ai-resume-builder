import { ResumeInfoContext } from "@/context/resumeInfoContext"
import FormSection from "@/dashboard/resume/components/FormSection"
import ResumePreview from "@/dashboard/resume/components/ResumePreview"
import dummy from "@/data/dummy"
import GlobalApi from "@/services/GlobalApi"
import { UserProfile } from "@/types/types"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const EditResume = () => {
  const [resumeInfo, setResumeInfo] = useState<UserProfile | null>(null);
  const { resumeId } = useParams();
  useEffect(() => {
    const getResumeDetail = async () => {
      const res = await GlobalApi.getRusumeDetail(resumeId!);
      const { attributes } = res.data.data;
    
      setResumeInfo({
        ...dummy!,
        ...attributes
      })
    } 

    getResumeDetail();
  }, [])
  return (
    <ResumeInfoContext.Provider value={{
      resumeInfo,
      setResumeInfo
    }}>
    <div
    className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10"
    >
      <FormSection />

      <ResumePreview />

    </div>
    </ResumeInfoContext.Provider>

  )
}
export default EditResume
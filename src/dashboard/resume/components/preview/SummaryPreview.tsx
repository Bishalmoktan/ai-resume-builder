import { useResumeInfo } from "@/context/resumeInfoContext"

const SummaryPreview = () => {
    const {resumeInfo} = useResumeInfo();
  return (
    <div> <p className='text-xs'>
    {resumeInfo?.summary}
</p></div>
  )
}
export default SummaryPreview
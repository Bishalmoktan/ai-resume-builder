import { useResumeInfo } from "@/context/resumeInfoContext"

const SkillPreview = () => {
  const { resumeInfo } = useResumeInfo();
  return (
    <div className='my-6'>
    <h2 className='font-bold mb-2'
    style={{
        color:resumeInfo?.themeColor
    }}
    >Skills</h2>
    <hr style={{
        borderColor:resumeInfo?.themeColor
    }} />

    <div className="my-4">
        {resumeInfo?.skills.map((skill,index)=>(
            <div key={index} className='flex items-center justify-between'>
                <h2 className='text-xs list-item list-inside'>{skill.name}</h2>
                
            </div>
        ))}
    </div>
    </div>
  )
}
export default SkillPreview
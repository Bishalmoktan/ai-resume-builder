import { Notebook } from "lucide-react"
import { Link } from "react-router-dom"



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ResumeCard = ({resume}: {resume: any}) => {
  return (
    <Link to={`/dashboard/resume/${resume.id}/edit`}>
        <div className="px-20 w-max h-[280px] flex items-center justify-center bg-secondary border-rose-500 border-2 rounded-md cursor-pointer hover:shadow-md hover:scale-105 transition-all">
            <Notebook />
        </div>
        <p>{resume.attributes.title}</p>
    </Link>
  )
}
export default ResumeCard
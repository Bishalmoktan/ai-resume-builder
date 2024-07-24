import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeInfo } from "@/context/resumeInfoContext";
import GlobalApi from "@/services/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface FormData {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    linkedin: string;
    github: string;
}


interface PersonalDetailProps {
    setEnableNext: React.Dispatch<React.SetStateAction<boolean>>;
}

const PersonalDetail = ( {setEnableNext} : PersonalDetailProps) => {
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useResumeInfo();
    const { resumeId } = useParams();
    
    const [formData, setFormData] = useState<FormData>({
        firstName: resumeInfo?.firstName || '',
        lastName: resumeInfo?.lastName || '',
        jobTitle: resumeInfo?.jobTitle || '',
        email: resumeInfo?.email || '',
        linkedin: resumeInfo?.linkedin || '',
        github: resumeInfo?.github || ''
    });

    useEffect(() => {
        setFormData({
            firstName: resumeInfo?.firstName || '',
            lastName: resumeInfo?.lastName || '',
            jobTitle: resumeInfo?.jobTitle || '',
            email: resumeInfo?.email || '',
            linkedin: resumeInfo?.linkedin || '',
            github: resumeInfo?.github || ''
        })
    }, [resumeInfo])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnableNext(false);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        setResumeInfo({
            ...resumeInfo!, 
            [name]:value
        })
        
    }

    const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: formData
        }
        try {
            await GlobalApi.updateUserResume(resumeId, data);
            setEnableNext(true);
            toast.success('Details updated')
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!')
        } finally {
            setLoading(false);
        }


    }

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4">
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get Started with the basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name="firstName" defaultValue={formData.firstName} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="lastName" defaultValue={formData.lastName} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle" defaultValue={formData.jobTitle} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Email</label>
                        <Input name="email" defaultValue={formData.email} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Linkedin</label>
                        <Input name="linkedin" defaultValue={formData.linkedin} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Github</label>
                        <Input name="github" defaultValue={formData.github} required onChange={handleInputChange} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetail;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeInfo } from "@/context/resumeInfoContext";
import { Experience as ExperienceType } from "@/types/types";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import RichTextEditor from "../RichTextEditor";
import GlobalApi from "@/services/GlobalApi";
import { toast } from "sonner";

interface ExperienceProps {
  setEnableNext: React.Dispatch<React.SetStateAction<boolean>>;
}



const Experience = ({ setEnableNext }: ExperienceProps) => {
  const [experinceList, setExperinceList] = useState<ExperienceType[]>([]);
  const { resumeInfo, setResumeInfo } = useResumeInfo();
  const {resumeId} = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.experience) {
      resumeInfo?.experience.length > 0 && setExperinceList(resumeInfo?.experience);
    }
  }, []);

  const onSave = async () => {

    setLoading(true);

    const data = {
      data: {
        experience: experinceList,
      },
    };
    try {
      await GlobalApi.updateUserResume(resumeId, data);
      setEnableNext(true);
      toast.success("Details updated");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  const addNewExperience = () => {
    setExperinceList([
      ...experinceList,
      {
        experience_id: uuid(),
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummary: "",
        currentlyWorking: false,
      },
    ]);
  };

  const removeExperience = () => {
    setExperinceList((experinceList) => experinceList.slice(0, -1));
  };

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newEntries = [...experinceList];
    const { name, value } = event.target;
    const key = name as keyof ExperienceType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (newEntries[index] as any)[key] = value;
    setExperinceList(newEntries);
  };

  const handleRichTextEditorChange = (index: number, value: string) => {
    const newEntries = [...experinceList];
    newEntries[index].workSummary = value;
    setExperinceList(newEntries);
    console.log(experinceList)
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo!,
      experience: experinceList,
    });
  }, [experinceList]);



  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experinceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummary}
                    onRichTextEditorChange={(value) => handleRichTextEditorChange(index, value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              onClick={() => addNewExperience()}
              variant="outline"
              className="text-primary"
            >
              + Add More Experience
            </Button>
            <Button
              onClick={() => removeExperience()}
              variant="outline"
              className="text-primary"
            >
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Experience;

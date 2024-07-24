import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResumeInfo } from "@/context/resumeInfoContext";
import { AIChatSession } from "@/services/AIModel";
import GlobalApi from "@/services/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface SummaryProps {
  setEnableNext: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IAIResponse {
    summary: string;
    experience_level: string;
}

const prompt = "Job Title: {jobTitle} , depending on job title give me list of summaries for 3 experience level, Mid Level and fresher level in 3-4 lines in array format, With summary and experience_level Field in JSON Format"

const Summary = ({ setEnableNext }: SummaryProps) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string>();
  const [aiSummary, setAISummary] = useState<IAIResponse[] | null>(null);
  const { resumeInfo, setResumeInfo } = useResumeInfo();

  const generateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle || '');
    console.log(PROMPT);
    const result = await AIChatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));

    setAISummary(JSON.parse(result.response.text()));
    setLoading(false);
  };

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo!,
        summary: summary,
      });
  }, [summary]);

  const { resumeId } = useParams();

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      data: {
        summary,
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
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
              onClick={() => generateSummaryFromAI()}
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summary}
            defaultValue={summary ? summary : resumeInfo?.summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      {aiSummary && <div className='my-5'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiSummary?.map((item,index)=>(
                <div key={index} 
                onClick={()=>setSummary(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>}
    </div>
  );
};
export default Summary;

import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, ContentEditableEvent, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { useState } from "react";
import { useResumeInfo } from "@/context/resumeInfoContext";
import { toast } from "sonner";
import { AIChatSession } from "@/services/AIModel";

interface RichTextEditorProps {
  onRichTextEditorChange: (value: string) => void;
  index: number;
  defaultValue: string;
}

const PROMPT = 'position title: {positionTitle}, Based on the position title, provide 5-7 bullet points for my experience in the resume (Please do not add experience level and No JSON array). Provide the result in HTML tags.';

const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }: RichTextEditorProps) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo } = useResumeInfo();

  const generateSummaryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast.warning('Please Add Position Title');
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
    const result = await AIChatSession.sendMessage(prompt);
    const resp =  result.response.text();
    setValue(resp);
    onRichTextEditorChange(resp);
    setLoading(false);
  }

  const handleEditorChange = (e: ContentEditableEvent) => {
    const newValue = e.target.value;
    setValue(newValue);
    onRichTextEditorChange(newValue);
  }

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={generateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? <LoaderCircle className='animate-spin' /> : <>
            <Brain className='h-4 w-4' /> Generate from AI
          </>}
        </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={handleEditorChange}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}
export default RichTextEditor;

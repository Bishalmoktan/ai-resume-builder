import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react"
import { useState } from "react";
import PersonalDetail from "./form/PersonalDetail";

const FormSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [enableNext, setEnableNext] = useState<boolean>(false);
  
  return (
    <section className="space-y-4">
      <div className="flex justify-between">
        <Button className="flex gap-2 items-center" variant={'outline'}>
          <LayoutGrid />
          <span>Theme</span>
        </Button>

        <div className="flex gap-2">
          { activeIndex > 1 && <Button onClick={() => setActiveIndex((prev) => prev - 1)}><ArrowLeft /></Button>}
          <Button disabled={!enableNext} onClick={() => setActiveIndex((prev) => prev + 1)} className="flex gap-1"><span>Next</span><ArrowRight /> </Button>
        </div>
      </div>

      <div>
      { activeIndex == 1 && <PersonalDetail setEnableNext={setEnableNext} />}
      </div>
    </section>
  )
}
export default FormSection
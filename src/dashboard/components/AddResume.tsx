import { Loader2, PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import GlobalApi from "@/services/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { v4 as uuidv4 } from 'uuid';

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const {user} = useUser();

  const onCreate = async () => {
    setLoading(true);
    const data = {
        data: {
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            title,
            resumeId: uuidv4()
            
        }
    }
   try {
       const res = await GlobalApi.createNewResume(data)
        console.log(res);

   } catch (error) {
        console.log(error);
   } finally {
    setLoading(false);
    setOpenDialog(false);
    setTitle('');
   }
  }

  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="py-20 p-14 bg-secondary w-max rounded-md cursor-pointer hover:shadow-md hover:scale-105 transition-all"
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Resume</DialogTitle>
            <DialogDescription>
              Create your resume and get your job ready.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input
              id="name"
              placeholder="Fullstack Developer"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={onCreate} disabled={loading} type="submit">{loading ? <Loader2 /> : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddResume;

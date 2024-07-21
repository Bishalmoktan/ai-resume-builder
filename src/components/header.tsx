import { UserButton, useUser } from "@clerk/clerk-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom";

const Header = () => {

  const {isSignedIn} = useUser();

  return (
    <nav className="flex justify-between shadow-md px-10 py-4">
        <div>
            <img src="/logo.svg" />
        </div>
        <div>
           {isSignedIn ?
           <div className="flex gap-2 items-center">
           <Link to="/dashboard">
           <Button variant={'ghost'}>Dashboard</Button> 
           </Link>
           <UserButton />
           </div>
          :<>
          <Link to={"/auth/sign-in"}>
          <Button>Get Started</Button> 
          </Link>
          </>
        }
        </div>
    </nav>

  )
}
export default Header
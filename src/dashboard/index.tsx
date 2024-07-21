import AddResume from "./components/AddResume"


const DashboardPage = () => {

  return (
    <div className="p-10 md:px-20 lg:px-24">
      <h1 className="text-2xl font-bold">My Resume</h1>
      <p className="text-secondary-foreground">Get your portfolio ready for your next job!</p>
      <div className="my-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
        <AddResume />
      </div>
     
  
    </div>
  )
}
export default DashboardPage
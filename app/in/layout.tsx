import Sidebar from "../components/in/Sidebar"




function InLayout({children}:{children:React.ReactNode}) {
  return (
    <div className="w-full min-h-screen flex justify-between items-start">
       <Sidebar  />
       {children}

    </div>
  )
}

export default InLayout
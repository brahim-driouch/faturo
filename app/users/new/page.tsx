import { RegisterForm } from "@/app/components/users/register-form"




function page() {
  return (
    <div className="min-h-screen flex flex-col w-full justify-start py-20 text-gray-800 container mx-auto px-6 text-center">
      <h1 className="text-3xl font-semibold mb-8">Créer votre compte Grauit</h1>
      <div className=" w-full max-w-md mx-auto">
           <RegisterForm />
      </div>
     
    </div>
  )
}

export default page
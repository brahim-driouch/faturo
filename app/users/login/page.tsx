import { LoginForm } from '@/app/components/users/login-form'
import React from 'react'

function LoginPage() {
  return (
       <div className="min-h-screen flex flex-col w-full justify-start py-20 text-gray-800 container mx-auto px-6 text-center">

         <h1 className="text-2xl font-bold mb-4">Veuillez vous connecter </h1>
          <div className=" w-full max-w-md mx-auto">
             <LoginForm/>
          </div>
         


    </div>
  )
}

export default LoginPage
"use client";

import AddBusinessForm from "@/app/components/in/business/add-business-form";
import ActivateAccountForm from "@/app/components/users/activate-account-form";
import useAuth from "@/hooks/auth";






function OnBoardingPage() {
    const {data:user,isLoading} =useAuth()

    if(isLoading) return null

    // if(!user.isActive) return (
    //     <div className="w-full min-h-screen items-start justify-center">
    //         <ActivateAccountForm/>
    //     </div>
    // )

    if(!user.businessId) return(
         <div className="w-full py-20  items-start justify-center">
            <AddBusinessForm/>
        </div>
    )
    
}


export default OnBoardingPage
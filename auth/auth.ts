import { truncateSync } from "fs";
import { SignJWT,jwtVerify } from "jose";
import { cookies } from "next/headers";

const cookieName="faturio_session"
const secret = new TextEncoder().encode(process.env.JWT_SECRET);


export async function signAuthToken(payload:any){
   try {
     const token = await new SignJWT(payload)
    .setProtectedHeader({alg:"HS256"})
    .setIssuedAt()
    .setExpirationTime("48h")
    .sign(secret);
    
    return token
    
   } catch (error) {
     console.log(error)
     throw new Error("Failed to sign token")
   }
}


export async function verifyAuthToken<T>(token:string):Promise<T>{
    try {
        const {payload} = await jwtVerify(token,secret)
        return payload as T
    } catch (error) {
        console.log(error)
        throw new Error("Failed to verify token")
    }
}

export async function getAuthCookie(){
    const cookieStore = await cookies()
    const token = cookieStore.get(cookieName)?.value
    return token
}


export async function setAuthCookie(token:string){
    try {
        const cookieStore = await cookies()
        cookieStore.set(cookieName,token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            path:"/",
            maxAge:60 * 60 * 48
        })
    } catch (error) {
        console.log(error)
        throw new Error("Failed to set cookie")
    }
}
export async function deleteAuthToken(){
    try {
        const cookieStore = await cookies()
    cookieStore.delete(cookieName)
    } catch (error) {
        console.log(error)
        throw new Error("Failed to delete cookie")
    }
}



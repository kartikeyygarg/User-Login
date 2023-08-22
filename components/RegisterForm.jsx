"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm(){
    const [name , setName]=useState("");
    const[email, setEmail]=useState("");
    const[password, setPassword]= useState("");
    const [error,setError]=useState("");

    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!name || !email || !password){
            setError("All fields are necessary.");
            return; 
        }
        try {
            const resUserExists = await fetch('api/userExists', {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email }),
            });

            const {user} = await resUserExists.json();

            if(user){
                setError("User already exists.");
                return;
            }

            const res = await fetch('api/register',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    name, email, password
                })
            })
            if(res.ok){
                const form = e.target;
                form.reset();
                router.push("/");
            }else{
                console.log("User registration failed.");
            }
        } catch (error) {
            console.log("Error during registration: ",error);
        }
  
    };

    console.log("Name: ",name);
    return <div>
        <h2 className="text-center bg-green-200 font-bold">Register Here!</h2>
        <div className="grid place-items-center h-screen">
    <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-800 ">
        <h1 className="text-xl font-bold my-4">Register the Details</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input onChange={e => setName(e.target.value)} type="text" placeholder="Enter your Name" />
            <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Enter Email" />
            <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button className="bg-blue-900 text-white font-bold cursor-pointer px-6 py-2">Register 
            </button>
{error &&(
            <div className="bg-red-700 text-white font-bold w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
            )}
            <Link className="text-sm mt-3 text-right font-bold" href={"/"}>Already Have an account? <span className="underline"> Login </span> </Link>
        </form>
    </div>
   </div>
</div>; 
}
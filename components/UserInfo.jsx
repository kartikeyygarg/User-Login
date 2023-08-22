"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";


export default function UserInfo(){

    const{data:session} = useSession();



    return <div>
        <h2 className="text-center bg-red-200 font-bold">Details Below, Logout!</h2>
        <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
            <div>
                Name: <span className="font-bold">{session?.user?.name}</span>
            </div>
            <div className="mt-1">
                Email: <span className="font-bold">{session?.user?.email}</span>
            </div>
            <button onClick={() => signOut()} className="bg-red-600 text-white font-bold py-1 px-1 mt-5">
                Log Out
            </button>
        </div>
        </div>
    </div>;
}
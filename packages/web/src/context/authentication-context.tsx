import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { check } from "@/lib/axios";

type AuthenticationContextProps = {
    user: string,
    setUser: Dispatch<SetStateAction<string>>;
    check: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextProps | null>(null);

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string>("");

    return (
        <AuthenticationContext.Provider value={{ user, setUser, check }}>
            {children}
        </AuthenticationContext.Provider>
    )
}
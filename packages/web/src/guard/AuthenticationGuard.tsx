import { toast } from "@/components/ui/use-toast";
import { check } from "@/lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AuthenticationGuard = ({ children }: { children: React.ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const validate = async () => {
            const isAuthenticated = await check();

            if (isAuthenticated) {
                setAuthenticated(true);
                router.push("/");
                return;
            }

            toast({
                variant: "destructive",
                title: "Authentication Failed",
                description: "It was not possible to authenticate. Please, try again later."
            });

            setAuthenticated(false);
            router.push("/session-start");
            return;
        }

        validate();
    }, [router.events]);

    return authenticated ? children : null;
}

export default AuthenticationGuard;
import { AppProps } from "next/app";
import { Toaster } from "@/components/ui/toaster"
import "@/app/globals.css";
import { AuthenticationProvider } from "@/context/authentication-context";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <AuthenticationProvider>
            <Component {...pageProps} />
            <Toaster />
        </AuthenticationProvider>
    )
}

export default App;
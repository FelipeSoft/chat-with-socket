import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must contain at least 2 characters"
    }).max(50, {
        message: "String must contain at most 50 characters"
    }),
    password: z.string().min(2, {
        message: "Username must contain at least 2 characters"
    }).max(255, {
        message: "String must contain at most 255 characters"
    })
})

const SessionStart = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(values: z.infer<typeof FormSchema>) {
        localStorage.setItem("CURRENT_USER", values.username);
        router.push("/chat");
    }

    return (
        <main className="max-w-sm mx-auto">
            <div className="w-full flex flex-col items-center justify-center mb-10 mt-16">
                <Image
                    src="/paper-airplane-icon-23.png"
                    alt="Paper Airplane Image"
                    width={100}
                    height={100}
                >
                </Image>
                <h1 className="text-neutral-500 mt-6 text-xl">Log in with your account</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full mt-6 bg-cyan-700 hover:bg-cyan-700/80">Log in</Button>
                    <Link href="/new-account" className="text-cyan-700 text-center mt-6 mb-16">Don't have an account yet?</Link>
                </form>
            </Form>
        </main>
    )
}

export default SessionStart;
"use client";

import { Menu, Send } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import socket from '../lib/socket';
import { useRouter } from "next/router";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/ChatMessage";
import AuthenticationGuard from "@/guard/AuthenticationGuard";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { DoubleArrowDownIcon } from "@radix-ui/react-icons";

const Index = () => {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [logs, setLogs] = useState({
        connectedUsers: [],
        messages: []
    });

    const [viewMessages, setViewMessages] = useState<number | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket.emit("join-request", JSON.parse(localStorage.getItem("LOGGED_USER") as string));

        socket.on("log-update", (socket) => {
            setLogs({
                connectedUsers: socket.connectedUsers,
                messages: socket.messages
            });
        });
        setViewMessages(null);
    }, []);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const sendMessage = (e: FormEvent) => {
        e.preventDefault();
        if (message) {
            socket.emit("message", message);
            setMessage("");
            scrollToBottom();
        }
    };

    return (
        <AuthenticationGuard>
            <main className="grid grid-cols-4 h-screen">
                <aside className="hidden lg:flex flex-col gap-4 col-span-1 border-r p-5">
                    <h1 className="text-lg font-semibold">Usuários Conectados</h1>
                    <ScrollArea className="h-default-height">
                        <ul>
                            {logs.connectedUsers.map((user, index) => (
                                <li className="flex items-center gap-2" key={index}>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                    <div>
                                        {
                                            user !== "" && user === localStorage.getItem("LOGGED_USER") as string
                                                ? `${localStorage.getItem("LOGGED_USER") as string} (Você)`
                                                : user
                                        }
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                </aside>
                <div className="fixed top-5 right-5 z-30 lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size={"icon"}>
                                <Menu />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <div>
                                <h1 className="text-lg font-semibold">Usuários Conectados</h1>
                                <ScrollArea className="h-default-height">
                                    <ul>
                                        {logs.connectedUsers.map((user, index) => (
                                            <li className="flex items-center gap-2" key={index}>
                                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                                <div>
                                                    {
                                                        user !== "" && user === localStorage.getItem("LOGGED_USER") as string
                                                            ? `${localStorage.getItem("LOGGED_USER") as string} (Você)`
                                                            : user
                                                    }
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <ScrollArea id="messages" className="col-span-full lg:col-span-3 lg:p-5 pt-20 px-5 pb-5 flex flex-col gap-2 w-full h-full z-20">
                    {logs.messages.map((log: any, index) => {
                        if (log.status === "left") {
                            return (
                                <p key={index} className="text-neutral-500 italic">{log.user} desconectado</p>
                            )
                        }
                        if (log.status === "joined") {
                            return (
                                <p key={index} className="text-neutral-500 italic">{log.user} conectado</p>
                            )
                        }
                        if (log.user && !log.status) {
                            return <ChatMessage key={index} from={log.user} message={log.message} time={log.time} />
                        }
                    })}
                    <div ref={messagesEndRef} />
                    <button onClick={() => scrollToBottom()} className="h-10 w-10 rounded-full bg-cyan-200 fixed bottom-[135px] right-8 flex items-center justify-center">
                        <DoubleArrowDownIcon />
                        {viewMessages && viewMessages > 0 && <div className="absolute bg-red-500 h-4 w-4 -top-1 -right-1 rounded-full"></div>}
                    </button>
                </ScrollArea>
                <div className="col-span-full">
                    <form onSubmit={sendMessage} className="relative flex items-center bg-neutral-900 p-5">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Digite sua mensagem aqui"
                            className="resize-none bg-transparent w-full outline-none mt-4 text-white"
                        />
                        <button type="submit" className="text-black bg-cyan-500 h-10 w-10 flex items-center justify-center rounded-md">
                            <Send />
                        </button>
                    </form>
                </div>
            </main>
        </AuthenticationGuard>
    );
}

export default Index;

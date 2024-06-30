"use client";

import { ChatMessage } from "@/components/ChatMessage";
import { Scroll, Send } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import socket from '../lib/socket';
import { useRouter } from "next/router";
import { ScrollArea } from "@/components/ui/scroll-area";

const Chat = () => {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [logs, setLogs] = useState({
        connectedUsers: [],
        messages: []
    });

    useEffect(() => {
        const username = localStorage.getItem("CURRENT_USER");
        if (username) {
            setName(username);
            return;
        }
        router.push("/");
    }, []);

    useEffect(() => {
        if (name !== "") {
            socket.emit("join-request", name);

            socket.on("log-update", (socket) => {
                setLogs({
                    connectedUsers: socket.connectedUsers,
                    messages: socket.messages
                });
            });
        }
    }, [name]);

    const sendMessage = (e: FormEvent) => {
        e.preventDefault();
        if (message) {
            socket.emit("message", message);
            setMessage("");
        }
    };

    return (
        <main className="grid grid-cols-4 h-screen">
            <aside className="flex flex-col gap-4 col-span-1 border-r p-5">
                <h1 className="text-lg font-semibold">Usuário Conectados</h1>
                <ScrollArea className="h-default-height">
                    <ul>
                        {logs.connectedUsers.map((user, index) => (
                            <li className="flex items-center gap-2" key={index}>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <div>
                                    {user === name ? `${name} (Você)` : user}
                                </div>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </aside>
            <ScrollArea className="col-span-3 p-5 flex flex-col gap-2 w-full h-full z-20">
                {logs.messages.map((log: any) => {
                    if (log.status === "left") {
                        return (
                            <p className="text-neutral-500 italic">{log.user} desconectado</p>
                        )
                    }
                    if (log.status === "joined") {
                        return (
                            <p className="text-neutral-500 italic">{log.user} conectado</p>
                        )
                    }
                    if (log.user && !log.status) {
                        return <ChatMessage from={log.user} message={log.message} time={log.time} />
                    }
                })}
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
    );
}

export default Chat;

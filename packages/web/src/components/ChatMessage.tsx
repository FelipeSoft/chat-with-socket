type Props = {
    from: string;
    message: string;
    time: string;
}

export const ChatMessage = ({ from, message, time }: Props) => {
    return (
        <article className="flex flex-col gap-1 rounded-lg bg-cyan-100 text-black p-4 col-span-full w-full my-4">
            <div>
                <span className="text-sm">
                    {from}
                </span>
                <p className="text-lg">
                    {message}
                </p>
            </div>
            <p className="text-sm w-full text-right">
                {time}
            </p>
        </article>
    )
}
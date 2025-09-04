import { useEffect, useState } from "react";
import Drawer from "../ui/drawer";
import type { Thread } from "~/core/history";
import { mergeMessage, type Message } from "~/core/messages";
import { useRootStore } from "~/store";
import { cn, getStateValue } from "~/lib/utils";
import dayjs from "dayjs";
import {
    queryHistoryMetadata,
    getThreadDetail,
    deleteThread,
    updateThread,
} from "~/core/api/history";
import { 
    appendMessage,
    existsMessage,
    findMessageByToolCallId,
    getMessage,
    useStore 
} from "~/core/store";
import ThreadMapStorage from "~/core/utils/thread-map";
import { featchStream } from "~/core/api";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import MoreActionsMenu from "./more-action";
import { Collecte } from "./icons/collecte";
import Image from "next/image";
import AiNoImg from "~/assets/images/ai-no.png";
import {  BaseDialog } from "~/components/yomo/base-modal";
import { Button } from "../ui/button";
interface ChatHistoryProps {
    open: boolean;
    onOpenChange: () => void;
}

function DeleteModal({
    open,
    onClose,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
}) {
    return (
        <BaseDialog open={open} onOpenChange={onClose}>
            <div className="bg-white rounded-lg border-0 h-[auto] p-4">
                <div className="p-0 space-y-4">
                    <div className="flex flex-col items-center">
                        <svg
                            className="mt-4"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 30C6.71578 30 0 23.2842 0 15C0 6.71578 6.71578 0 15 0C23.2842 0 30 6.71578 30 15C30 23.2842 23.2842 30 15 30ZM16.4062 7.03125C16.4062 6.25453 15.7767 5.625 15 5.625C14.2233 5.625 13.5938 6.25453 13.5938 7.03125V17.3438C13.5938 18.1205 14.2233 18.75 15 18.75C15.7767 18.75 16.4062 18.1205 16.4062 17.3438V7.03125ZM15 21.5625C14.2233 21.5625 13.5938 22.192 13.5938 22.9688C13.5938 23.7455 14.2233 24.375 15 24.375C15.7767 24.375 16.4062 23.7455 16.4062 22.9688C16.4062 22.192 15.7767 21.5625 15 21.5625Z"
                                fill="#F60000"
                            />
                        </svg>
                        <h3 className="font-brand-medium text-[16px] mt-5 mb-2">
                            Delete this conversation?
                        </h3>
                        <p className="text-[14px]">This action cannot be undone.</p>
                        <div className="flex w-full gap-3 pt-2 mt-6">
                            <Button
                                className="flex-1 bg-[#F3F3F3] h-[40px] rounded-[30px] text-sm text-center text-[#2C2C2C] hover:bg-[#F3F3F3]/90"
                                onClick={() => onClose()}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 h-[40px] bg-[#F60000] hover:bg-[#F60000]/90  rounded-[30px] text-white text-sm text-center tracking-[0] leading-[normal] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                onClick={onSubmit}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </BaseDialog>
    );
}

function EditModal({
    thread,
    open,
    onClose,
    onSubmit,
}: {
    thread: Thread | undefined;
    open: boolean;
    onClose: () => void;
    onSubmit: (title: string) => void;
}) {
    const [title, setTitle] = useState(thread?.title || "");

    useEffect(() => {
        if (thread) {
            setTitle(thread.title);
        }
    }, [thread])

    return (
        <BaseDialog open={open} onOpenChange={onClose}>
            <div className="bg-white rounded-lg border-0 h-[auto] p-4">
                <div className="p-0 space-y-4">
                    <h3 className="text-lg font-bold">Edit Title</h3>
                    <div className="flex flex-col">
                        <div className="relative">
                            <Input
                                className="h-10 pl-2 pr-20 mb-0 rounded-2"
                                placeholder="Long size title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex w-full gap-3 pt-2 mt-6">
                            <Button
                                variant="outline"
                                className="flex-1 h-10 rounded-[30px] font-medium text-sm text-center cursor-pointer"
                                onClick={() => onClose()}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 h-10 bg-[#f67c00] hover:bg-[#f67c00]/90  rounded-[30px] font-medium text-white text-sm text-center tracking-[0] leading-[normal] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                onClick={() => onSubmit(title)}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </BaseDialog>
    );
}

const ChatHistory = ({
    open,
    onOpenChange
}: ChatHistoryProps) => {

    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [type, setType] = useState<"all" | "starred">("all");
    const [currentThread, setCurrentThread] = useState<Thread>();
    const [total, setTotal] = useState(0);

    const { token } = useRootStore();
    const [threads, setThreads] = useState<Record<string, Thread[]>>({});

    function groupByDayTimestamp(data: Thread[]): Record<string, Thread[]> {
        return data.reduce((acc, item) => {
            const dayStart = Math.floor(item.created_at / 86400) * 86400;
            if (!acc[dayStart.toString()]) {
                acc[dayStart] = [];
            }
            acc[dayStart]?.push(item);

            return acc;
        }, {} as Record<string, Thread[]>);
    }
    const fetchHistoryMetadata = async () => {
        try {
            const user_id = getStateValue("state.userDetail.uid");
            if (!user_id) return;
            const data = await queryHistoryMetadata(user_id, search.trim(), type);
            if (data && Array.isArray(data)) {
                setTotal(data.length);
                const dataObj = groupByDayTimestamp(data);
                setThreads(dataObj);
            }
        } catch (error) {
            console.error("Error fetching history metadata:", error);
        }
    };

    const handlethreadClick = async (thread: Thread) => {
        try {
            useStore.getState().clearMessages();
            const data = await getThreadDetail(thread.thread_id);
            console.log("thread detail:", data);
            let messages: Message[] = [];
            if (data && data.messages && Array.isArray(data.messages)) {
                data.messages.forEach((message) => {
                    messages.push(message);
                });
            }
            if (messages.length) {
                messages.forEach((message) => {
                    appendMessage(message);
                });
                useStore.getState().setThreadId(thread.thread_id);
            }
            if (data && data.is_agent_running) {
                const id = ThreadMapStorage.get(thread.thread_id);
                if (thread.thread_id && id) {
                    const stream = featchStream(thread.thread_id, id);
                    for await (const event of stream) {
                        // console.log("收到事件:", event);
                        const { type, data } = event;
                        let messageId = data.id;
                        let message: Message | undefined;
                        if (type === "tool_call_result") {
                            message = findMessageByToolCallId(data.tool_call_id);
                        } else if (!existsMessage(messageId)) {
                            message = {
                                id: messageId,
                                threadId: data.thread_id,
                                agent: data.agent,
                                role: data.role,
                                type: data.type,
                                content: "",
                                contentChunks: [],
                                reasoningContent: "",
                                reasoningContentChunks: [],
                                isStreaming: true,
                                // interruptFeedback,
                            };
                            appendMessage(message);
                        }
                        message ??= getMessage(messageId);
                        if (message) {
                            message = mergeMessage(message, event);
                            useStore.getState().updateMessage(message);
                        }
                    }
                }
            }
            // onOpenChange(false)
            // setOpen(false);
        } catch (error) {
            console.error("Error fetching history metadata:", error);
        }
    };

    const handleDelete = async () => {
        try {
            if (currentThread) {
                const res = await deleteThread(currentThread.thread_id);
                console.log("res", res);
                if (res.message) {
                    setDeleteOpen(false);
                    fetchHistoryMetadata();
                }
            }
        } catch (error) { }
    };

    const handleEdite = async (title: string) => {
        try {
            if (currentThread) {
                const res = await updateThread(
                    currentThread.thread_id,
                    title,
                    currentThread.is_starred
                );
                if (res.message) {
                    setEditOpen(false);
                    fetchHistoryMetadata();
                }
            }
        } catch (error) { }
    };

    const handleUpdateStarred = async (
        thread_id: string,
        title: string,
        starred: boolean
    ) => {
        try {
            const res = await updateThread(thread_id, title, starred);
            if (res.message) {
                fetchHistoryMetadata();
            }
        } catch (error) { }
    };

    useEffect(() => {
        if (token && open) {
            fetchHistoryMetadata();
        }
    }, [token, open, type, search]);

    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
        >
            <div className="flex  flex-col w-full h-full">
                <div className="flex flex-col px-4 space-y-2">
                    <div className="flex items-center space-x-4 text-sm font-medium">
                        <button
                            className={
                                type === "all"
                                    ? cn(
                                        "font-brand-medium text-[16px] pb-[-3px] text-brand-primary border-b-2 border-brand-primary hover:text-brand-primary cursor-pointer"
                                    )
                                    : cn(
                                        " font-brand-medium text-[16px] pb-[-3px] text-brand-gray1 border-b-2 border-white hover:text-brand-primary cursor-pointer"
                                    )
                            }
                            onClick={() => setType("all")}
                        >
                            All
                        </button>
                        <button
                            className={
                                type === "starred"
                                    ? cn(
                                        "font-brand-medium text-[16px] pb-[-3px] text-brand-primary border-b-2 border-brand-primary hover:text-brand-primary cursor-pointer"
                                    )
                                    : cn(
                                        "font-brand-medium text-[16px] pb-[-3px] text-brand-gray1 border-b-2 border-white hover:text-brand-primary cursor-pointer"
                                    )
                            }
                            onClick={() => setType("starred")}
                        >
                            Starred
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="relative w-full group">
                            <Search className="absolute w-4 h-4 -translate-y-1/2 text-brand-gray1 group-focus-within:text-brand-primary left-2 top-1/2" />
                            <Input
                                value={search}
                                name="search"
                                id="search"
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Search"
                                className="w-full pl-8 pr-2 rounded-md"
                            />
                        </div>
                        {/* <button onClick={() => {}} className="p-2 rounded-md hover:text-red-500">
                                <Trash2 className="w-5 h-5" />
                            </button> */}
                    </div>
                </div>
                <div className="h-[calc(100vh-22%)] overflow-y-auto px-4 pb-2 pt-5">
                    {Object.keys(threads)
                        .sort((a, b) => Number(b) - Number(a))
                        .map((key) => (
                            <>
                                <div className="flex items-center justify-between">
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {dayjs
                                            .unix(key as unknown as number)
                                            .format("YYYY-MM-DD")}
                                    </p>
                                </div>
                                <div className="grid gap-1 py-2">
                                    {threads[key]?.map((thread, index) => {
                                        return (
                                            <button
                                                key={index}
                                                className={cn(
                                                    "flex items-start gap-3 rounded-lg p-4 text-left transition-colors bg-white hover:bg-brand-gray1/20"
                                                    // isSelected && "bg-[#FFF4E8]",
                                                )}
                                                onClick={() => handlethreadClick(thread)}
                                            >
                                                <div className="flex items-center justify-between w-full gap-2">
                                                    <div className="flex-1 space-y-1">
                                                        <h4 className="text-sm font-medium">
                                                            {thread.title || `Chat${index}`}
                                                        </h4>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MoreActionsMenu
                                                            onDelete={() => {
                                                                setCurrentThread(thread);
                                                                setDeleteOpen(true);
                                                            }}
                                                            onEdit={() => {
                                                                setCurrentThread(thread);
                                                                setEditOpen(true);
                                                            }}
                                                        />
                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleUpdateStarred(
                                                                    thread.thread_id,
                                                                    thread.title,
                                                                    !thread.is_starred
                                                                );
                                                            }}
                                                        >
                                                            <Collecte
                                                                className="cursor-pointer"
                                                                color={thread.is_starred ? "#F67C00" : ""}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        ))}
                    {Object.keys(threads).length === 0 && (
                        <div className="pt-[100px]">
                            <div className="flex items-center justify-center">
                                <Image className="w-[136px] h-auto" src={AiNoImg} alt="" />
                            </div>
                            <p className="mt-[30px] text-brand-gray1 text-sm text-center">
                                No more history
                            </p>
                            <p className="text-sm text-center text-brand-gray1">
                                Only show sessions within 30 days
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <DeleteModal
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onSubmit={() => handleDelete()}
            />
            <EditModal
                thread={currentThread}
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onSubmit={(title) => handleEdite(title)}
            />
        </Drawer>
    );
}

export default ChatHistory;
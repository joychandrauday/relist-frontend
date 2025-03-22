"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { getMessage, sendMessage } from "@/services/message";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners"; // Importing the spinner

const MessageButton = ({ sellerId, sellerName, sellerAvatar }: { sellerId: string; sellerName: string; sellerAvatar: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; sender: string; senderID: string; receiverID: string; timestamp: string }[]>([]);
    const [message, setMessage] = useState("");
    const [loadingMessages, setLoadingMessages] = useState(false); // Loading state for messages
    const [sendingMessage, setSendingMessage] = useState(false); // Loading state for sending message
    const { data: session } = useSession();
    const currentUserId = session?.user?.id; // Current logged-in user ID
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen || !currentUserId || !sellerId) return;

        async function fetchMessages() {
            setLoadingMessages(true); // Set loading true when fetching messages
            try {
                const { data } = await getMessage(currentUserId, sellerId);
                console.log("Fetched messages:", data);
                const formattedMessages = data.map((msg: {
                    senderID: { _id: string, name: string };
                    receiverID: { _id: string };
                    message: string;
                    createdAt: string;
                }) => ({
                    text: msg.message || "No message text available",
                    sender: msg.senderID.name,
                    senderID: msg.senderID._id,
                    receiverID: msg.receiverID._id,
                    timestamp: new Date(msg.createdAt).toLocaleString(), // Format timestamp
                }));

                setMessages(formattedMessages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setLoadingMessages(false); // Set loading false when done fetching
            }
        }

        fetchMessages();
    }, [isOpen, sellerId, currentUserId]);

    const handleSendMessage = async () => {
        if (!message.trim() || !currentUserId || !sellerId) return;

        // Prepare the new message object
        const newMessage = {
            text: message,
            sender: "You",
            senderID: currentUserId,
            receiverID: sellerId,
            timestamp: new Date().toLocaleString(),
        };

        // Append the new message to the end of the message list
        setMessages((prevMessages) => [newMessage, ...prevMessages]);

        setMessage("");
        setSendingMessage(true); // Set loading true when sending message

        const messageBody = {
            senderID: currentUserId,
            receiverID: sellerId,
            message: message,
        };

        try {
            const data = await sendMessage(messageBody);
            console.log("Message sent:", data);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setSendingMessage(false); // Set loading false when done sending
        }
    };

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); // Trigger scroll when messages array changes

    return (
        <>
            <span
                onClick={() => setIsOpen(true)}
            >
                <Image
                    src={'/chat.gif'}
                    alt={'message text'}
                    width={52}
                    height={52}
                    className="hover:scale-105 cursor-pointer"
                />
            </span>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-lg p-6 z-50 rounded-xl shadow-xl">
                    {session ? (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-center flex flex-col items-center">
                                    <Image
                                        src={sellerAvatar}
                                        alt={sellerName}
                                        width={80}
                                        height={80}
                                        className="rounded-full border-2 border-gray-300 shadow-md"
                                    />
                                    <span className="mt-3 text-lg font-semibold">{sellerName}</span>
                                </DialogTitle>
                            </DialogHeader>

                            {/* Chat Area */}
                            <ScrollArea className="h-72 border rounded-lg p-4 bg-gray-100 space-y-2">
                                {loadingMessages ? ( // Show loading spinner when fetching messages
                                    <div className="flex justify-center">
                                        <ClipLoader color="#4B5563" size={40} />
                                    </div>
                                ) : messages.length === 0 ? (
                                    <p className="text-gray-500 text-center">Start a conversation...</p>
                                ) : (
                                    [...messages].reverse().map((msg, index) => (  // Reverse the messages array only for display
                                        <div
                                            key={index}
                                            className={`flex ${msg.receiverID === currentUserId ? "justify-start" : "justify-end"}`}
                                        >
                                            <div
                                                className={`px-4 py-2 rounded-lg text-sm mt-2 shadow-md ${msg.receiverID === currentUserId
                                                    ? "bg-gray-300 text-gray-900"
                                                    : "bg-blue-500 text-white"
                                                    }`}
                                            >
                                                <p>{msg.text}</p>
                                                <div className="text-xs text-gray-400">{msg.timestamp}</div> {/* Show timestamp */}
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </ScrollArea>


                            {/* Message Input */}
                            <div className="mt-3">
                                <Textarea
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="border rounded-lg p-2"
                                />
                            </div>

                            <DialogFooter className="mt-2">
                                <Button onClick={handleSendMessage} disabled={!message.trim() || sendingMessage} className="w-full">
                                    {sendingMessage ? ( // Show loading spinner when sending message
                                        <ClipLoader color="white" size={20} />
                                    ) : (
                                        "Send Message"
                                    )}
                                </Button>
                            </DialogFooter>
                        </>
                    ) : (
                        <p className="text-center">Please sign in to chat with this seller.</p>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MessageButton;

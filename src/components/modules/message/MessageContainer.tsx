'use client'
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Image as ImageIcon, XCircle } from "lucide-react";
import { getMessage, getSingleSidebarUser, sendMessage } from "@/services/message";
import { IUser } from "@/types/user";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import Image from "next/image";

// Cloudinary upload function
const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append('upload_preset', 'product_images');
    formData.append('cloud_name', 'dklikxmpm');

    const res = await fetch("https://api.cloudinary.com/v1_1/dklikxmpm/upload", {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    if (res.ok) {
        return data.secure_url;
    } else {
        throw new Error('Failed to upload image to Cloudinary');
    }
};

const MessageContainer = ({ id }: { id: string }) => {
    const { data: session } = useSession();
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [messages, setMessages] = useState<{ text: string; sender: string; senderID: string; receiverID: string; timestamp: string; image?: string }[]>([]);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [sendingMessage, setSendingMessage] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        async function fetchSingleUser() {
            try {
                const { data } = await getSingleSidebarUser(id);
                setSelectedUser(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }
        fetchSingleUser();
    }, [id]);

    useEffect(() => {
        async function fetchMessages() {
            setLoadingMessages(true);
            try {
                const { data } = await getMessage(session?.user?.id, id);
                const formattedMessages = data.map((msg: { senderID: { _id: string, name: string }; receiverID: { _id: string }; message: string; createdAt: string; image?: string }) => ({
                    text: msg.message || "No message text available",
                    sender: msg.senderID.name,
                    senderID: msg.senderID._id,
                    receiverID: msg.receiverID._id,
                    timestamp: new Date(msg.createdAt).toLocaleString(),
                    image: msg.image || null
                }));
                setMessages(formattedMessages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setLoadingMessages(false);
            }
        }
        fetchMessages();
    }, [session?.user?.id, id]);

    const handleSendMessage = async () => {
        setSendingMessage(true)
        if (!newMessage.trim() && !image) return;

        // Create the message object with the necessary properties
        const newMsg = {
            text: newMessage,
            sender: "You",
            senderID: session?.user?.id ?? "",
            receiverID: id,
            timestamp: new Date().toLocaleString(),
            image: image ? await uploadImageToCloudinary(image) : '' // Upload image if present
        };

        // Add the new message to the state
        setMessages((prevMessages) => [...prevMessages, newMsg]);
        setNewMessage("");
        setImage(null);
        setImagePreview(null);
        setSendingMessage(true);

        // Prepare the message data for sending (as JSON, no FormData)
        const messageData = {
            senderID: session?.user?.id ?? "",
            receiverID: id,
            message: newMessage,
            image: newMsg.image || ''
        };

        // Now send the message via the service function (no FormData)
        try {
            const data = await sendMessage(messageData);
            console.log("Message sent:", data);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setSendingMessage(false);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCancelImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="min-h-screen w-full flex flex-col bg-gray-900 text-white border rounded-lg shadow-lg">
            <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center p-4 border-b bg-gray-800">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={selectedUser?.avatar || '/avatar.png'} />
                        <AvatarFallback>{selectedUser?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                        <p className="font-medium text-xl">{selectedUser?.name}</p>
                        <p className="text-sm text-gray-400">Last active 10 min ago</p>
                    </div>
                </div>
                <ScrollArea className="h-[75vh] border rounded-lg p-4 space-y-2">
                    {loadingMessages ? (
                        <div className="flex justify-center">
                            <ClipLoader color="#4B5563" size={40} />
                        </div>
                    ) : messages.length === 0 ? (
                        <p className="text-gray-500 text-xl text-center">Start a conversation...</p>
                    ) : (
                        [...messages].map((msg, index) => (
                            <div key={index} className={`flex ${msg.receiverID === session?.user?.id ? "justify-start" : "justify-end"}`}>
                                <div className={`px-4 py-2 rounded-lg text-sm mt-2 shadow-md ${msg.receiverID === session?.user?.id ? "bg-gray-300 text-gray-900" : "bg-[#1F2937] text-white"}`}>
                                    {msg.text && <p>{msg.text}</p>}
                                    {msg.image && <Image width={200} height={200} src={msg.image} alt="Sent" className="max-w-xs mt-2 rounded-lg" />}
                                    <div className="text-xs text-gray-400">{msg.timestamp}</div>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </ScrollArea>
                <div className="flex items-center p-4 border-t bg-gray-800 w-full">
                    <label className="cursor-pointer">
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        <ImageIcon size={24} className="text-gray-400 hover:text-white mr-2" />
                    </label>
                    <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                    />
                    {imagePreview && (
                        <div className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Image Preview:</p>
                                <Image width={200} height={200} src={imagePreview} alt="Preview" className="max-w-xs rounded-lg" />
                            </div>
                            <Button className="text-red-500" onClick={handleCancelImage}>
                                <XCircle size={24} />
                            </Button>
                        </div>
                    )}
                    <Button className="ml-2 bg-[#fb8600] hover:bg-blue-700" onClick={handleSendMessage} disabled={sendingMessage}>
                        {sendingMessage ? <ClipLoader color="white" size={20} /> : <Send size={20} color="white" />}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MessageContainer;

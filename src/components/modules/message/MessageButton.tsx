"use client";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const MessageButton = ({ sellerId, sellerName, sellerAvatar }: { sellerId: string; sellerName: string; sellerAvatar: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim() === "") return;

        setMessages([...messages, { text: message, sender: "You" }]);
        setMessage("");

        // TODO: Send the message to backend via API (implement API integration here)
    };

    return (
        <>
            {/* Message Button */}
            <Button
                variant="ghost"
                className="p-2 rounded-full hover:bg-gray-200"
                onClick={() => setIsOpen(true)}
            >
                <MessageCircle className="w-12 h-12 text-gray-600 hover:text-gray-800" />
            </Button>

            {/* Message Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen} >
                <DialogContent className="max-w-lg p-6 bg-white z-50 rounded-xl shadow-xl">
                    <DialogHeader>
                        <DialogTitle className="text-center flex flex-col items-center">
                            {/* Seller Avatar (Big) */}
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
                        {messages.length === 0 ? (
                            <p className="text-gray-500 text-center">Start a conversation...</p>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                                    <span className={`px-4 py-2 rounded-lg ${msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-900"}`}>
                                        {msg.text}
                                    </span>
                                </div>
                            ))
                        )}
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
                        <Button onClick={handleSendMessage} disabled={!message.trim()} className="w-full">
                            Send Message
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MessageButton;

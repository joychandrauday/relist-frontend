import React from "react";
import { MessageSquare } from "lucide-react";

const MessageLandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
            {/* Icon */}
            <MessageSquare size={50} className="text-blue-500 dark:text-blue-400 mb-4 animate-bounce" />

            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Start Sending Messages
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 dark:text-gray-300 mt-2">
                Connect with seller, user and start chatting instantly.
            </p>
        </div>
    );
};

export default MessageLandingPage;
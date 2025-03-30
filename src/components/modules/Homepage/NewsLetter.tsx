/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const Newsletter = () => {
    const session = useSession()
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    console.log(session.data?.user, isSubscribed);
    useEffect(() => {
        if (session.data?.user?.email) {
            setEmail(session.data?.user.email);
        }
    }, []);

    useEffect(() => {
        const fetchSubscription = async () => {
            if (!email) return;
            try {
                const response = await fetch(`https://relist-backend.vercel.app/api/v1/newsletter/${email}`);
                const data = await response.json();
                if (data.success) {
                    setIsSubscribed(true);
                }
            } catch (error) {
                console.error("Error fetching subscription data:", error);
            }
        };
        fetchSubscription();
    }, [email]);
    const handleSubscribe = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://relist-backend.vercel.app/api/v1/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            });
            console.log(response, 'helooooooo');
            if (response.ok) {
                toast.success("Subscribed successfully!");
                setEmail("");
            } else if (response.status === 400) {
                toast.error("You are already subscribed!");
            } else {
                toast.error("Subscription failed! Try again.");
            }
        } catch (error) {
            console.error("Error subscribing:", error);
            toast.error("Something went wrong! Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <section
            className="relative w-full py-16 px-6 md:px-12 flex items-center justify-center text-center bg-cover bg-no-repeat bg-center-right"
            style={{
                backgroundImage: "url(https://res.cloudinary.com/dklikxmpm/image/upload/v1742801684/pngtree-digital-retailing-illustration-laptop-keyboard-with-shopping-basket-and-e-commerce-image_3903657_xndiji.jpg)"
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            <div className="relative max-w-2xl mx-auto text-white space-y-6">
                {/* 🔹 Title */}
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Join Our Newsletter 🎉
                </h2>
                <p className="text-gray-300 text-sm md:text-base">
                    Get exclusive deals, latest product updates & exciting discounts delivered straight to your inbox!
                </p>

                {/* 🔹 Newsletter Form */}
                <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col md:flex-row items-center justify-between  gap-4 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-lg p-4 w-full max-w-lg mx-auto"
                >
                    <div className="flex items-center w-full md:w-auto bg-white/20 px-3 py-2 rounded-lg">
                        <Mail className="text-gray-300 text-lg" />
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 bg-transparent text-white placeholder-gray-300 border-none focus:ring-0 px-2"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isSubscribed}

                        
                        className="bg-[#FB8500] text-white px-6 py-3 text-sm md:text-base font-semibold rounded-lg hover:scale-105 transition duration-300 w-full md:w-auto hover:text-black"
                    >
                        {loading ? 'subscribing...' : isSubscribed ? "Subscribed" : "Subscribe Now"}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;

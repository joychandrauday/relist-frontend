/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiCurrencyBangladeshi } from "react-icons/hi";
import MessageButton from "../modules/message/MessageButton";

type Testimonial = {
    _id: string;
    title: string;
    price: string;
    description: string;
    images: string[];
    userID: {
        _id: string;
        name: string;
        email: string;
        avatar: string;
    };
    condition: string;
    createdAt: string;
    updatedAt: string;
};

export const AnimatedTestimonials = ({
    testimonials = [],
    autoplay = false,
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const isActive = (index: number) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay && !isHovering) {
            const interval = setInterval(handleNext, 3000);
            return () => clearInterval(interval);
        }
    }, [autoplay, handleNext, isHovering]);

    const randomRotateY = () => {
        return Math.floor(Math.random() * 21) - 10;
    };

    return (
        <div
            className="max-w-sm md:max-w-5xl mx-auto antialiased font-sans px-4 md:px-8 bg-transparent z-40"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="relative grid grid-cols-1 md:grid-cols-2 md:gap-20 z-40">
                <div>
                    <div className="relative h-80 w-full z-40">
                        <AnimatePresence>
                            {testimonials?.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial._id}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: -100,
                                        rotate: randomRotateY(),
                                    }}
                                    animate={{
                                        opacity: isActive(index) ? 1 : 0.7,
                                        scale: isActive(index) ? 1 : 0.95,
                                        z: isActive(index) ? 0 : -100,
                                        rotate: isActive(index) ? 0 : randomRotateY(),
                                        zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                                        y: isActive(index) ? [0, -80, 0] : 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: 100,
                                        rotate: randomRotateY(),
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 origin-bottom z-40"
                                >
                                    <Image
                                        src={testimonial.images[0]}
                                        alt={testimonial.title}
                                        width={500}
                                        height={500}
                                        draggable={false}
                                        className="h-full w-full rounded-3xl object-cover object-center z-40"
                                    />

                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex justify-between flex-col py-4">
                    <motion.div
                        key={active}
                        initial={{
                            y: 20,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -20,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <h3 className="text-2xl font-bold  text-white">
                            {testimonials[active]?.title.slice(0, 20)}...
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-neutral-500">
                            {testimonials[active]?.description.slice(0, 200)}
                        </p>
                        <motion.p className="text-lg text-gray-500 mt-5 dark:text-neutral-300 flex items-center gap-2">
                            <HiCurrencyBangladeshi /> {testimonials[active].price}
                        </motion.p>

                        <motion.p className="text-sm text-gray-500 dark:text-neutral-400">
                            Condition: {testimonials[active].condition}
                        </motion.p>

                        <div className="flex items-center mt-4">
                            <Image
                                src={testimonials[active].userID.avatar}
                                alt={testimonials[active].userID.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <p className="ml-3 text-sm text-gray-500 dark:text-neutral-400">
                                {testimonials[active].userID.name}
                            </p>
                        </div>

                        {/* View Product and Message Seller Buttons */}
                        <div className="flex gap-4 mt-6">
                            <Link href={`/products/${testimonials[active]._id}`}>
                                <button
                                    className="bg-[#FB8500] text-white py-2 px-4 rounded-none hover:bg-blue-400 transition-all"
                                >
                                    View Product
                                </button>
                            </Link>
                            <MessageButton sellerId={testimonials[active].userID._id} sellerName={testimonials[active].userID.name} sellerAvatar={testimonials[active].userID.avatar} />
                        </div>
                    </motion.div>

                    <div className="flex gap-4 ">
                        <button
                            onClick={handlePrev}
                            className="h-7 w-7 rounded-full bg-[#FB8500]  flex items-center justify-center group/button"
                        >
                            <IconArrowLeft className="h-5 w-5 text-black  group-hover/button:rotate-12 transition-transform duration-300" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="h-7 w-7 rounded-full bg-[#FB8500] flex items-center justify-center group/button"
                        >
                            <IconArrowRight className="h-5 w-5 text-black group-hover/button:-rotate-12 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div >
        </div >
    );
};

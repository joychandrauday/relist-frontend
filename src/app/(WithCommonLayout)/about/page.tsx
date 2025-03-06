"use client";

import React from "react";
import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { ShinyButton } from "@/components/magicui/shiny-button";
import Link from "next/link";

const About: React.FC = () => {
    return (
        <section className="pt-8 lg:py-24 w-[95%] mx-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="md:w-1/2 md:pl-12 text-center md:text-right">
                        <h1 className="text-4xl font-extrabold text-white mb-6">
                            About Me
                        </h1>
                        <p className="mb-4 text-lg ">
                            Hello, I&apos;m <span className="text-yellow-400">Joy Chandra Uday</span>. I am a passionate web developer with
                            a deep love for building scalable and efficient applications using
                            the <span className="text-blue-400">MERN stack</span>.
                        </p>
                        <p className="mb-4 text-lg ">
                            I specialize in building dynamic and responsive web applications.
                            My goal is to transform ideas into reality through code.
                        </p>
                        <p className="text-lg ">
                            With a solid foundation in JavaScript and extensive experience
                            with MongoDB, Express, React, and Node.js, I am dedicated to
                            delivering high-quality and user-friendly applications.
                        </p>

                        <div className="flex flex-wrap gap-4 items-center py-6 justify-center lg:justify-start">
                            <a
                                href="https://github.com/joychandrauday"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ShinyButton>
                                    <div className="flex items-center gap-2">
                                        <FaGithub className="text-lg" /> Github
                                    </div>
                                </ShinyButton>
                            </a>
                            <a
                                href="https://linkedin.com/in/joychandrauday"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ShinyButton>
                                    <div className="flex items-center gap-2">
                                        <FaLinkedin className="text-lg" /> Linkedin
                                    </div>
                                </ShinyButton>
                            </a>
                            <Link
                                href="https://facebook.com/joychandraudayy"
                                target="_blank">
                                <ShinyButton>
                                    <div className="flex items-center gap-2">
                                        <FaFacebook className="text-lg" /> Facebook
                                    </div>
                                </ShinyButton>
                            </Link>
                            <Link
                                href="https://facebook.com/joychandraudayy"
                                target="_blank">
                                <ShinyButton>
                                    <div className="flex items-center gap-2">
                                        <FaFacebook className="text-lg" /> Facebook
                                    </div>
                                </ShinyButton>
                            </Link>
                            <Link
                                href="/joychandraudayRESUMEd.pdf"
                                target="_blank">
                                <ShinyButton>
                                    <div className="flex items-center gap-2">
                                        <IoDocumentText className="text-lg" /> Resume
                                    </div>
                                </ShinyButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

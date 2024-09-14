import React from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import background from '../assets/background.mp4'

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div className="relative w-full h-screen overflow-hidden text-white">
            <video
                autoPlay
                muted
                loop
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={background} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        className="text-5xl font-extrabold leading-tight sm:text-6xl"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        Transform Your Discord Experience
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-lg sm:text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        Discover the ultimate bot for managing, automating, and enhancing your Discord server like never before.
                    </motion.p>
                    <motion.div
                        className="mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        <Button
                            onClick={handleGetStarted}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
                        >
                            Get Started
                        </Button>
                    </motion.div>
                </div>
            </div>

            <section className="py-16 bg-gray-800">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center">
                        <motion.h2
                            className="text-3xl font-bold text-white mb-6"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            Features
                        </motion.h2>
                        <div className="flex flex-wrap justify-center gap-8">
                            <motion.div
                                className="w-full md:w-1/3 bg-gray-700 p-6 rounded-lg shadow-lg"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
                                <p className="text-gray-300">Highlight some key feature of your bot here. Explain how it benefits users.</p>
                            </motion.div>
                            <motion.div
                                className="w-full md:w-1/3 bg-gray-700 p-6 rounded-lg shadow-lg"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h3 className="text-xl font-semibold mb-2">Feature 2</h3>
                                <p className="text-gray-300">Another key feature with a brief description to capture interest.</p>
                            </motion.div>
                            <motion.div
                                className="w-full md:w-1/3 bg-gray-700 p-6 rounded-lg shadow-lg"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <h3 className="text-xl font-semibold mb-2">Feature 3</h3>
                                <p className="text-gray-300">A third feature to showcase your bot's capabilities. Keep it engaging.</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

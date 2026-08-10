"use client"
import Image from "next/image"
import logo from "../../images/icon_light.png"

const Footer = () => {
    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }
                `}
            </style>

            <footer className='flex flex-col justify-end bg-gray-200 dark:bg-gray-900 shadow-2xl pt-10 px-4 sm:px-6 lg:px-8 overflow-hidden w-full'>
                <div className='w-full max-w-7xl mx-auto'>
                    <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">

                        <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-start text-left">
                            <Image
                                src={logo}
                                alt="Logo"
                                width={157}
                                height={40}
                            />
                            <div className='w-full max-w-52 h-0.5 mt-8 bg-linear-to-r from-[#24212D] to-[#24212D]/0'></div>
                            <p className='text-sm text-black dark:text-white mt-6 max-w-[350px] leading-relaxed'>PrebuiltUI is a growing collection of beautifully designed, production-ready Tailwind CSS UI components.</p>
                        </div>

                        <div className="w-[45%] md:w-[45%] lg:w-[15%] flex flex-col items-start text-left">
                            <h3 className='text-2 text-black dark:text-white font-bold leading-5'>Important Links</h3>
                            <div className="flex flex-col gap-2 mt-6">
                                <a href="#" className='text-sm text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 transition-colors'>Home</a>
                                <a href="#" className='text-sm text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 transition-colors'>About</a>
                                <a href="#" className='text-sm text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 transition-colors'>Portfolio</a>
                                <a href="#" className='text-sm text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 transition-colors'>Contact</a>
                                <a href="#" className='text-sm text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 transition-colors'>FAQ</a>
                            </div>
                        </div>

                        <div className="w-[45%] md:w-[45%] lg:w-[15%] flex flex-col items-start text-left">
                            <h3 className='text-2 text-black dark:text-white font-bold leading-5'>Social Links</h3>
                            <div className="flex flex-col gap-2 mt-6">
                                <a href="#" className='text-sm text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 transition-colors'>Twitter</a>
                                <a href="#" className='text-sm text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 transition-colors'>Instagram</a>
                                <a href="#" className='text-sm text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 transition-colors'>Youtube</a>
                                <a href="#" className='text-sm text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 transition-colors'>TikTok</a>
                            </div>
                        </div>

                    </div>

                    <div className='w-full h-0.5 mt-4 mb-4 bg-linear-to-r from-[#24212D]/0 via-[#24212D] to-[#24212D]/0'></div>

                    <div className=" sm:flex-row items-center justify-between relative z-10">
                        <p className='text-xs text-center text-black dark:text-white '>© {new Date().getFullYear()} FLASH SHOE. All rights reserved.</p>
                    </div>

                    <div className="w-full lg:hidden flex justify-center mt-6 md:mt-12 md:mb-[-0.5%]">
                        <h1 className="text-center font-extrabold tracking-tighter text-nowrap leading-[0.70] text-zinc-600 dark:text-zinc-600 text-7xl pointer-events-none select-none">
                            FLASH SHOE
                        </h1>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
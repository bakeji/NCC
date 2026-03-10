'use client'
import { useState } from 'react'
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from 'lucide-react'

export default function Header(){
    const [isOpen, setIsOpen] = useState(false)
    
    const navs = [
        {name:'Home', link:'/'},
        {name:'About Us', link:'/aboutUs'},
        {name:'Listen', link:'/listen'},
        {name:'Connect', link:'/connect'},
        {name:'Resources', link:'/resources'},
    ]

    const pathName = usePathname()

    const toggleMenu = () =>{
         setIsOpen (prev => !prev)
         console.log(isOpen)
        }

    return(
        <header className="flex px-10 py-5 justify-between items-center">
            
            <div>
                <Image src='/Logo.png' width={37} height={37} alt="logo" />
            </div>

            {/* Desktop Navigation */}
            <nav className="max-md:hidden">
                <ul className="flex items-center gap-8  max-lg:gap-4">
                    {navs.map((nav, id)=>(
                    <li key={id}>
                        <a className={`hover:text-[#02066F] heading-primary ${pathName === nav.link ? 'text-[#02066F]' : pathName==='/listen'? 'text-[#1E1E1ECC]': 'text-white'}`} href={nav.link}>{nav.name}</a>
                    </li>
                    ))}
                </ul>
            </nav>

            {/* Desktop Contact Button */}
            <button className={`max-md:hidden py-2.5 max-lg:py-1.5 px-3 rounded-lg cursor-pointer heading-primary ${pathName==='/listen'?'bg-[#02066F] text-white': 'bg-white text-black hover:bg-[#02066F] hover:text-white'}`}>
                Contact Us
            </button>

            {/* Mobile Menu Toggle */}

            <button
                onClick={toggleMenu}
                className=" p-2 md:hidden rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
            >
                 {isOpen ? (
                    <X className={`w-6 h-6 ${pathName==='/listen'? 'text-[#1E1E1ECC]': 'text-white'}`} />
                ) : (
                    <Menu className={`w-6 h-6 ${pathName==='/listen'? 'text-[#1E1E1ECC]': 'text-white'}`} />
                )} 
            </button>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={toggleMenu}
            />

            {/* Mobile Slide-out Navigation */}
            <nav
                className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-6">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                        <Image src='/Logo.png' width={37} height={37} alt="logo" />
                        <button onClick={toggleMenu} className="p-2">
                            <X className="w-6 h-6 text-slate-700" />
                        </button>
                    </div>

                    {/* Mobile Navigation Items */}
                    <ul className="mt-6 space-y-1">
                        {navs.map((nav, id) => (
                            <li key={id}>
                                <a
                                    href={nav.link}
                                    className={`block px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors heading-primary ${
                                        pathName === nav.link ? 'text-[#02066F] bg-slate-50' : 'text-slate-700'
                                    }`}
                                    onClick={toggleMenu}
                                >
                                    {nav.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Contact Button */}
                    <div className="mt-8">
                        <button className="w-full py-2.5 px-3 rounded-lg cursor-pointer heading-primary bg-[#02066F] text-white hover:bg-[#01054d] transition-colors">
                            Contact Us
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}
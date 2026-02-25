'use client'
import Image from "next/image"
import { usePathname } from "next/navigation"
export default function Header(){
    const navs = [
        {name:'Home', link:'/'},
        {name:'About Us', link:'/aboutUs'},
        {name:'Listen', link:'/listen'},
        {name:'Connect', link:'/connect'},
        {name:'Resources', link:'/resources'},

    ]

    const pathName = usePathname() 

    return(
        <header className="flex px-10 py-5  justify-between items-center" >
            <div>
                <Image src='/Logo.png' width={37} height={37} alt="logo" />
            </div>

            <nav>
                <ul className="flex items-center gap-8  ">
                    {navs.map((nav, id)=>(
                        
                    <li key={id}>
                        <a className={`  hover:text-[#02066F] heading-primary ${pathName === nav.link ? 'text-[#02066F]'  :pathName==='/listen'? 'text-[#1E1E1ECC]': 'text-white'  }`}  href={nav.link}>{nav.name}</a></li>
                    ))}
                </ul>
            </nav>
            <button className={` py-2.5 px-3 rounded-lg  cursor-pointer heading-primary ${pathName==='/listen'?'bg-[#02066F] text-white': 'bg-white text-black  hover:bg-[#02066F] hover:text-white ' } `} >Contact Us</button>

        </header>

    )
}
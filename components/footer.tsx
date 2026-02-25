import Image from "next/image"
export default function Footer(){

       const quickLinks = [
        {name:'Home', link:'/'},
        {name:'About Us', link:'/aboutUs'},
        {name:'Listen', link:'/listen'},
        {name:'Connect', link:'/connect'},
        {name:'Resources', link:'/resources'},
    ]
       
    return(
        <footer className="bg-[#02066F] p-10 text-white flex flex-col gap-8 " >
            <div className="flex justify-between">
                <div className="w-[33%] flex flex-col gap-3 ">
                    <div className="">
                        <Image  width={274} height={57}  src="/home/logo1.png" alt="logo" />
                    </div>
                    <p className="heading-primary " >Making disciples of all nations through worship, community, and service to God.</p>
                    <div className="flex flex-col gap-2 " >
                        <div className="flex items-center gap-2" >
                            <Image width={24} height={24} src="/home/location.png" alt="location" />
                            <p className='heading-primary' > 67/69, Oyemekun streeet, Ogba, Lagos State </p>
                        </div>

                        <div className="flex items-center gap-2" >
                            <Image width={24} height={24} src="/home/phone.png" alt="phone" />
                            <p className='heading-primary'> +234 123 456 7890 </p>
                        </div>

                        <div className="flex items-center gap-2" >
                            <Image width={24} height={24} src="/home/mail.png" alt="mail" />
                            <p className='heading-primary'>info@newcovenantng.org</p>
                        </div>
                    </div>
               </div>

                <div className="flex flex-col gap-3  ">
                    <h1 className="font-family-figtree font-bold text-[20px]" >Quick Links</h1>
                    <ul className="flex flex-col gap-3" >
                        {quickLinks.map((link, id)=>(
                        <li className="heading-primary" key={id}><a href={link.link}>{link.name} </a></li>
                        ))} 
                    </ul>

                </div>


                <div className="flex flex-col gap-3 " >
                    <h1  className="font-family-figtree font-bold text-[20px]"  >Follow Us</h1>
                    <div className="flex gap-3">
                        <a href="#">  <Image width={46} height={46} src="/home/fb.png" alt="facebook" /></a>
                        <a href="#">   <Image width={46} height={46} src="/home/instagram.png" alt="instagram" /> </a>
                        <a href="#">   <Image width={46} height={46} src="/home/yt.png" alt="youtube" /> </a>
                    </div>
                    <p className="font-normal font-family-figtree text-[14px]  ">Stay connected with our community and never miss an update.</p>
                </div>

            </div>
            <hr />
            <small className="font-normal text-[14px] font-family-figtree " >© 2025 New Covenant Church, Ifako. All rights reserved.</small>
        </footer>
    )
}
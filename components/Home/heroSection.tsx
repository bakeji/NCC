'use client'
export default function HeroSection(){
    
return(
    <div className="flex flex-col items-center gap-3 justify-center p-30  max-lg:p-25   max-md:p-10  " >
        <h1 className="hero-font text-white text-center w-[60%] max-lg:w-full max-md:text-[35px]!  " >Making Disciples of All Nations</h1>
        <p className="font-primary  text-white text-center w-[60%] max-lg:w-[90%] max-md:text-[20px]!   " >Join us in worship, grow in community, and experience God’s presence in a deeper way.</p>
        <div className="flex items-center justify-center mt-5 gap-5 max-md:flex-col w-full ">
            <button onClick={()=>console.log('clicked!') } className="py-2.5 px-4.5 rounded-[20px] hover:bg-white hover:text-[#02066F] text-white heading-primary bg-[#E90000] cursor-pointer max-md:w-full " >Watch Live</button>
            <button className="py-2.5 px-4.5 rounded-[20px]  text-[#02066F] bg-white heading-primary cursor-pointer hover:bg-[#E90000]  hover:text-white max-md:w-full " >Our Location</button>
        </div>
    </div>
)
}
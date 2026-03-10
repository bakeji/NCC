import Image from "next/image"
export default function HeroSection(){
    return(
        <section className="py-10 pl-10 flex max-md:p-5 gap-4 justify-center   max-md:flex-col    " >
            <div>
                <h1 className="hero-font gap-5 w-full max-lg:text-6xl! max-lg:mt-8  max-md:text-4xl!  " >Messages from The New Covenant Church</h1>
            </div>
            <div className="relative w-full h-148 max-lg:h-100 max-md:h-100 " >
                <Image src='/listen/img1.png' fill className="object-fill " alt="hero image" />
            </div>
        </section>
    )
}
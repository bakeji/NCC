import Image from "next/image"
export default function HeroSection(){
    return(
        <section className="py-10 pl-10 flex    " >
            <div>
                <h1 className="hero-font gap-5 w-[75%] " >Messages from The New Covenant Church</h1>
            </div>
            <div className="relative w-full  ">
                <Image src='/listen/img1.png' fill className="object-fill " alt="hero image" />
            </div>
        </section>
    )
}
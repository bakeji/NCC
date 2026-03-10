import Foundation from "@/components/aboutUs/foundation";
import HeroSection from "@/components/aboutUs/herosection";
import Leadership from "@/components/aboutUs/leadership";
import MakingDisciples from "@/components/aboutUs/makingdisciples";
import Verse from "@/components/aboutUs/verse";
import Vision from "@/components/aboutUs/vision";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Subscribe from "@/components/Home/subscribe";

export default function AboutUs(){
    return(
        <div>
            <div className="bg-no-repeat bg-cover  min-h-screen " style={{backgroundImage: "url('/aboutus/bg-about.png')"}} >
                <Header />
                <div className=" flex justify-center w-full h-screen items-center " >
                        <HeroSection />
                </div>
            </div>
            <div className="bg-[#1E1E1E] p-10" >
                <p className="text-[#FFFFFF80] font-family-figtree text-2xl max-md:text-xl font-medium " >Established in 1985</p>
                <p className="text-white font-heading max-md:text-2xl! " >Rooted in our love for God, the church, our city, and the nations.</p>
            </div>
            <MakingDisciples />
            <Vision />
            <Verse />
            <Foundation />
            <Leadership />
            <Subscribe  />
            <Footer />
        </div>
    )
}
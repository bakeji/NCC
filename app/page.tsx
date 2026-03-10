import Footer from "@/components/footer";
import Header from "@/components/header";
import Connect from "@/components/Home/connect";
import Events from "@/components/Home/events";
import HeroSection from "@/components/Home/heroSection";
import LatestMessage from "@/components/Home/latestMessage";
import Media from "@/components/Home/media";
import Service from "@/components/Home/service";
import Subscribe from "@/components/Home/subscribe";
import WhoWeAre from "@/components/Home/whoWeAre";


export default function Home() {
  return (
    <div>
      <div className="bg-no-repeat bg-cover   min-h-screen " style={{backgroundImage: "url('/home/bg.png')" }} >
        <Header />
       <div className=" flex justify-center w-full h-screen items-center " >
         <HeroSection />
       </div>
      </div>
      <Service/>
      <LatestMessage />
      <Events />
      <Connect />
      <WhoWeAre />
      <Media />
      <Subscribe />
      <Footer />
    </div>
  );
}

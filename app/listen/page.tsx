import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroSection from "@/components/Listen/herosection";
import Sermons from "@/components/Listen/sermons";
import TeachTheWord from "@/components/Listen/teach";

export default function Listen(){
    return(
        <section>
            <Header />
            <HeroSection />
            <TeachTheWord />
            <Sermons />
            <Footer />
        </section>
    )
}
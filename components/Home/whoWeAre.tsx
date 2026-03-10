import Image from "next/image"
export default function WhoWeAre(){
    return(
        <section className="p-10 flex items-start justify-between gap-10 max-md:p-5 max-lg:flex-col-reverse " >
            <div className="w-[45%] max-lg:w-full max-lg:flex-col-reverse max-lg:flex "> 
               <div className="mt-20 max-lg:mt-15  " >
                    <h1 className="font-heading max-md:text-2xl!" >Who We Are</h1>
                    <p className="font-secondary mt-6 max-md:text-[12px]! " > The New Covenant Church started in October 1985 with the first worship venue at the Women Training Centre, Samonda, in Ibadan, Nigeria. In 1986, the first centre in the United Kingdom started at Elephant and Castle, London. We presently have over 500 branches of the Church in Africa, Europe, America, Middle East and Asia. Over 400 of the branches are located in Nigeria.</p>   
               </div>
               <div className="mt-28 flex flex-col max-lg:mt-3">
                    <p className=" font-family-figtree font-normal text-4xl max-md:text-3xl!  italic " >Rev & Mrs Paul Jinadu</p>
                    <h1 className="font-heading max-md:text-2xl! " >General Overseer</h1>
               </div>
            </div>
            <div className="relative w-[50%] h-168.5 max-lg:w-full ">
                <Image fill className="object-fill object-center " 
                 src="/home/GO.png" alt="Rev & Mrs Jinadu" />
            </div>
        </section>
    )
}
import Image from "next/image"

export default function Leadership(){
    const LeadershipData = [
        {id:1, name: "Reverend Paul Jinadu", position: "General Overseer", img: "/aboutus/rev-paul.png"},
        {id:2, name: "Reverend Abimbola Oladipo", position: "National Overseer", img: "/aboutus/rev-b.png"},
        {id:3, name: "Reverend Paul Jinadu", position: "General Overseer", img: "/aboutus/rev-paul.png"},
        {id:4, name: "Reverend Abimbola Oladipo", position: "National Overseer", img: "/aboutus/rev-b.png"},
        {id:5, name: "Reverend Paul Jinadu", position: "General Overseer", img: "/aboutus/rev-paul.png"},
        {id:6, name: "Reverend Abimbola Oladipo", position: "National Overseer", img: "/aboutus/rev-b.png"},
    ]
    return(
        <section className="p-10 bg-black " >
            <div className="flex flex-col gap-2  mt-8 ">
                <h1 className="text-white font-heading text-center  " >Leadership Structure</h1>
                <p className="font-secondary text-[#FFFFFFCC] text-center " >Join us for gatherings that bring our church family together.</p>
            </div>

            <div className="grid grid-cols-3 mt-10 gap-7" >
                {LeadershipData.map((leader)=>(
                <div key={leader.id} className="bg-[#1E1E1E] rounded-xl ">
                    <div className="relative w-full h-93  ">
                        <Image src={leader.img} alt="Leadership Image" fill className="object-center object-fill" />
                    </div>

                    <div className="flex flex-col gap-1 p-5 " >
                        <p className="text-white font-heading-secondary ">{leader.name}</p>
                        <p className="text-[#FFDD55] font-normal text-[14px] font-family-figtree">{leader.position}</p>
                
                    </div>

             
             </div>
                ))}
            </div>
        </section>
    )
}
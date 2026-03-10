import Image from "next/image"
export default function Service(){
const services =[
    { icon:'/home/time.png', type: 'Sunday Service', desc: 'Join us for inspiring worship and powerful message.', time:'9am'},
    { icon:'/home/calendar.png', type: 'Bible Study', desc: 'Deepen your faith with our Bible study  every Tuesday.', time:'6pm'},
    { icon:'/home/calendar.png', type: 'Prayer Meeting', desc: 'Deepen your faith with our prayer session every Thursday.', time:'6pm'},
    
    
]

    return(
        <section className="flex flex-col justify-center items-center p-10 gap-8 max-md:p-5  " >
            <div className="flex flex-col items-center justify-center gap-3 text-center" >
                <h2 className="font-heading " >Our Service Times</h2>
                <p className="text-[#1E1E1ECC] font-secondary " >Come as you are there’s a place for you here, to worship, connect, and be renewed.</p>
            </div>

            <div className="flex items-center  justify-center p-10 gap-8 max-lg:flex-col max-lg:w-full max-md:p-3 " >
             {services.map((service, id)=>(
                <div key={id} className="w-[30%] border border-[#E8E8E8] flex flex-col gap-4  p-8 items-center text-center rounded-xl  max-lg:w-[90%] max-md:w-full hover:shadow-lg " > 
                    <div>
                        <Image src={service.icon} width={46} height={46} alt="icon"   />
                    </div>
                    <h5 className="font-family-figtree font-semibold text-[20px] " >{service.type} </h5>
                    <p className="font-family-figtree text-[#1E1E1ECC] text-[14px] " >{service.desc} </p>
                    <h5 className="font-family-figtree font-semibold text-[20px] " >{service.time} </h5>
                </div>
                ))}
                
            </div>
        </section>
    )
}
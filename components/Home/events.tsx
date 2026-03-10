import Image from "next/image"
export default function Events(){
    const events = [
        {id:1,img:'/home/conf.png', program:'Word Conference', date:'October 27, 2025', desc:'A global gathering of believers to worship, learn, and be empowered.'},
        {id:2,img:'/home/conf.png', program:'Word Conference', date:'October 27, 2025', desc:'A global gathering of believers to worship, learn, and be empowered.'},
        {id:3,img:'/home/conf.png', program:'Word Conference', date:'October 27, 2025', desc:'A global gathering of believers to worship, learn, and be empowered.'},
        {id:4,img:'/home/conf.png', program:'Word Conference', date:'October 27, 2025', desc:'A global gathering of believers to worship, learn, and be empowered.'},
        {id:5, img:'/home/conf.png', program:'Word Conference', date:'October 27, 2025', desc:'A global gathering of believers to worship, learn, and be empowered.'},
        {id:6, img:'/home/conf.png', program:'Word Conference', date:'October 27, 2025', desc:'A global gathering of believers to worship, learn, and be empowered.'},

    ]

    return(
        <div className="bg-black p-10 pb-20 max-md:px-3  " >
            <div className="flex flex-col gap-4 text-white items-center justify-center text-center mb-10 " >
                <h1 className="font-heading max-md:text-2xl! " >Upcoming Events</h1>
                <p className="font-secondary max-md:text-[14px]! " >Join us for gatherings that bring our church family together.</p>
            </div>
            <div className=" grid grid-cols-3  mx-auto items-center gap-5  w-[95%] max-lg:grid-cols-2 max-md:grid-cols-1  " >
                {events.map((event)=>(
                <div key={event.id} className=" rounded-xl bg-[#1E1E1E] " >
                    <div className="w-full h-54 relative ">
                        <Image src={event.img} alt={event.program} fill className=" object-fill object-center" />
                    </div>

                  <div className="p-5 flex flex-col gap-2 ">
                      <h3 className='font-heading-secondary text-white max-md:text-[15px]!' >{event.program} </h3>
                    <p className="font-family-figtree font-normal text-[14px] text-[#FFDD55] max-md:text-[12px] " >{event.date} </p>
                    <p className="font-family-figtree font-normal text-[14px] text-white max-md:text-[12px] " >{event.desc} </p>
                  </div>
                </div>
                ))}
            </div>


           <div className="flex items-center justify-center mt-8 " >
             <button className="text-white py-2.5 px-[6]  border-white border-[0.5px] rounded-lg heading-primary max-md:w-[90%] " >Learn More</button>
           </div>
        </div>
    )
}
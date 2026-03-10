import Image from "next/image"
export default function Sermons(){
    const sermons = [
        { id:1, img: '/listen/img1.png', title: 'Walking in faith: a life of purpose', },
        { id:2, img: '/listen/img1.png', title: 'Walking in faith: a life of purpose', },
        { id:3, img: '/listen/img1.png', title: 'Walking in faith: a life of purpose', },
        { id:4, img: '/listen/img1.png', title: 'Walking in faith: a life of purpose', },
        { id:7, img: '/listen/img1.png', title: 'Walking in faith: a life of purpose', },
        { id:5, img: '/listen/img1.png', title: 'Walking in faith: a life of purpose', },
        { id:6, img: '/listen/img1.png', title: 'Walking in faith: a life of purpose', },
        { id:8, img: '/listen/img1.png', title: 'Walking in faith: a life of purpose', },
        { id:9, img: '/listen/img1.png', title: 'Walking in faith: a life of purpose', },
        { id:10, img: '/listen/img1.png', title: 'Walking in faith: a life of purpose', },
        { id:11, img: '/listen/img1.png', title: 'Walking in faith: a life of purpose', },
        { id:12, img: '/listen/img1.png', title: 'Walking in faith: a life of purpose', },

    ]

    const pagnation =[1,2,3,4,5,6,7,8,9,10]


    return(
        <section className="p-10 max-md:p-5 " >
            <div className=" grid grid-cols-3 gap-10  max-lg:grid-cols-2 max-md:grid-cols-1 " >
                    {sermons.map((sermon)=>(
                <div key={sermon.id} >

                    <div className="relative h-132 w-full ">
                        <Image src={sermon.img} fill className="object-fill object-center"  alt="sermon image" />

                    </div>
                    <div className="pt-4 ">
                        <p className=" font-family-figtree font-semibold text-[26px] " >{sermon.title}</p>
                        <button className="bg-[#02066F] w-full text-white px-4 py-2 rounded-md mt-2">Listen Now</button>
                    </div>
                        
                </div>
                ))}
            </div>

            {/* <div>
                    {pagnation.map((page, id)=>(
                <button key={id}>{page}</button>
            ))}
            </div> */}
          
        </section>
    )
}
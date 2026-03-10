import Image from "next/image"
export default function Connect(){
    const waysToConnect =[
        {id:1, icon:'/home/visitor.png', type:'First Time Visitor?', desc: 'Learn more about what to expect on your first visit'},
        {id:2, icon:'/home/group.png', type:'Join a Small Group', desc: 'Connect with others and grow your faith together'},
        {id:3, icon:'/home/volunteer.png', type:'Volunteer With Us', desc: 'Use your gifts to serve and make a difference'},
        {id:4, icon:'/home/prayer.png', type:'Request Prayer', desc: 'Submit a prayer request and our team will pray for you'},
    ]
    return(
        <section className=" bg-[#FAFAFA] p-10 max-md:p-3 " >
            <div className='flex flex-col items-center justify-center gap-3 text-center ' >
                <h1 className="font-heading max-md:text-2xl! " >Connect With Us</h1>
                <p className="font-secondary text-[#1E1E1ECC] max-md:text-[14px]! " >Whether it’s your first time or you’ve been with us for years, we’re here for you.</p>
            </div>

            <div className="flex mt-12 items-center justify-between p-4 max-lg:flex-col max-lg:w-full max-lg:justify-center max-lg:gap-4   " >
                {waysToConnect.map((connect)=>(
                <div className="w-[23%] border-[#E8E8E8] gap-4 text-center border rounded-xl bg-white p-8  flex flex-col items-center justify-center max-lg:w-[70%] max-md:w-full  "  key={connect.id}>
                    <img src={connect.icon} alt="icons" width={46} height={46} />
                    <h1 className="font-heading-secondary" >{connect.type} </h1>
                    <p className="text-[#1E1E1ECC] font-family-figtree font-normal" >{connect.desc} </p>
                </div>
                ))}
            </div>
        </section>
    )
}
import Image from "next/image"
export default function LatestMessage(){
    return(
        <div className="bg-[#FAFAFA] py-10 flex items-center flex-col ">
            <div className="flex flex-col gap-2 text-center" >
                <h1 className="font-heading" >Latest Message</h1>
                <p className="font-secondary" >Catch up on this week’s sermon and be encouraged in your walk with Christ.</p>
            </div>

            <div className="mt-12 flex gap-8 items-center ">
                <div>
                      <Image src='/home/preaching.png' width={488} height={298} alt="video" />
                </div>

                <div className="flex flex-col gap-3 ">
                    <h2 className=" font-family-figtree text-[26px] font-semibold ">Walking in Faith: A Life of Purpose</h2>
                    <p className="font-secondary text-[#1E1E1ECC] " >Speaker: Rev Dr. Paul Jinadu</p>
                    <p className="font-secondary text-[#1E1E1ECC] " >Date: October 12, 2025</p>
                    <div className="flex gap-4 " >
                        <button className=" bg-[#02066F] text-white py-2.5 px-3 rounded-lg cursor-pointer " >Watch Now</button>
                        <button className=" border-[#02066F] border-[0.5px]  py-2.5 px-3 rounded-lg cursor-pointer "  >Download</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
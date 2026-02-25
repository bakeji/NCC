import Image from "next/image"
export default function Vision(){
    return(
        <section className="p-10 bg-[#FAFAFA] " >
            <div className="flex justify-center items-center gap-10 ">
                <div className="relative h-130  w-[46%]" >
                    <Image src='/aboutus/img4.png' alt="vision" fill className="object-fill object-center " />
                </div>

                <div className="w-[46%] flex flex-col gap-5 ">
                    <h1 className="font-heading" >Vision Statement</h1>
                    <p className="text-[#1E1E1ECC] font-secondary  " >Our vision is to make disciples of all nations by raising Christ-centered people who know God deeply, live out His truth daily, and reflect His love in every place they go. We believe discipleship is not just about belief, but about transformation of hearts, lives, communities, and generations.</p> 
                    <p className="text-[#1E1E1ECC] font-secondary " >We are committed to sharing the Gospel in its fullness, nurturing spiritual growth, and equipping believers to live purposeful lives rooted in faith, obedience, and love. Through teaching, community, and service, we seek to build strong disciples who follow Christ authentically and influence the world positively.</p>
                </div>

                
            </div>

              <div className="flex justify-center items-center gap-10 flex-row-reverse mt-10 ">
                <div className="relative h-130  w-[46%]" >
                    <Image src='/aboutus/img5.png' alt="vision" fill className="object-fill object-center " />
                </div>

                <div className="w-[46%] flex flex-col gap-5 ">
                    <h1 className="font-heading" >Vision Statement</h1>
                    <p className="text-[#1E1E1ECC] font-secondary  " >Our vision is to make disciples of all nations by raising Christ-centered people who know God deeply, live out His truth daily, and reflect His love in every place they go. We believe discipleship is not just about belief, but about transformation of hearts, lives, communities, and generations.</p> 
                    <p className="text-[#1E1E1ECC] font-secondary " >We are committed to sharing the Gospel in its fullness, nurturing spiritual growth, and equipping believers to live purposeful lives rooted in faith, obedience, and love. Through teaching, community, and service, we seek to build strong disciples who follow Christ authentically and influence the world positively.</p>
                </div>

                
            </div>

        </section>
    )
}
import Image from "next/image"
export default function Media(){
    const members= [
        {id:1, img: '/home/member1.png'},
        {id:2, img: '/home/member2.png'},
        {id:3, img: '/home/member3.png'},
        {id:4, img: '/home/member4.png'},
        {id:5, img: '/home/member5.png'},
        {id:6, img: '/home/member6.png'},
    ]
    return(
        <div className="p-10">
            <div className="flex flex-col gap-3 ">
                <div className="flex items-center gap-2 text-center " >
                    <h1 className="font-heading" >Follow Us On Social Media</h1>
                    <div className="flex items-center mt-2 " >
                        <a href="#"> <img src="/home/ig.png" alt="instagram" /></a>
                        <a href="#"> <img src="/home/facebook.png" alt="facebook" /> </a>
                        <a href="#"> <img src="/home/youtube.png" alt="youtube" /> </a>
                    </div>
                </div>
                <p>Get daily inspiration, messages of hope, and church updates right where you are.</p>
            </div>

            <div className="grid grid-cols-3 gap-5 mt-8 " >
                {members.map((member)=>(
                <div className=" w-full h-102 relative object-center " key={member.id} >
                      <Image fill className="object-fill" src={member.img} alt="members" />
                </div>
                ))}

             
                

            </div>
        </div>
    )
}
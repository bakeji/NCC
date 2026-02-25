export default function Subscribe(){
    return(
    <section className="bg-[#FAFAFA] p-15 flex flex-col items-center justify-center gap-5 text-center ">
        <div>
            <h1 className="font-heading " >Stay Connected</h1>
            <p className="mt-2 text-[#1E1E1ECC] font-secondary  ">Get weekly devotionals and church updates delivered to your inbox</p>
        </div>
        <form action="#" className="flex gap-2 items-center justify-center " >
            <input className="py-2.5 px-5 border-[#C9C9C9] border-[0.5px] rounded-[0.5px] outline-none " placeholder="Enter your email address" type="email" name="email" id="email" />
            <button className="bg-[#02066F] cursor-pointer rounded-lg font-secondary py-2.5 px-5 text-white " >Subscribe</button>
        </form>
    </section>
    )
} 
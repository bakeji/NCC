'use client'
import Image from "next/image"
import { useRef, useState } from "react"

export default function MakingDisciples(){
    const ImageCarousel = [
        {id:1, img: '/aboutus/img1.png'},
        {id:2, img: '/aboutus/img2.png'},
        {id:3, img: '/aboutus/img3.png'},
        {id:4, img: '/aboutus/img1.png'},
        {id:5, img: '/aboutus/img2.png'},
        {id:6, img: '/aboutus/img3.png'},
    ]
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return

    const { clientWidth } = scrollRef.current

    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    })
  }
    return(
        <section className=" flex flex-col gap-8  " >
            <div className="text-center p-10 flex flex-col gap-4" >
                <h1 className="font-heading" >Making Disciples of All Nations</h1>
                <p className="text-[#1E1E1ECC] font-secondary " >Raising believers to follow Christ, live out His word, and impact the world.</p>
            </div>

            
<div className="relative h-screen w-full overflow-hidden">
      
      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex  h-full overflow-x-scroll scrollbar-hide gap-4  scroll-smooth snap-x snap-mandatory no-scrollbar"
      >
        {ImageCarousel.map((src) => (
          <div
            key={src.id}
            className="relative h-full min-w-[80%] md:min-w-[50%] lg:min-w-[30%] snap-center"
          >
            <Image
              src={src.img}
              alt={`Slide ${src.id}`}
              fill
              className="object-contain "
            />

        
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white px-5 py-3 rounded-full hover:bg-white/40 transition"
      >
        ❮
      </button>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white px-5 py-3 rounded-full hover:bg-white/40 transition"
      >
        ❯
      </button>
    </div>

        </section>
    )
}          
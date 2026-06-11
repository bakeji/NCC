'use client'
import { useState } from 'react'

export default function HeroSection(){
    const [showNotLiveModal, setShowNotLiveModal] = useState(false)
    const [showLocationMap, setShowLocationMap] = useState(false)
    
    const YOUTUBE_HANDLE = "@nccifakochurch"
    
    const CHURCH_LOCATION = {
        name: "New Covenant Church, Ifako",
        address: "67, 69 Oyemekun St, Ifako Agege, Lagos 101232, Lagos",
        lat: 6.637279958259014, 
        lng: 3.3312183100214847
    }

    const isWithinServiceHours = () => {
        const now = new Date()
        const lagosTime = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Lagos" }))
        
        const day = lagosTime.getDay()
        const hours = lagosTime.getHours()
        const minutes = lagosTime.getMinutes()
        const totalMinutes = hours * 60 + minutes

        // Sunday 9:00 AM – 12:00 PM (540 – 720 mins)
        if (day === 0 && totalMinutes >= 540 && totalMinutes < 720) return true

        // Tuesday 6:00 PM – 9:00 PM (1080 – 1260 mins)
        if (day === 2 && totalMinutes >= 1080 && totalMinutes < 1260) return true

        return false
    }
    
    const handleWatchLive = () => {
        if (isWithinServiceHours()) {
            window.open(`https://www.youtube.com/${YOUTUBE_HANDLE}/live`, "_blank")
        } else {
            setShowNotLiveModal(true)
        }
    }
    
    return(
        <>
            <div className="flex flex-col items-center gap-3 justify-center p-30 max-lg:p-25 max-md:p-10">
                <h1 className="hero-font text-white text-center w-[60%] max-lg:w-full max-md:text-[35px]!">
                    Making Disciples of All Nations
                </h1>
                <p className="font-primary text-white text-center w-[60%] max-lg:w-[90%] max-md:text-[20px]!">
                    Join us in worship, grow in community, and experience God's presence in a deeper way.
                </p>
                <div className="flex items-center justify-center mt-5 gap-5 max-md:flex-col w-full">
                    <button 
                        onClick={handleWatchLive}
                        className="py-2.5 px-4.5 rounded-[20px] hover:bg-white hover:text-[#02066F] text-white heading-primary bg-[#E90000] cursor-pointer max-md:w-full"
                    >
                        Watch Live
                    </button>
                    <button 
                        onClick={() => setShowLocationMap(true)}
                        className="py-2.5 px-4.5 rounded-[20px] text-[#02066F] bg-white heading-primary cursor-pointer hover:bg-[#E90000] hover:text-white max-md:w-full"
                    >
                        Our Location
                    </button>
                </div>
            </div>

            {/* Not Live Modal */}
            {showNotLiveModal && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowNotLiveModal(false)}
                >
                    <div 
                        className="bg-white rounded-lg p-8 max-w-md w-full text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-6xl mb-4">📺</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            We're Not Live Right Now
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Join us for our live services on Sundays at 9:00 AM, 
                            and Tuesdays at 6:00 PM.
                        </p>
                        <button
                            onClick={() => setShowNotLiveModal(false)}
                            className="py-2.5 px-6 rounded-[20px] bg-[#E90000] text-white hover:bg-[#02066F] cursor-pointer"
                        >
                            Got It
                        </button>
                    </div>
                </div>
            )}

            {/* Location Map Modal */}
            {showLocationMap && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowLocationMap(false)}
                >
                    <div 
                        className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            <button
                                onClick={() => setShowLocationMap(false)}
                                className="absolute top-4 right-4 z-10 bg-white text-gray-800 hover:bg-red-500 hover:text-white w-10 h-10 rounded-full shadow-lg font-bold text-xl"
                            >
                                ✕
                            </button>
                            
                            {/* Map */}
                            <div className="w-full h-60">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://maps.google.com/maps?q=${CHURCH_LOCATION.lat},${CHURCH_LOCATION.lng}&z=15&output=embed`}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            
                            {/* Location Info */}
                            <div className="p-6 bg-white">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    📍 {CHURCH_LOCATION.name}
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl">🏠</span>
                                        <p className="text-gray-700">{CHURCH_LOCATION.address}</p>
                                    </div>
                                </div>
                                
                                {/* Service Times */}
                                <div className="mt-3 bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-bold text-gray-800 mb-2">⏰ Service Times</h4>
                                    <p className="text-gray-700 mb-1">📅 Sundays: 9:00 AM</p>
                                    <p className="text-gray-700">📅 Tuesdays: 6:00 PM</p>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex gap-3 mt-6 flex-wrap">
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${CHURCH_LOCATION.lat},${CHURCH_LOCATION.lng}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 min-w-50 py-3 px-6 bg-[#E90000] text-white rounded-[20px] text-center hover:bg-[#02066F] transition-all font-semibold"
                                    >
                                        Get Directions
                                    </a>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${CHURCH_LOCATION.lat},${CHURCH_LOCATION.lng}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 min-w-50 py-3 px-6 bg-white text-[#02066F] border-2 border-[#02066F] rounded-[20px] text-center hover:bg-[#02066F] hover:text-white transition-all font-semibold"
                                    >
                                        View on Google Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
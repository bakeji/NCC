'use client'
import { useState } from 'react'

export default function HeroSection(){
    const [showLiveStream, setShowLiveStream] = useState(false)
    const [showNotLiveModal, setShowNotLiveModal] = useState(false)
    const [showLocationMap, setShowLocationMap] = useState(false)
    const [isChecking, setIsChecking] = useState(false)
    
    // Replace with your YouTube channel ID or handle
    const YOUTUBE_CHANNEL_ID = "UCg41wl17eU-iwVZyZeNaWng"
    const YOUTUBE_HANDLE = "@ayodejinicholas5812"
    
    // Your church location - UPDATE THESE VALUES
    const CHURCH_LOCATION = {
        name: "New Covenant Church, Ifako",
        address: "67, 69 Oyemekun St, Ifako Agege, Lagos 101232, Lagos",
        lat: 6.637279958259014, 
        lng: 3.3312183100214847
        // phone: "(123) 456-7890", // Optional
        // email: "info@nccifako.com" // Optional
    }
    
    const checkIfLive = async () => {
        setIsChecking(true)
        
        try {
            const response = await fetch(`https://www.youtube.com/${YOUTUBE_HANDLE}/live`, {
                method: 'HEAD',
                mode: 'no-cors'
            })
            
            setShowLiveStream(true)
            
        } catch (error) {
            console.error('Error checking live status:', error)
            setShowNotLiveModal(true)
        } finally {
            setIsChecking(false)
        }
    }
    
    const handleWatchLive = () => {
        checkIfLive()
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
                        disabled={isChecking}
                        className="py-2.5 px-4.5 rounded-[20px] hover:bg-white hover:text-[#02066F] text-white heading-primary bg-[#E90000] cursor-pointer max-md:w-full disabled:opacity-50"
                    >
                        {isChecking ? 'Checking...' : 'Watch Live'}
                    </button>
                    <button 
                        onClick={() => setShowLocationMap(true)}
                        className="py-2.5 px-4.5 rounded-[20px] text-[#02066F] bg-white heading-primary cursor-pointer hover:bg-[#E90000] hover:text-white max-md:w-full"
                    >
                        Our Location
                    </button>
                </div>
            </div>

            {/* Live Stream Modal */}
            {showLiveStream && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowLiveStream(false)}
                >
                    <div 
                        className="relative w-full max-w-4xl aspect-video"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowLiveStream(false)}
                            className="absolute -top-10 right-0 text-white text-2xl hover:text-red-500 font-bold"
                        >
                            ✕ Close
                        </button>
                        <iframe
                            className="w-full h-full rounded-lg"
                            src={`https://www.youtube.com/embed/${YOUTUBE_HANDLE}/live?autoplay=1`}
                            title="Live Stream"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        <p className="text-white text-center mt-2 text-sm">
                            we're not currently live. Check back during service times!
                        </p>
                    </div>
                </div>
            )}

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
                            Join us for our live services on Sundays at 9:00 AM and 11:00 AM, 
                            and Wednesdays at 7:00 PM.
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
                            <div className="w-full h-80">
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
                                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-bold text-gray-800 mb-2">⏰ Service Times</h4>
                                    <p className="text-gray-700 mb-1">📅 Sundays: 9:00 AM & 11:00 AM</p>
                                    <p className="text-gray-700">📅 Wednesdays: 7:00 PM</p>
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
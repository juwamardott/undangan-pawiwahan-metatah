import React, { useEffect } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import AOS from "aos"
import "aos/dist/aos.css"

export default function Maps() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })
  }, [])

  const handleOpenMaps = () => {
    window.open(
      'https://www.google.com/maps/place/Jl.+Arjuna+No.62,+Baluk,+Kec.+Negara,+Kabupaten+Jembrana,+Bali+82218/@-8.3586092,114.5796876,17z',
      '_blank'
    )
  }

  return (
    <div
      className="
        w-full mx-auto max-w-md
        bg-[url('/bg.png')]
        bg-cover bg-center bg-no-repeat 
        py-10 bellefair
      "
      data-aos="fade-up"
    >
      <div
        className="rounded-3xl w-[90%] mx-auto p-3 shadow-xl bg-secondary"
        data-aos="zoom-in"
      >

        {/* Header */}
        <div
          className="flex items-center gap-3 mb-4"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <div className="bg-accent p-3 rounded-xl">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Lokasi Acara</h2>
            <p className="text-gray-600 text-sm">
              Jl. Arjuna No.62, Baluk, Negara, Jembrana, Bali
            </p>
          </div>
        </div>

        {/* Map Container */}
        <div
          className="rounded-2xl overflow-hidden shadow-lg mb-4 border-4 border-white"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4440.866510588814!2d114.5796876!3d-8.3586092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd161ce3ba0baf5%3A0xacebbf82d04cc737!2sJl.%20Arjuna%20No.62%2C%20Baluk%2C%20Kec.%20Negara%2C%20Kabupaten%20Jembrana%2C%20Bali%2082218!5e1!3m2!1sid!2sid!4v1764508607038!5m2!1sid!2sid"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Button */}
        <button
          data-aos="fade-up"
          data-aos-delay="400"
          onClick={handleOpenMaps}
          className="
            w-full bg-darkAccent text-white font-semibold
            py-4 px-6 rounded-xl shadow-lg hover:shadow-xl 
            transition-all duration-300 flex items-center 
            justify-center gap-3 group
          "
        >
          <Navigation
            className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
          />
          <span>Buka di Google Maps</span>
        </button>
      </div>
    </div>
  )
}

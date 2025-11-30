import React, { useEffect, useState, useRef } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import { MailOpen } from "lucide-react";

export default function Hero() {
  const audioRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);


  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nama = params.get("nama");

    if (nama) {
      setGuestName(nama.replace(/-/g, " "));
    }
  }, []);

  

  useEffect(() => {

    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Lock scroll pada tampilan pertama
    setIsOpen(false);
    document.body.style.overflow = "hidden";

    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    document.body.style.overflow = "auto";

    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(err => {
        console.log("Audio gagal diputar otomatis:", err);
      });
    }

    setTimeout(() => {
      AOS.refreshHard();
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }, 300);
  };

  return (
    <div
      className="
        max-w-md h-screen mx-auto 
        bg-[url('/bg.png')]
        bg-cover bg-center bg-no-repeat
        flex justify-center items-center
        relative
        alex
        overflow-hidden
      "
      data-aos="fade-in"
    >

    <audio ref={audioRef} src="/jadi-debu.mp3" preload="auto" hidden></audio>


      {/* ORNAMEN 9 */}
      <div
        className="absolute bottom-12 -right-16 z-9999"
        data-aos="fade-up"
        data-aos-delay="250"
        data-aos-anchor-placement="center-bottom"
      >
        <img src="/9.png" alt="foto" className="w-50" />
      </div>

      {/* ORNAMEN 8 */}
      <div
        className="absolute bottom-11 -left-20 z-9999"
        data-aos="fade-up"
        data-aos-delay="250"
        data-aos-anchor-placement="center-bottom"
      >
        <img src="/8.png" alt="foto" className="w-50" />
      </div>


      {/* ORNAMEN 10 */}
      <div className="absolute -top-12 -left-30 z-9999" data-aos="fade-down" data-aos-delay="150">
        <img src="/10.png" alt="foto" className="w-78" />
      </div>

      {/* ORNAMEN 11 */}
      <div className="absolute top-8 -right-3 -rotate-10 z-9999" data-aos="fade-down" data-aos-delay="250">
        <img src="/11.png" alt="foto" className="w-36" />
      </div>

      {/* CARD UTAMA */}
      <div 
        className="w-[90%] h-[600px] rounded-t-full bg-secondary shadow-2xl text-darkAccent mb-3"
        data-aos="zoom-in"
      >
        {/* Judul */}
        <h1 className="alex text-3xl text-center mt-12" data-aos="zoom-in" data-aos-delay="200">
          Undangan
        </h1>

        <h1 
          className="marcellus text-center text-base mt-2 uppercase tracking-[2px]" 
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          Pawiwahan & Metatah
        </h1>

        {/* Nama Mempelai */}
        <div className="mt-5 mx-auto text-center">
          <h1 className="text-4xl" data-aos="zoom-in" data-aos-delay="400">
            Suka Wirajaya
          </h1>

          <img 
            src="/cincin.png" 
            className="w-12 mx-auto" 
            data-aos="zoom-in"
            data-aos-delay="500"
          />

          <h1 className="text-4xl" data-aos="zoom-in" data-aos-delay="600">
            Komang Santini
          </h1>
        </div>

        <div 
          className="w-[80%] bg-accent h-[3px] rounded-2xl mx-auto mt-4" 
          data-aos="zoom-in"
          data-aos-delay="300"
        ></div>

        {/* Tanggal */}
        <div 
          className="mx-auto w-[90%] relative poiret flex justify-center items-center uppercase"
          data-aos="zoom-in" 
          data-aos-delay="400"
        >
          <div className="absolute left-16 top-1/2 -translate-y-1/2 text-base">Senin</div>
          <h1 className="text-4xl font-bold">29</h1>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 text-base">Desember</div>
        </div>

        <div className="w-[80%] bg-accent h-[3px] rounded-2xl mx-auto"></div>

        {/* Nama Tamu */}
        <div 
          className="mx-auto w-[90%] mt-1 marcellus text-center"
          data-aos="zoom-in" 
          data-aos-delay="500"
        >
          <h1 className="text-lg">Kepada Yth. Bapak/Ibu/Saudara/i</h1>
        </div>

        <div 
          className="mx-auto w-[70%] mt-1 border py-2 rounded-3xl flex justify-center items-center" 
          data-aos="zoom-in"
          data-aos-delay="600"
        >
         <h1 className="text-center marcellus text-lg px-2">
          {guestName || "[Nama Tamu Undangan]"}
        </h1>

        </div>
      </div>

      {/* TOMBOL BUKA UNDANGAN */}
      {!isOpen && (
        <button
          onClick={handleOpenInvitation}
          className="
            absolute left-1/2 -translate-x-1/2 
            bottom-48
            px-5 py-2
            bg-accent backdrop-blur-sm 
            text-white rounded-xl shadow-lg 
            text-base font-bold border border-white/50
            flex items-center gap-2
            hover:bg-white transition
            z-9999
            marcellus
            mx-auto
          "
          data-aos="flip-left"
          data-aos-delay="700"
        >
          <MailOpen className="w-5 h-5" />
          Buka Undangan
        </button>
      )}

    </div>
  )
}

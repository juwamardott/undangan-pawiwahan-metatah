import React, { useEffect, useRef } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";

export default function Date() {

    const sectionRef = useRef(null);

  useEffect(() => {
    // Inisialisasi AOS (hapus once:true)
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: false
    });

    // Observer untuk memantau munculnya elemen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Trigger ulang animasi
            AOS.refreshHard();
          }
        });
      },
      { threshold: 0.2 } // Ketika 20% area elemen terlihat
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div  ref={sectionRef} className="max-w-md h-screen mx-auto bg-[url('/bg.png')]
        bg-cover bg-center bg-no-repeat
        flex justify-center items-center
        relative overflow-hidden">

        {/* Bunga kiri */}
        <div className='absolute -top-10 rotate-30 -left-12 z-9999' data-aos="fade-down-right">
          <img src='/bunga1.png' className='w-68'/>
        </div>

        {/* Bunga kanan atas */}
        <div className='absolute top-5 right-2 z-9999' data-aos="fade-left ">
          <img src='/bunga.png' className='w-22'/>
        </div>

        <div className='absolute top-10 right-25 z-9999' data-aos="fade-left" data-aos-delay="200">
          <img src='/bunga.png' className='w-15'/>
        </div>

        {/* Bunga bawah */}
        <div className='absolute bottom-7 left-2 z-9999' data-aos="fade-up-right">
          <img src='/bunga.png' className='w-22'/>
        </div>

        {/* Card utama */}
        <div className='w-[90%] h-[700px] bg-secondary rounded-3xl flex justify-center items-center bellefair text-darkAccent'
             data-aos="zoom-in">

               <div className='w-[90%] mx-auto h-[650px] rounded-3xl border border-primary2' data-aos="fade-up">

                <h1 className='text-center mt-20 w-[96%]' data-aos="fade-up">
                  Merupakan suatu kehormatan bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir.
                </h1>

                <h2 className='text-center mt-2 text-2xl' data-aos="fade-up" data-aos-delay="150">15 : 00 - Selesai</h2>

                <img src="/hiasan.png" className='w-60 mx-auto' data-aos="zoom-in" data-aos-delay="200"/>

                {/* Tanggal */}
                <div 
                  className="mx-auto w-[90%] relative flex justify-center items-center uppercase mt-2 py-2"
                  data-aos="fade-up"
                >
                    <div className="absolute left-9 top-1/2 -translate-y-1/2 text-base">Senin</div>
                    <img src="/hiasan.png" className='w-20 left-5 top-11 mx-auto absolute'/>
                    <h1 className="text-5xl font-bold">29</h1>
                    <img src="/hiasan.png" className='w-25 left-22 top-13 mx-auto absolute'/>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-base">Desember</div>
                    <img src="/hiasan.png" className='w-20 right-6 top-11 mx-auto absolute'/>
                </div>

                <h1 className='text-center text-2xl' data-aos="fade-up">2025</h1>

                <h3 className='text-center mx-auto w-[80%] font-bold mt-2 leading-5' data-aos="fade-up">
                  Jl. Arjuna No. 62, Banjar Anyar, Desa Baluk.
                </h3>

                <h4 className='text-center mt-3 mx-auto w-[90%]' data-aos="fade-up" data-aos-delay="100">
                  Atas Kehadiran dan doa restu.
                </h4>

                <h1 className='great tex text-2xl text-center mt-7' data-aos="fade-up">Om Santhi, Santhi, Santhi Om</h1>

                <h2 className='text-center mt-8' data-aos="fade-up">Kami yang berbahagia</h2>

                <div className='flex justify-around items-center' data-aos="fade-up" data-aos-delay="150">
                  <div className='text-center'>
                    <h1 className='underline'>I Nyoman Seka</h1>
                    <h1>Sekeluarga</h1>
                  </div>
                  <div className='text-center'>
                    <h1 className='underline'>I Nengah Sujana</h1>
                    <h1>Sekeluarga</h1>
                  </div>
                </div>

               </div>
        </div>
    </div>
  )
}

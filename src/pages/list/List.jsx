import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function List() {

  const sectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // supaya AOS bisa muncul lagi ketika kembali ke halaman ini
      easing: "ease-out",
    });

    // Observer untuk trigger ketika user scroll kembali ke section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            AOS.refreshHard(); 
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="max-w-md h-screen mx-auto bg-[url('/bg.png')]
        bg-cover bg-center bg-no-repeat
        flex justify-center items-center
        relative alex overflow-hidden"
      data-aos="fade-in"
    >

      {/* 9 */}
      <div className='absolute z-99999 -top-5 -right-3' data-aos="fade-down" data-aos-delay="100">
        <img src='/12.png' alt='foto' className='w-52' />
      </div>

      <div className='absolute z-99999 -top-5 -left-3 transform scale-x-[-1]' data-aos="fade-down" data-aos-delay="150">
        <img src='/12.png' alt='foto' className='w-52' />
      </div>

      <div className='absolute z-99999 bottom-0 right-0 transform scale-y-[-1]' data-aos="fade-up" data-aos-delay="200">
        <img src='/12.png' alt='foto' className='w-52' />
      </div>

      <div className='absolute z-99999 bottom-0 rotate-180 left-0' data-aos="fade-up" data-aos-delay="250">
        <img src='/12.png' alt='foto' className='w-52' />
      </div>

      <div className=" bg-secondary w-[90%] rounded-2xl mx-auto p-1" data-aos="zoom-in">
        <img src='/border.png' className='w-96 mx-auto' />
      </div>

      <div
        className='absolute left-1/2 -translate-x-1/2 top-40 w-[70%] text-center text-accent'
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <h1 className='bellefair text-lg text-darkAccent'>
          Serta Upacara Metatah (Potong Gigi) putra-putri kami.
        </h1>

        <div
          className="rounded-xl p-2 space-y-3 border text-darkAccent mt-2 border-primary2"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {[
            "Putu Ari Handayani",
            "Ni Luh Gede Ika Ari Koriasih",
            "I Putu Gede Arya Mardiasa",
            "Made Ngurah Ari Suputra",
            "Kadek Ayu Dwi Setya Andini",
            "Ayu Pitaloka Arini",
            "Ni Putu Ayu Purnama Dewi"
          ].map((name, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-[18px]"
              data-aos="fade-right"
              data-aos-delays="250"
            >
              <img src='/star.png' className='w-5' />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

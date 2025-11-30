import React, { useEffect, useRef } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";

export default function Information() {

  const sectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // penting agar animasi bisa muncul lagi
      easing: "ease-out",
    });

    // Observer trigger ulang animasi ketika elemen masuk viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            AOS.refreshHard(); // 
          }
        });
      },
      { threshold: 0.2 } // 20% elemen terlihat → trigger
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
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

      {/* ORNAMEN ATAS */}
      <div
        className='absolute -top-6 rotate-5 -right-25 z-9999'
        data-aos="fade-down"
        data-aos-delay="200"
        data-aos-anchor-placement="center-bottom"
      >
        <img src='/information-1.png' alt='foto' className='w-56' />
      </div>

      {/* ORNAMEN BAWAH */}
      <div
        className='absolute bottom-5 rotate-180 -left-20 z-9999'
        data-aos="fade-up"
        data-aos-delay="250"
        data-aos-anchor-placement="center-bottom"
      >
        <img src='/information-1.png' alt='foto' className='w-62' />
      </div>

      {/* BORDER KARTU */}
      <div
        className="bg-secondary w-[90%] rounded-2xl mx-auto p-1"
        data-aos="zoom-in"
      >
        <img src='/border.png' className='w-96 mx-auto' />
      </div>

      {/* ISI TEXT */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-15 w-[77%] text-center text-accent"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <h1 className='text-5xl nautigal-regular mb-4'>Om Swastyastu</h1>

        <span className='bellefair text-sm' data-aos="fade-up" data-aos-delay="400">
          Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa, kami bermaksud mengundang
          Bapak/ Ibu/ Saudara/ i pada Upacara Manusa Yadnya Pawiwahan (Pernikahan) putra-putri kami.
        </span>

        {/* MEMPELAI PRIA */}
        <div className='mt-4' data-aos="fade-up" data-aos-delay="500">
          <h1 className='great text-2xl mb-0'>I Kadek Suka Wirajaya</h1>
          <img src='/hiasan.png' className='mt-0 mx-auto' />
          <h2 className='bellefair w-[70%] mx-auto mt-0'>
            Putra dari pasangan I Nyoman Seka dan Sayu Putu Wintang
          </h2>
          <h2 className='bellefair'>Br. Anyar, Desa Baluk, Kec. Negara</h2>
        </div>

        <h1
          className='great text-4xl text-center mt-1'
          data-aos="zoom-in"
          data-aos-delay="550"
        >
          &
        </h1>

        {/* MEMPELAI WANITA */}
        <div className='mt-1' data-aos="fade-up" data-aos-delay="600">
          <h1 className='great text-2xl mb-0'>Ni Komang Santini</h1>
          <img src='/hiasan.png' className='mt-0 mx-auto' />
          <h2 className='bellefair w-[70%] mx-auto mt-0'>
            Putri dari pasangan I Nengah Sujana dan Ni Ketut Arni
          </h2>
          <h2 className='bellefair'>
            Lingk. Sawe Rangsasa, Kel. Dauhwaru, Kec. Jembrana
          </h2>
        </div>
      </div>

    </div>
  )
}

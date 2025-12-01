import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Countdown() {
  const targetDate = new Date("2025-12-29T15:00:00+08:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        w-[80%] mx-auto text-center rounded-3xl
        bellefair
      "
      data-aos="fade-up"
    >
      <div className="flex justify-center gap-4 mt-2">
        {/* Box Item */}
        {[
          { label: "Hari", value: timeLeft.days },
          { label: "Jam", value: timeLeft.hours },
          { label: "Menit", value: timeLeft.minutes },
          { label: "Detik", value: timeLeft.seconds },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-accent text-white rounded-xl px-3 py-3 w-20 shadow-lg"
            data-aos="zoom-in"
            data-aos-delay={index * 150}
          >
            <div className="text-xl font-bold">{item.value}</div>
            <div className="text-[12px] tracking-wider mt-1 uppercase">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

// Convert Supabase timestamp ("2025-11-25 14:45:28.15103") to Date
function parseSupabaseTimestamp(ts) {
  if (!ts) return null;
  const iso = ts.replace(" ", "T") + "Z";
  return new Date(iso);
}

// Format waktu "x menit lalu"
function timeAgo(ts) {
  const d = parseSupabaseTimestamp(ts);
  if (!d || isNaN(d)) return "";

  const diff = (new Date() - d) / 1000;

  if (diff < 10) return "baru saja";
  if (diff < 60) return `${Math.floor(diff)} detik yang lalu`;
  if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
  return `${Math.floor(diff / 86400)} hari yang lalu`;
}

// Format ke WITA
function formatWITA(ts) {
  const d = parseSupabaseTimestamp(ts);
  if (!d || isNaN(d)) return "-";

  return d.toLocaleString("id-ID", {
    timeZone: "Asia/Makassar",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function Comments() {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [attendance, setAttendance] = useState("");
  const [comments, setComments] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // INIT AOS
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out",
    });
  }, []);

  // Load comments
  const loadComments = async () => {
    const { data, error } = await supabase
      .from("comment")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setComments(data);
  };

  // Submit
  const sendComment = async (e) => {
    e.preventDefault();
    if (!name || !notes || !attendance) {
      toast.error("Nama, ucapan, dan kehadiran wajib diisi!");
      return;
    }

    const { error } = await supabase.from("comment").insert([
      {
        name,
        notes,
        attendance,
      },
    ]);

    if (error) {
      toast.error("Gagal menyimpan komentar");
      return;
    }

    toast.success("Komentar berhasil dikirim 🎉");
    setName("");
    setNotes("");
    setAttendance("");
    setRefreshKey((prev) => prev + 1);
  };

  // Realtime Supabase
  useEffect(() => {
    loadComments();

    const channel = supabase
      .channel("comments_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comment" },
        (payload) => {
          setComments((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [refreshKey]);

  const getAttendanceColor = (status) => {
    switch (status) {
      case "Hadir":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Tidak Hadir":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "Ragu-ragu":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen">
      <div
        className="max-w-md mx-auto bg-[url('/bg.png')]
        bg-cover bg-center bg-no-repeat pb-20 pt-3 px-4 bellefair"
      >
        {/* Header */}
        <div
          className="text-center mb-5 alex text-darkAccent mt-2"
          data-aos="fade-down"
        >
          <h2 className="text-3xl font-bold mb-2">Ucapan & Kehadiran</h2>
          <p className="bellefair">Tinggalkan ucapan dan konfirmasi kehadiranmu</p>
        </div>

        {/* Form */}
        <div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 text-darkAccent"
          data-aos="zoom-in"
        >
          <div className="space-y-4">
            <div data-aos="fade-up" data-aos-delay="100">
              <label className="block text-sm font-medium mb-2">Nama</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-none"
                placeholder="Masukkan nama kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div data-aos="fade-up" data-aos-delay="150">
              <label className="block text-sm font-medium mb-2">Ucapan</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-none resize-none"
                placeholder="Tulis ucapan atau doa terbaik..."
                rows="4"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div data-aos="fade-up" data-aos-delay="200">
              <label className="block text-sm font-medium mb-2">
                Konfirmasi Kehadiran
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-none bg-white"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
              >
                <option value="">Pilih status kehadiran</option>
                <option value="Hadir">✓ Hadir</option>
                <option value="Tidak Hadir">✗ Tidak Hadir</option>
                <option value="Ragu-ragu">? Ragu-ragu</option>
              </select>
            </div>

            <button
              onClick={sendComment}
              data-aos="fade-up"
              data-aos-delay="300"
              className="w-full bg-accent text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Kirim Ucapan
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          <h3
            className="text-lg font-semibold text-gray-800 mb-4"
            data-aos="fade-up"
          >
            {comments.length} Ucapan
          </h3>

          {comments.length === 0 ? (
            <div
              className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100"
              data-aos="fade-up"
            >
              <p className="text-gray-500">Belum ada ucapan. Jadilah yang pertama!</p>
            </div>
          ) : (
            comments.map((c, i) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-semibold text-sm">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{c.name}</p>
                      <span className="text-xs text-gray-500">
                        {timeAgo(c.created_at)} • {formatWITA(c.created_at)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-3">{c.notes}</p>

                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getAttendanceColor(
                    c.attendance
                  )}`}
                >
                  {c.attendance === "Hadir" && "✓ "}
                  {c.attendance === "Tidak Hadir" && "✗ "}
                  {c.attendance === "Ragu-ragu" && "? "}
                  {c.attendance}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

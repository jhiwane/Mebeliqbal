export default function handler(req, res) {
    // Pastikan metode yang digunakan adalah POST
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Metode tidak diizinkan' });
    }

    // Mengambil sandi yang dikirim dari halaman HTML
    const { password } = req.body;

    // Mengambil sandi asli dari Environment Variable Vercel Anda
    // Di Vercel > Settings > Environment Variables, Anda harus membuat variabel dengan nama ADMIN_PASSWORD
    const validPassword = process.env.ADMIN_PASSWORD;

    // Jika di Vercel belum diset, beri fallback untuk jaga-jaga (bisa Anda hapus baris fallback ini jika sudah diset di Vercel)
    const finalValidPassword = validPassword || "sandi_sementara_sebelum_diset";

    // Pengecekan
    if (password === finalValidPassword) {
        // Jika benar, kirim respons sukses
        res.status(200).json({ success: true, message: "Login berhasil" });
    } else {
        // Jika salah, kirim respons error
        res.status(401).json({ success: false, message: "Sandi salah" });
    }
}

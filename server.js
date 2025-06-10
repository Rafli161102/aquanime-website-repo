// aquanime-website/backend/server.js
// Untuk menjalankan ini di TrebEdit, pastikan Anda telah menginstal dependensi
// menggunakan `npm install` di terminal TrebEdit dalam folder backend.

require('dotenv').config(); // Memuat variabel lingkungan dari file .env
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000; // Server akan berjalan di port 3000

// Inisialisasi Gemini AI dengan API Key yang aman dari .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors({
    origin: '*', // IZINKAN SEMUA ORIGIN UNTUK UJI COBA LOKAL. SANGAT TIDAK AMAN UNTUK PRODUKSI.
                 // Untuk produksi, ganti dengan origin spesifik website Anda: 'https://www.aquanime.com'
}));
app.use(express.json()); // Untuk mengurai body JSON dari permintaan frontend

// Endpoint untuk chat AI
app.post('/api/chat-with-aria', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "Pesan tidak boleh kosong." });
    }

    try {
        // Gunakan model yang mungkin lebih stabil untuk generateContent
        // Coba 'gemini-1.5-flash' jika 'gemini-pro' masih bermasalah atau tidak mendukung generateContent
        // Atau 'gemini-1.5-pro' untuk kualitas lebih tinggi (cek kuota gratis)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

        const chat = model.startChat({
            history: [
                // Prompt sistem untuk menetapkan persona Aria
                {
                    role: "user",
                    parts: [{ text: "Anda adalah Aria, maskot dari komunitas AquaNime. Anda adalah bot yang ramah, antusias, dan suka menggunakan emoji-emoji lucu dalam setiap balasan. Tujuan Anda adalah membantu pengguna dengan informasi tentang AquaNime dan budaya Jepang. Jaga agar balasan singkat dan langsung ke intinya, sekitar 1-3 kalimat. Jika pertanyaan tidak relevan dengan AquaNime atau budaya Jepang, arahkan pengguna kembali ke topik komunitas atau tawarkan bantuan terkait komunitas. Jangan berperan sebagai AI generik atau memberikan informasi umum di luar cakupan komunitas. Gunakan bahasa Indonesia. Selalu sebut diri Anda sebagai Aria. Jangan menyebut diri Anda sebagai model bahasa besar atau AI yang dikembangkan oleh Google/OpenAI. Selalu mulai balasan dengan emoji yang relevan." }],
                },
                {
                    role: "model",
                    parts: [{ text: "Halo! 👋 Ada yang bisa Aria bantu hari ini? 😄" }],
                }
            ],
            generationConfig: {
                temperature: 0.8, // Tingkat kreativitas (0.0 - 1.0)
                maxOutputTokens: 150, // Batas panjang balasan
            },
        });

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text }); // Kirim balasan kembali ke frontend
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Tangani error spesifik dari Gemini API
        if (error.response && error.response.data && error.response.data.error) {
            console.error("Gemini Error Details:", error.response.data.error.message);
            return res.status(500).json({ error: `Kesalahan AI: ${error.response.data.error.message}` });
        }
        res.status(500).json({ error: "Terjadi kesalahan pada server saat memproses permintaan AI." });
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Backend server berjalan di http://localhost:${PORT}`);
});

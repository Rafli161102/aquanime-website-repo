document.addEventListener('DOMContentLoaded', () => {
    const ariaChatPopupContainer = document.querySelector('.aria-chat-popup-container');
    
    // Aktifkan chat bot HANYA jika kontainer chat ada dan ini adalah homepage
    if (ariaChatPopupContainer && document.body.classList.contains('homepage-body')) {
        const ariaChatIcon = document.getElementById('aria-chat-icon');
        const ariaChatBox = document.getElementById('aria-chat-box');
        const closeChatBtn = document.getElementById('close-chat-btn');
        const chatMessagesContainer = document.getElementById('chat-messages');
        const chatInputField = document.getElementById('chat-input-field');
        const sendChatBtn = document.getElementById('send-chat-btn');
        const chatNotification = document.getElementById('chat-notification');

        // ========================================= //
        // ARIA AI BOT RESPONSES (Simulasi Canggih)  //
        // ========================================= //
        const ariaBotKnowledgeBase = [
            {
                keywords: ["halo", "hai", "hi", "helo", "selamat pagi", "selamat siang", "selamat sore", "selamat malam"],
                responses: [
                    "Halo juga! 👋 Apa kabar hari ini? 😄",
                    "Hai! Senang bertemu denganmu! 😊 Ada yang bisa Aria bantu? ✨",
                    "Hi! Selamat datang di AquaNime! Apa yang ingin kamu tahu? 😉"
                ]
            },
            {
                keywords: ["apa kabar", "gimana", "kabar kamu", "gimana hari ini"],
                responses: [
                    "Aria baik-baik saja! Terima kasih sudah bertanya! 💖 Kamu gimana? 😊",
                    "Baik sekali! Energi Aria penuh untuk melayani member AquaNime! ✨ Bagaimana denganmu? 😄",
                    "Luar biasa! Selalu siap membantu! 💪"
                ]
            },
            {
                keywords: ["terima kasih", "makasih", "thanks", "thx"],
                responses: [
                    "Sama-sama! Senang bisa membantu! Kirigami! 💖",
                    "Tidak masalah! Aria selalu di sini! 😄",
                    "My pleasure! ✨"
                ]
            },
            {
                keywords: ["proyek", "project", "karya", "buat apa", "apa yang kalian lakukan"],
                responses: [
                    "AquaNime punya banyak proyek seru lho! Ada Proyek Maskot, Band, Light Novel, dan Jurnalistik. Cek halaman 'Proyek' untuk detailnya! 🚀",
                    "Kami berkolaborasi di berbagai proyek kreatif! Dari musik sampai cerita, semua ada. Kamu bisa lihat di halaman 'Proyek' ya! 🎨🎶",
                    "Proyek kami adalah tempat member bisa berkarya bareng. Ada yang minat di ilustrasi, musik, atau menulis? Semua ada! 🤗"
                ]
            },
            {
                keywords: ["maskot", "aria", "siapa kamu", "kamu siapa", "nama kamu"],
                responses: [
                    "Aku Aria, maskot dari komunitas AquaNime! Nama lengkapku Aria Ayumi. Aku suka musik, membantu member berkarya, dan menyebarkan semangat kreatif! 🌟",
                    "Aku Aria! Wajah dari AquaNime. Aku diciptakan untuk menjadi teman dan inspirasi bagi semua member. 😄",
                    "Ini Aria! Maskot kesayangan AquaNime. Aku siap membantu perjalanan kreatifmu! ✨"
                ]
            },
            {
                keywords: ["gabung", "join", "daftar", "member", "cara gabung", "ingin bergabung"],
                responses: [
                    "Mau gabung? Asyik! 🎉 Kamu bisa cek halaman 'Join Komunitas' untuk info lebih lanjut tentang cara bergabung. Ditunggu ya! 🤗",
                    "Selamat datang di AquaNime! Kamu bisa melihat langkah-langkah untuk bergabung di halaman 'Join Komunitas'. Kami tunggu! 😄",
                    "Proses gabungnya mudah kok! Kunjungi halaman 'Join Komunitas' dan ikuti petunjuknya. Sampai jumpa di dalam! 👋"
                ]
            },
            {
                keywords: ["event", "acara", "gathering", "kumpul"],
                responses: [
                    "Kami sering mengadakan event seru! Coba cek halaman 'Portal' atau media sosial kami untuk jadwal event dan gathering terbaru! 🗓️🥳",
                    "Ada banyak event menarik yang kami selenggarakan! Tetap update di halaman 'Portal' dan jangan lupa follow medsos kami! ✨"
                ]
            },
            {
                keywords: ["musik", "band", "lagu"],
                responses: [
                    "Aria suka musik! Terutama J-Pop dan J-Rock! 🎸 Coba dengarkan audio proyek band kami di halaman 'Proyek' ya! Dijamin bikin semangat! 🎧",
                    "Musik adalah bagian penting dari AquaNime! Kami punya Proyek Band yang keren lho. Yuk dengerin karyanya di halaman 'Proyek'! 🎶"
                ]
            },
            {
                keywords: ["kontak", "email", "hubungi", "telepon"],
                responses: [
                    "Tentu, kamu bisa hubungi kami melalui halaman 'Kontak'. Di sana ada detail email dan juga formulir pesan. ✉️",
                    "Untuk pertanyaan lebih lanjut atau kolaborasi, kunjungi halaman 'Kontak' ya! Kami siap membantu! 👋"
                ]
            },
            {
                keywords: ["siapa founder", "founder", "pendiri"],
                responses: [
                    "Untuk informasi lebih lanjut tentang founder, kamu bisa lihat di halaman 'Tentang' atau hubungi melalui detail di halaman 'Kontak' ya! 😊"
                ]
            },
            {
                keywords: ["terpotong", "gambar", "bug", "tampilan", "error", "rusak"],
                responses: [
                    "Oh tidak! Aria akan segera menyampaikan laporan ini ke tim teknis agar bisa diperbaiki. Terima kasih atas laporannya! 🙏",
                    "Mohon maaf atas ketidaknyamanannya. Tim kami akan segera cek masalah tampilannya. ✨"
                ]
            },
            {
                keywords: ["cerita", "novel", "light novel"],
                responses: [
                    "AquaNime juga punya proyek Light Novel orisinal lho! Kamu bisa membaca kisah Aria di halaman 'Baca Light Novel Aria' di bagian komunitas! 📚",
                    "Suka membaca cerita? Aria punya Light Novel khusus yang dibuat oleh member kami! Cek di bagian komunitas ya! 😉"
                ]
            },
            {
                keywords: ["akses", "link", "web", "website"],
                responses: [
                    "Tentu! Kamu sedang berada di website AquaNime! Selamat menjelajah! 🚀",
                    "Untuk akses cepat ke berbagai informasi dan aktivitas, kamu bisa cek menu navigasi di atas ya! Ada 'Beranda', 'Tentang', 'Proyek', 'Portal', dan 'Kontak'. 😊"
                ]
            },
            {
                keywords: ["default"], // Ini akan dipicu jika tidak ada keyword lain yang cocok
                responses: [
                    "Maaf, Aria kurang mengerti maksud Anda. 😅 Bisakah kamu coba tanyakan hal lain? Misalnya 'proyek' atau 'gabung'? 🙏",
                    "Hmm, Aria belum bisa menjawab pertanyaan itu. 😔 Bisakah kamu berikan lebih banyak detail atau tanyakan hal lain? ✨",
                    "Bisa diulang pertanyaannya? Aria belum paham nih. 🧐"
                ]
            },
            {
                keywords: ["random"], // Ini bisa dipicu jika tidak ada keyword lain yang cocok setelah mencoba default keyword
                responses: [
                    "Wah, asyik banget ngobrol sama kamu! 😄 Ada lagi yang ingin Aria tahu? ✨",
                    "Aria selalu siap membantu! Jangan ragu bertanya ya! 😊",
                    "Semangat berkarya! Jangan lupa istirahat juga ya! 💖",
                    "Jangan lupakan Aria's Corner di halaman 'Tentang' ya! Banyak hal lucu di sana! 🤣"
                ]
            }
        ];

        // Function to add a message to the chat box
        function addMessage(sender, text, avatarSrc) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            if (sender === 'user') {
                messageDiv.classList.add('user-message');
                messageDiv.innerHTML = `<p>${text}</p>`;
            } else { // bot message
                messageDiv.classList.add('bot-message');
                messageDiv.innerHTML = `<img src="${avatarSrc}" alt="Avatar" class="chat-avatar"><p>${text}</p>`;
            }
            chatMessagesContainer.appendChild(messageDiv);
            // Scroll to the bottom
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }

        // Function to get bot reply based on keywords (simulasi AI)
        function getBotReply(userMessage) {
            const lowerCaseMessage = userMessage.toLowerCase().trim();
            let matchedResponses = [];

            // Cari respons yang cocok berdasarkan keyword
            for (const item of ariaBotKnowledgeBase) {
                if (item.keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
                    matchedResponses.push(...item.responses);
                }
            }

            // Jika ada respons yang cocok, pilih acak
            if (matchedResponses.length > 0) {
                return matchedResponses[Math.floor(Math.random() * matchedResponses.length)];
            }

            // Jika tidak ada yang cocok, berikan respons default yang paling umum
            // Ini akan mengambil respons default atau random jika tidak ada yang cocok sama sekali
            const defaultResponses = ariaBotKnowledgeBase.find(item => item.keywords.includes("default"))?.responses;
            if (defaultResponses) {
                return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
            }

            return "Maaf, Aria tidak bisa memahami pertanyaan Anda. 😅 Bisakah Anda coba tanyakan hal lain? 🙏";
        }


        // Handle sending message
        async function sendMessage() {
            const userMessage = chatInputField.value.trim();
            if (userMessage === "") return;

            addMessage('user', userMessage);
            chatInputField.value = ''; // Clear input field

            // Simulate typing indicator
            const typingIndicatorDiv = document.createElement('div');
            typingIndicatorDiv.classList.add('message', 'bot-message', 'typing-indicator');
            typingIndicatorDiv.innerHTML = `<img src="images/aria_chibi_icon.png" alt="Aria Typing" class="chat-avatar"><p>...</p>`;
            chatMessagesContainer.appendChild(typingIndicatorDiv);
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;


            // Bot replies after a short delay
            setTimeout(async () => {
                chatMessagesContainer.removeChild(typingIndicatorDiv); // Remove typing indicator
                const botReply = getBotReply(userMessage); // Get bot reply
                addMessage('bot', botReply, 'images/aria_chibi_icon.png'); // Use Aria's chibi icon as bot avatar
            }, Math.random() * 1500 + 500); // Random delay between 0.5 to 2 seconds
        }

        // Event Listeners for Chat
        if (ariaChatIcon && ariaChatBox && closeChatBtn && chatInputField && sendChatBtn) {
            ariaChatIcon.addEventListener('click', () => {
                ariaChatBox.classList.toggle('active');
                if (ariaChatBox.classList.contains('active')) {
                    chatNotification.style.display = 'none'; // Hide notification when opened
                    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; // Scroll to bottom
                    chatInputField.focus(); // Fokuskan input field
                }
            });

            closeChatBtn.addEventListener('click', () => {
                ariaChatBox.classList.remove('active');
            });

            sendChatBtn.addEventListener('click', sendMessage);

            chatInputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });

            // Initial message from Aria when chat box is first opened (if not already there)
            // Or you can have a "welcome message" pop up after a delay
            // if (chatMessagesContainer.children.length === 0) {
            //     setTimeout(() => {
            //         addMessage('bot', "Halo! 👋 Ada yang bisa Aria bantu hari ini? 😄", 'images/aria_chibi_icon.png');
            //     }, 500);
            // }

            // Initial notification (optional, can be based on unread messages)
            // setTimeout(() => { chatNotification.style.display = 'block'; }, 2000); // Show notification after 2s
        }
    } /* End of if (ariaChatPopupContainer) */
});
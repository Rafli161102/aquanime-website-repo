// js/aria_chat_ai.js

document.addEventListener('DOMContentLoaded', () => {
    const ariaChatPopupContainer = document.querySelector('.aria-chat-popup-container');
    
    if (ariaChatPopupContainer && document.body.classList.contains('homepage-body')) {
        const ariaChatIcon = document.getElementById('aria-chat-icon');
        const ariaChatBox = document.getElementById('aria-chat-box');
        const closeChatBtn = document.getElementById('close-chat-btn');
        const chatMessagesContainer = document.getElementById('chat-messages');
        const chatInputField = document.getElementById('chat-input-field');
        const sendChatBtn = document.getElementById('send-chat-btn');
        const chatNotification = document.getElementById('chat-notification');

        // ========================================= //
        // ENDPOINT API BACKEND (Serverless Function) //
        // ========================================= //
        // Jika Anda men-deploy ke Vercel/Netlify, URL-nya akan seperti ini:
        const CHAT_API_ENDPOINT = '/api/chat-aria'; // <--- URL endpoint lokal relatif ke domain Anda

        // Fungsi untuk menambahkan pesan ke chat box
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
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }

        // Fungsi untuk mendapatkan balasan dari bot (melalui Serverless Function)
        async function getBotReply(userMessage) {
            try {
                const response = await fetch(CHAT_API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: userMessage }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Serverless Function Error:', response.status, errorData);
                    return "Maaf, Aria sedang mengalami sedikit gangguan. 😥 (Server Error)";
                }

                const data = await response.json();
                return data.reply || "Aria kurang mengerti, nih. 🧐 Bisakah kamu tanyakan dengan cara lain? 🙏";

            } catch (error) {
                console.error('Frontend network error to Serverless Function:', error);
                return "Wah, ada masalah koneksi nih! 🌐 Aria nggak bisa chat. Coba cek internetmu ya! ✨";
            }
        }

        // Handle sending message
        async function sendMessage() {
            const userMessage = chatInputField.value.trim();
            if (userMessage === "") return;

            addMessage('user', userMessage);
            chatInputField.value = '';

            const typingIndicatorDiv = document.createElement('div');
            typingIndicatorDiv.classList.add('message', 'bot-message', 'typing-indicator');
            typingIndicatorDiv.innerHTML = `<img src="images/aria_chibi_icon.png" alt="Aria Typing" class="chat-avatar"><p>...</p>`;
            chatMessagesContainer.appendChild(typingIndicatorDiv);
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

            setTimeout(async () => {
                chatMessagesContainer.removeChild(typingIndicatorDiv);
                const botReply = await getBotReply(userMessage);
                addMessage('bot', botReply, 'images/aria_chibi_icon.png');
            }, Math.random() * 1000 + 500);
        }

        // Event Listeners for Chat
        if (ariaChatIcon && ariaChatBox && closeChatBtn && chatInputField && sendChatBtn) {
            ariaChatIcon.addEventListener('click', () => {
                ariaChatBox.classList.toggle('active');
                if (ariaChatBox.classList.contains('active')) {
                    chatNotification.style.display = 'none';
                    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
                    chatInputField.focus();
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

            // Initial message from Aria
            if (chatMessagesContainer.children.length === 0) {
                setTimeout(() => {
                    addMessage('bot', "Halo! 👋 Ada yang bisa Aria bantu hari ini? 😄", 'images/aria_chibi_icon.png');
                }, 500);
            }
        }
    }
});

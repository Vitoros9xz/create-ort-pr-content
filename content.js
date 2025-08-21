// content.js - Phiên bản cải tiến với CSS và vị trí chèn

(function() {
    'use strict';

    // ID cho các element của chúng ta để tránh xung đột và tiêm lại
    const BUTTON_ID = 'gemini-pr-content-button';
    const STYLE_ID = 'gemini-pr-content-styles';

    // Hàm tiêm CSS cho nút và hiệu ứng hover
    const injectStyles = () => {
        // Chỉ tiêm CSS một lần duy nhất
        if (document.getElementById(STYLE_ID)) {
            return;
        }

        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.innerHTML = `
            #${BUTTON_ID} {
                background-color: #28a745; /* Màu xanh lá cây */
                color: white !important; /* Ghi đè các style khác nếu cần */
                border: none;
                padding: 6px 14px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 600;
                font-size: 14px;
                line-height: 1.5;
                margin-right: 10px; /* Khoảng cách với nút bên phải */
                transition: background-color 0.2s ease-in-out;
                white-space: nowrap; /* Đảm bảo text không bị xuống dòng */
            }

            #${BUTTON_ID}:hover {
                background-color: #218838; /* Màu xanh lá cây đậm hơn khi hover */
            }
        `;
        document.head.appendChild(style);
    };

    // Hàm để tìm và thêm nút
    const addCreatePrButton = () => {
        // Đầu tiên, đảm bảo CSS đã được tiêm
        injectStyles();

        const actionsContainer = document.querySelector('.actions');

        // Nếu tìm thấy .actions VÀ nút của chúng ta chưa tồn tại
        if (actionsContainer && !document.getElementById(BUTTON_ID)) {
            const prButton = document.createElement('button');
            prButton.id = BUTTON_ID;
            prButton.textContent = 'Tạo Nội Dung PR';
            prButton.className = 'btn'; // Vẫn giữ class 'btn' để nhất quán nếu cần

            prButton.addEventListener('click', createPrContent);

            // Chèn nút vào VỊ TRÍ ĐẦU TIÊN của container
            actionsContainer.insertBefore(prButton, actionsContainer.firstChild);
        }
    };

    // Hàm logic chính để tạo nội dung (không thay đổi)
    function createPrContent() {
        const currentUrl = window.location.href;
        const contentElement = document.querySelector('.heading.markdown-body');
        if (!contentElement) {
            alert('Không tìm thấy nội dung tại selector ".heading.markdown-body"');
            return;
        }
        const contentText = contentElement.innerText.trim();

        const finalContent = `
# Why

* Close ${currentUrl}

# How

* ${contentText}
        `.trim();

        navigator.clipboard.writeText(finalContent).then(() => {
            alert('Nội dung PR đã được sao chép vào clipboard!');
        }).catch(err => {
            console.error('Không thể sao chép vào clipboard: ', err);
            alert('Đã xảy ra lỗi khi sao chép.');
        });
    }

    // --- Logic MutationObserver (không thay đổi) ---
    const observer = new MutationObserver(() => addCreatePrButton());
    observer.observe(document.body, { childList: true, subtree: true });
    addCreatePrButton(); // Thử chạy một lần lúc đầu

})();

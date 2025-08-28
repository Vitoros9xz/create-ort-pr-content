// content.js - Phiên bản cuối cùng với phản hồi trên nút

(function() {
    'use strict';

    const BUTTON_ID = 'gemini-pr-content-button';
    const STYLE_ID = 'gemini-pr-content-styles';

    const injectStyles = () => {
        if (document.getElementById(STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.innerHTML = `
            #${BUTTON_ID} {
                background-color: #007bff; /* Thay đổi màu sang xanh dương */
                color: white !important;
                border: none;
                padding: 6px 14px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
                font-size: 14px;
                line-height: 1.5;
                margin-right: 10px;
                transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
                white-space: nowrap;
                width: 150px; /* Cho nút có độ rộng cố định */
                text-align: center;
            }
            #${BUTTON_ID}:hover {
                background-color: #0056b3;
            }
        `;
        document.head.appendChild(style);
    };

    const addCreatePrButton = () => {
        injectStyles();
        const actionsContainer = document.querySelector('.actions');
        if (actionsContainer && !document.getElementById(BUTTON_ID)) {
            const prButton = document.createElement('button');
            prButton.id = BUTTON_ID;
            // THAY ĐỔI 1: Đổi nhãn sang tiếng Anh
            prButton.textContent = 'Create PR Content';
            prButton.className = 'btn';
            prButton.addEventListener('click', createPrContent);
            actionsContainer.insertBefore(prButton, actionsContainer.firstChild);
        }
    };

    function createPrContent() {
        const prButton = document.getElementById(BUTTON_ID);
        if (!prButton || prButton.textContent !== 'Create PR Content') {
            // Không làm gì nếu đang trong trạng thái "Created!" hoặc "Error!"
            return;
        }

        const originalButtonText = prButton.textContent;
        const currentUrl = window.location.href;
        const contentElement = document.querySelector('.heading.markdown-body');

        if (!contentElement) {
            console.error('Source element .heading.markdown-body not found');
            prButton.textContent = 'Error!';
            setTimeout(() => { prButton.textContent = originalButtonText; }, 2000);
            return;
        }

        const contentText = contentElement.innerText.trim();
        const finalContent = `
# Why

* Close ${currentUrl}

# How

* ${contentText}
        `.trim();

        // THAY ĐỔI 2 & 3: Phản hồi trên nút, không dùng alert
        navigator.clipboard.writeText(finalContent).then(() => {
            prButton.textContent = 'Created!';
            setTimeout(() => { prButton.textContent = originalButtonText; }, 2000);
        }).catch(err => {
            console.error('Failed to copy to clipboard: ', err);
            prButton.textContent = 'Error!';
            setTimeout(() => { prButton.textContent = originalButtonText; }, 2000);
        });
    }

    const observer = new MutationObserver(() => addCreatePrButton());
    observer.observe(document.body, { childList: true, subtree: true });
    addCreatePrButton();

})();
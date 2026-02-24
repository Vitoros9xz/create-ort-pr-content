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
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #007bff;
                color: white !important;
                border: none;
                padding: 12px 16px;
                border-radius: 50px;
                cursor: pointer;
                font-weight: bold;
                font-size: 14px;
                line-height: 1.5;
                transition: all 0.3s ease-in-out;
                white-space: nowrap;
                min-width: 160px;
                text-align: center;
                box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
                z-index: 9999;
                user-select: none;
            }
            #${BUTTON_ID}:hover {
                background-color: #0056b3;
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4);
            }
            #${BUTTON_ID}:active {
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    };

    const addCreatePrButton = () => {
        injectStyles();
        
        // Chỉ thêm nút nếu chưa tồn tại và đang ở trang GitHub issue/PR
        if (!document.getElementById(BUTTON_ID)) {
            const prButton = document.createElement('button');
            prButton.id = BUTTON_ID;
            prButton.textContent = 'Create PR Content';
            prButton.addEventListener('click', createPrContent);
            
            // Thêm nút trực tiếp vào body thay vì actions container
            document.body.appendChild(prButton);
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
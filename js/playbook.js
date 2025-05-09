document.addEventListener('DOMContentLoaded', () => {
    const playbookImage = document.getElementById('playbookImage');
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');

    let currentPage = 1;
    const totalPages = 2;

    const updatePage = () => {
        const src = `./images/playbook_${currentPage}.png`;
        playbookImage.src = src;
        zoomedImage.src = src;
    
        prevBtn.classList.toggle('hidden', currentPage === 1);
        nextBtn.classList.toggle('hidden', currentPage === totalPages);
    };

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePage();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePage();
        }
    });

    playbookImage.addEventListener('click', () => {
        simpleLightbox(playbookImage.src);
    });
    
    updatePage();
});

function simpleLightbox(imageUrl, bgColor = '#000', maxWidth = '100vw') {
    const win = window.open('', '_blank'); // 새 창 or 새 탭
    const html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
        <style>
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            background: ${bgColor};
            display: flex;
            justify-content: center;
            align-items: center;
        }
        img {
            width: 100vw;
            height: auto;
            max-height: 100vh;
            object-fit: contain;
        }
        </style>
        </head>
        <body onclick="window.close()">
            <img src="${imageUrl}" alt="플레이북 이미지" />
        </body>
    </html>
    `;
    win.document.open();
    win.document.write(html);
    win.document.close();
}
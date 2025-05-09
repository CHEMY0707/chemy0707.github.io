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
    

    closeZoom.addEventListener('click', () => {
        zoomModal.classList.add('hidden');
        zoomModal.classList.remove('zoom-enabled');
    });

    

    updatePage();
});

function simpleLightbox(imageUrl, bgColor, maxWidth){
    if (typeof bgColor === 'undefined') bgColor = '#000';
    if (typeof maxWidth === 'undefined') maxWidth = '1100px';

    const win = window.open('', 'simpleLightbox', 'width=800,height=600');
    const html = `
        <html>
            <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
            <style>
                body {
                margin: 0;
                background: ${bgColor};
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                }
                img {
                max-width: ${maxWidth};
                min-width:100vw;
                width: 100%;
                height: auto;
                object-fit:contain;
                }
            </style>
            </head>
            <body onclick="window.close()">
            <img src="${imageUrl}" alt="Playbook Zoom">
            </body>
        </html>`;
    win.document.write(html);
}

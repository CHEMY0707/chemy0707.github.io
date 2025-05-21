document.addEventListener('DOMContentLoaded', function () {
    const shopList = document.getElementById('shopList');
    const filterButtons = document.querySelectorAll('.shop-filter button');

    const modal = document.getElementById('itemModal');
    const itemCardImage = document.getElementById('itemCardImage');
    const itemModalDesc = document.getElementById('itemModalDesc');
    const itemModalPrice = document.getElementById('itemModalPrice');

    const items = [
        { name: "녹슨 단검", image: "images/item_녹슨단검-8.png", type: "equipment", desc: '쿨타임 6일 시 치명타 +1', price: 7, cardImage: "images/아이템카드_녹슨단검.png"},
        { name: "쪼개진 목검", image: "images/item_쪼개진목검-8.png", type: "equipment", desc: '쿨타임 6일 시 치명타 +1', price: 7, cardImage: "images/아이템카드_쪼개진 목검.png" },
        { name: "가죽목둥이", image: "images/item_가죽몽둥이-8.png", type: "equipment", desc: '쿨타임 6일 시 치명타 +1', price: 7, cardImage: "images/아이템카드_가죽몽둥이.png" },
        { name: "반쯤 탄 지팡이", image: "images/item_지팡이-8.png", type: "equipment", desc: '쿨타임 6일 시 치명타 +1', price: 7, cardImage: "images/아이템카드_반쯤 탄 지팡이.png" },
        { name: "기도용 방울봉", image: "images/item_방울봉-8.png", type: "equipment", desc: '쿨타임 6일 시 치명타 +1', price: 7, cardImage: "images/아이템카드_기도용방울봉.png" },
        { name: "HP포션(소)", image: "images/item_포션(소)-8.png", type: "consumable", desc: '쿨타임 6일 시 치명타 +1', price: 7, cardImage: "images/아이템카드_포션 소.png" },
        { name: "HP포션(중)", image: "images/item_포션(중)-8.png", type: "consumable", desc: '쿨타임 6일 시 치명타 +1', price: 7, cardImage: "images/아이템카드_포션 중.png" },
        { name: "HP포션(대)", image: "images/item_포션(대)-8.png", type: "consumable", desc: '쿨타임 6일 시 치명타 +1', price: 7, cardImage: "images/아이템카드_포션 대.png" },
        { name: "여행용 배낭", image: "images/item_배낭-8.png", type: "consumable", desc: '쿨타임 6일 시 치명타 +1', price: 7, cardImage: "images/아이템카드_여행용 배낭.png" },
        { name: "초급 방패", image: "images/item_초급방패-8.png", type: "consumable", desc: '쿨타임 6일 시 치명타 +1', price: 7, cardImage: "images/아이템카드_초급방패.png" },
        { name: "일반 룰렛", image: "images/item_룰렛-8.png", type: "consumable", desc: '쿨타임 6일 시 치명타 +1', price: 7, cardImage: "images/아이템카드_일반 랜덤 박스.png" }
    ];

    let currentFilter = 'all';

    function renderShopItems(filter = 'all') {
        currentFilter = filter;
        shopList.innerHTML = '';

        const filteredItems = items.filter(item =>
            filter === 'all' || item.type === filter
        );

        filteredItems.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'shop-item ' + item.type;
            itemCard.setAttribute('data-name', item.name); // 매칭용
            itemCard.innerHTML = `
                <div class="shop-item-inner">
                    <img src="${item.image}" alt="${item.name}" class="shop-item__image">
                </div>
            `;

            const nameElement = document.createElement('p');
            nameElement.className = 'shop-item__name';
            nameElement.textContent = item.name;

            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'shop-item-wrapper';
            itemWrapper.appendChild(itemCard);
            itemWrapper.appendChild(nameElement);

            shopList.appendChild(itemWrapper);
        });
    }

    // 초기 렌더링
    renderShopItems('all');

    // 필터 버튼 이벤트
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderShopItems(button.dataset.filter);
        });
    });

    // ✅ 이벤트 위임으로 모달 열기
    shopList.addEventListener('click', (e) => {
        const target = e.target.closest('.shop-item');
        if (!target) return;

        const name = target.getAttribute('data-name');
        const item = items.find(i => i.name === name);
        if (!item) return;

        itemCardImage.src = item.cardImage;
        itemModalDesc.textContent = item.desc;

        itemModalPrice.innerHTML = `
            <span class="price-inline">
                <svg id="_레이어_2" data-name="레이어 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 785.27 784.83" width="1.6rem" height="1.6rem">
                <defs><style>.cls-1 {fill: #ffffff;}</style></defs>
                <g id="_레이어_1-2" data-name="레이어 1">
                    <g><path class="cls-1" d="M417,0l40.18,5.04c167.8,27.46,302.44,165.96,324.5,334.78,1.2,9.22.93,19.31,3.29,28.15-.7,16.22.95,32.89,0,49.06-19.6,334.9-432.46,491.79-671.01,252.44C-123.72,431.01,34.21,19.53,367.93,0h49.06ZM373.75,93.98C141.04,108.45,12.49,375.34,148.97,566.24c124.43,174.04,388.41,164.68,499.25-18.41,125.06-206.57-34.49-468.78-274.47-453.85Z"/><path class="cls-1" d="M373.75,109.31c225.46-14.87,377.63,228.76,264.29,425.28-106.3,184.32-371.47,189.07-485.4,9.57-115.34-181.73,7.86-420.79,221.1-434.85ZM424.74,237.57c2.54-21.7-2.55-48.37-29.97-45.94-24.34,2.16-24.93,30.31-23.93,48.93-84.97,22.88-108.92,111.61-97.55,190.62,7.72,53.61,42.26,102.91,97.63,113.18-1.08,18.66-.62,46.97,23.85,49.01,27.41,2.29,32.36-24.19,29.97-45.94,18.84-2.18,61.54-9.58,64.34-33,1.75-14.6-10.94-43.44-20.22-54.97-10.24-12.72-9.54-5.41-20.8-1.4-37.38,13.3-73.77,2.59-83.68-38.23-13.27-54.63,10.58-120.08,77.6-96,8.19,2.94,9.53,10.33,18.77,1.26,11.22-11.01,27.97-50.34,20.45-65.02-7.23-14.1-41.76-21.03-56.45-22.5Z"/></g>
                </g>
                </svg>
                <span class="price-text">${item.price}</span>
            </span>
        `;

        modal.classList.remove('hidden');
    });

    // 모달 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});

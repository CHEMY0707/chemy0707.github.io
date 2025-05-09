document.addEventListener('DOMContentLoaded', function () {
    const shopList = document.getElementById('shopList');

    // 아이템 데이터 (필요에 따라 더 추가 가능)
    const items = [
        { name: "회복 물약", image: "img/potion.png" },
        { name: "마법 지팡이", image: "img/wand.png" },
        { name: "방어구", image: "img/armor.png" },
        { name: "신속 부츠", image: "img/boots.png" },
        { name: "전설의 검1", image: "img/sword.png" },
        { name: "전설의 검2", image: "img/sword.png" },
        { name: "전설의 검3", image: "img/sword.png" },
        { name: "전설의 검4", image: "img/sword.png" },
        { name: "전설의 검5", image: "img/sword.png" }
    ];
    
    // 아이템을 HTML로 렌더링하는 함수
    function renderShopItems() {
      shopList.innerHTML = ''; // 초기화

        items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'shop-item';
        
        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="shop-item__image">
            <p class="shop-item__name">${item.name}</p>
        `;

        shopList.appendChild(itemCard);
        });
    }

    // 실행
    renderShopItems();
});

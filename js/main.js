document.addEventListener('DOMContentLoaded', function () {
  const additionalMenus = document.getElementById('additionalMenus');
  const characterMenu = document.getElementById('characterMenu');
  const characterInfo = document.getElementById('characterInfo');
  const characterNameDisplay = document.getElementById('characterNameDisplay');
  const resetButton = document.getElementById('resetCharacterButton');
  const cardContainer = document.getElementById('characterCardContainer'); // ← 추가

  const savedCharacter = localStorage.getItem('characterName');
  const savedRole = localStorage.getItem('characterRole');
  const savedImg = localStorage.getItem('characterImg');
  const savedCreatedAt = localStorage.getItem('characterCreatedAt');
  let currentHp;

  const roleStats = {
    '전사': {
      hp: 7,
      stats: [1, 2, 2, 1, 1], // 공격, 치명타, 방어, 원거리, 이동
      note: '방어굴림 6시 상대방 HP-1'
    },
    '궁수': {
      hp: 6,
      stats: [1, 1, 2, 3, 1],
      note: '크리티컬 성공 시 상대방과의 거리 +1'
    },
    '도적': {
      hp: 5,
      stats: [1, 1, 3, 1, 2],
      note: '주사위 다시굴림 +1 (크리티컬 시 능력회복) 도망 1,3,5'
    },
  };

  if (savedCharacter) {
    // 기존 기능 유지
    additionalMenus.style.display = 'block';
    characterMenu.style.display = 'none';
    characterNameDisplay.textContent = savedCharacter;
    
  const roleData = roleStats[savedRole] || {
    hp: 5,
    stats: [1, 1, 1, 1, 1],
    note: '능력치 정보 없음'
  };

  currentHp = roleData.hp;


    // ✅ 캐릭터 카드도 함께 렌더링
    if (cardContainer) {
      cardContainer.style.display = 'block';
      cardContainer.innerHTML = `
        <div class="character-card license-card">
          <div class="card-photo-wrapper">
            <div class="photo-frame-rotated"></div>
            <div class="card-photo">
              ${savedImg ? `<img src="${savedImg}" alt="Profile">` : `<div class="photo-placeholder">사진 없음</div>`}
            </div>
            <div class="photo-frame-front"></div>
          </div>
          <div class="card-info">
            <div class="card-text nickname">${savedCharacter}</div>
            <div class="card-text role">${savedRole || '직업 미정'}</div>
            <div class="card-text created">${savedCreatedAt || '-'}</div>
          </div>
          <div class="hp-sec">
            <img src="./images/hp_frame.png" alt="HP Frame Top" class="hp-frame top" />
            <div class="hpContainer">
              <button id="decreaseHp" class="hp-button">
                <img src="./images/minus.png" alt="Minus" />
              </button>
              <div id="hpContainer" class="hp-bar-img"></div>
              <button id="increaseHp" class="hp-button">
                <img src="./images/plus.png" alt="Plus" />
              </button>
            </div>
            <img src="./images/hp_frame.png" alt="HP Frame Bottom" class="hp-frame bottom" />
          </div>
          <div class="stats-sec">
            <div class="card-stats">
              <div><img src="./images/공격력.png"><span>${roleData.stats[0]}</span></div>
              <div><img src="./images/치명타.png"><span>${roleData.stats[1]}</span></div>
              <div><img src="./images/방어력.png"><span>${roleData.stats[2]}</span></div>
              <div><img src="./images/원거리.png"><span>${roleData.stats[3]}</span></div>
              <div><img src="./images/이동.png"><span>${roleData.stats[4]}</span></div>
            </div>
            <div class="card-note">${roleData.note}</div>
          </div>
        </div>
      `;


    }

  } else {
    // 캐릭터 없음 → 원래 상태 유지
    additionalMenus.style.display = 'none';
    characterMenu.style.display = 'block';
    characterInfo.style.display = 'none';

    if (cardContainer) {
      cardContainer.style.display = 'none';
    }
  }

  // 모달 함수 추가
function showModal(message, onConfirm, onCancel) {
  const modal = document.getElementById('customModal');
  const messageElem = document.getElementById('modalMessage');
  const confirmBtn = document.getElementById('modalConfirm');
  const cancelBtn = document.getElementById('modalCancel');

  messageElem.innerHTML = message;
  modal.classList.remove('hidden');

  confirmBtn.onclick = () => {
    modal.classList.add('hidden');
    onConfirm?.();
  };

  cancelBtn.onclick = () => {
    modal.classList.add('hidden');
    onCancel?.();
  };
}
if (resetButton) {
  resetButton.addEventListener('click', function () {
    showModal('캐릭터 정보가 영구히 초기화됩니다.<br>정말 다시 만드시겠습니까?', () => {
      localStorage.removeItem('characterName');
      localStorage.removeItem('characterRole');
      localStorage.removeItem('characterImg');
      localStorage.removeItem('characterCreatedAt');
      window.location.href = 'character.html';
    });
  });
}

const homeBtn = document.getElementById('homeButton');
const gameLogo = document.getElementById('gameLogo');
const dustVideo = document.getElementById('dustVideo');
const bgImage = document.querySelector('.main_background');
const playbookMenu = document.getElementById('playbookMenu');
const headingTitle = document.querySelector('.heading__title');
const subTitle = document.querySelector('.sub__title');
const subTitle2 = document.querySelector('.heading__title2');
const subTitle3 = document.querySelector('.heading__title3');
const titleSec = document.querySelector('.title_sec');

if (savedCharacter) {
  // 캐릭터가 있을 때
  homeBtn.style.display = 'block';
  gameLogo.style.display = 'none';
  dustVideo.style.display = 'none';
  bgImage.style.display = 'none';

  // 추가 요소 숨기기
  if (playbookMenu) playbookMenu.style.display = 'none';
  if (headingTitle) headingTitle.style.display = 'none';
  if (subTitle) subTitle.style.display = 'none';
  if (subTitle2) subTitle2.style.display = 'block';
  if (subTitle3) subTitle3.style.display = 'none';
  if (titleSec) titleSec.style.display = 'none';
  

} else {
  // 캐릭터 없음
  homeBtn.style.display = 'none';
  gameLogo.style.display = 'block';
  dustVideo.style.display = 'block';
  bgImage.style.display = 'block';

  // 추가 요소 보이기
  if (playbookMenu) playbookMenu.style.display = 'block';
  if (headingTitle) headingTitle.style.display = 'block';
  if (subTitle) subTitle.style.display = 'block';
  if (subTitle2) subTitle2.style.display = 'none';
  if (subTitle3) subTitle3.style.display = 'block';
}


// 체력 상태 관리
const MAX_HP = 8;

const hpContainer = document.getElementById('hpContainer');
const decreaseBtn = document.getElementById('decreaseHp');
const increaseBtn = document.getElementById('increaseHp');

function renderHp() {
  hpContainer.innerHTML = '';
  for (let i = 0; i < MAX_HP; i++) {
    const heart = document.createElement('img');
    heart.src = i < currentHp ? './images/heart_filled.png' : './images/heart_empty.png';
    heart.alt = i < currentHp ? '♥' : '♡';
    heart.style.width = '24px';
    heart.style.margin = '4px 1.5px 0';
    hpContainer.appendChild(heart);
  }
}

if (decreaseBtn && increaseBtn) {
  decreaseBtn.addEventListener('click', () => {
    if (currentHp > 0) {
      currentHp--;
      renderHp();
    }
  });

  increaseBtn.addEventListener('click', () => {
    if (currentHp < MAX_HP) {
      currentHp++;
      renderHp();
    }
  });

  renderHp(); // 초기 렌더링
}


});


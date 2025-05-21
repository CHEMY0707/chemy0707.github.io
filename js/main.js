document.addEventListener('DOMContentLoaded', function () {
  // const additionalMenus = document.getElementById('additionalMenus');
  const characterMenu = document.getElementById('characterMenu');
  const characterInfo = document.getElementById('characterInfo');
  const resetButton = document.getElementById('resetCharacterButton');
  const cardContainer = document.getElementById('characterCardContainer');
  const characterInfoContainer = document.getElementById('characterInfoContainer');

  const savedRole = localStorage.getItem('characterRole');
  const savedCreatedAt = localStorage.getItem('characterCreatedAt');
  const savedProfileImg = localStorage.getItem('characterProfileImg');
  const defaultImages = {
    '전사': './images/player_profile_class_1.png',
    '궁수': './images/player_profile_class_2.png',
    '도적': './images/player_profile_class_3.png'
  };

  
    // 누끼 이미지 표시
    function showCharacterSprite() {
      const spriteContainer = document.getElementById('characterSpriteContainer');
      const spriteImg = document.getElementById('characterSprite');
      const savedRole = localStorage.getItem('characterRole');
      const spriteMap = {
        '전사': './images/warrior_transparent.png',
        '궁수': './images/archer_transparent.png',
        '도적': './images/thief_transparent.png'
      };

      if (savedRole && spriteMap[savedRole]) {
        spriteImg.src = spriteMap[savedRole];
        spriteContainer.classList.remove('hidden');

        // 트랜지션 적용 보장
        setTimeout(() => {
          spriteContainer.classList.add('show');
        }, 10);
      }
    }


  const MAX_HP = 10;
  
  let currentHp;


  function decreaseHp() {
    if (currentHp > 0) {
      currentHp--;
      renderHp(document.getElementById('hpContainer-main'));
      const modalHpContainer = document.getElementById('hpContainer');
      if (modalHpContainer) renderHp(modalHpContainer);
    }
  }

  function increaseHp() {
    if (currentHp < MAX_HP) {
      currentHp++;
      renderHp(document.getElementById('hpContainer-main'));
      const modalHpContainer = document.getElementById('hpContainer');
      if (modalHpContainer) renderHp(modalHpContainer);
    }
  }


  function renderHp(targetElement) {
  if (!targetElement) return;

  const aspectRatio = window.innerHeight / window.innerWidth;
  const heartSize = (aspectRatio >= 2.1) ? '7.7%' : '7.7%';


  targetElement.innerHTML = '';
  for (let i = 0; i < MAX_HP; i++) {
    const heart = document.createElement('img');
    heart.src = i < currentHp ? './images/heart_filled.svg' : './images/heart_empty.svg';
    heart.alt = i < currentHp ? '♥' : '♡';
    heart.style.width = heartSize;
    heart.style.margin = '0.4rem 0.12rem 0';
    heart.style.maxWidth = '1.5rem';
    targetElement.appendChild(heart);
  }
}

  const roleStats = {
    '전사': { hp: 7, stats: [1, 2, 2, 1, 1], note: '방어굴림 6, 상대방 HP-1' },
    '궁수': { hp: 6, stats: [1, 2, 1, 3, 1], note: '크리티컬 성공 시 상대방과의 거리 +1' },
    '도적': { hp: 5, stats: [1, 3, 1, 1, 2], note: '주사위 다시굴림 +1 (크리티컬 시 능력회복) 도망 1,3,5' }
  };

  if (savedRole) {
    // additionalMenus.style.display = 'block';
    characterMenu.style.display = 'none';

    const roleData = roleStats[savedRole] || { hp: 5, stats: [1, 1, 1, 1, 1], note: '능력치 정보 없음' };
    currentHp = roleData.hp;

    if (characterInfoContainer) {
      characterInfoContainer.style.display = 'block';
      characterInfoContainer.innerHTML = `<div class="character-core">
          <div class="class-display-btn core-btn" id="openCardModal">
            <span class="btn-label">CLASS</span>
            <div class="card-text role">${savedRole || '직업 미정'}</div>
          </div>
          <div class="nickname-input-wrapper core-btn" id="nicknameInputWrapper">
          <span class="btn-label">NAME</span>
          <div class="nickname-display" id="nicknameDisplay">닉네임 미정</div>
        </div>

          <div class="playbook-btn core-btn" id="playbookBtn">
            <img src="./images/icon_playbook.png" id="playbookIcon">
          </div>
          <div class="vertical-button-group">
            <button class="vsmode core-btn" id="versusBtn">
              <img src="./images/icon_versus.png" id="versusIcon">
            </button>
            <button class="itemshop core-btn" id="itemshopBtn">
              <img src="./images/icon_shop.png" id="itemshopIcon">
            </button>
          </div>
          <div class="level-display core-btn2">
            <span class="bar-deco"></span>
            <span class="level-value">1</span>
            <span class="level-label">LEVEL</span>
          </div>
        </div>
        <div class="character-bottom">
          <div class="character-bottom-inner_1">
            <div class="profile-section core-btn2">
            <span class="bar-deco"></span>
              <div class="profile-image-sec">
                <img src="./images/default_profile.png" alt="프로필 이미지" id="characterProfileImg" />
              </div>
              <span class="profile-label">MY PROFILE</span>
            </div>
            <div class="dice-btn">
              <img src="./images/dice_btn.png" alt="주사위" id="diceBtnImage"/>
            </div>
          </div>
          <div class="character-bottom-inner_2">
            <div class="character-note" id="characterNote">${roleData.note}</div>
            <div class="character-stats">
              <div class="stat"><img src="./images/공격력.svg" /><span>${roleData.stats[0]}</span></div>
              <div class="stat"><img src="./images/치명타.svg" /><span>${roleData.stats[1]}</span></div>
              <div class="stat"><img src="./images/방어.svg" /><span>${roleData.stats[2]}</span></div>
              <div class="stat"><img src="./images/원거리.svg" /><span>${roleData.stats[3]}</span></div>
              <div class="stat"><img src="./images/이동.svg" /><span>${roleData.stats[4]}</span></div>
            </div>
          </div>

          <div class="hp-bar-wrapper">
          <div class="hp-bar-inner">
            <button id="decreaseHp" class="hp-button">
              <img src="./images/minus.svg" alt="Minus" />
            </button>
            <div id="hpContainer-main" class="hp-bar-img"></div>
            <button id="increaseHp" class="hp-button">
              <img src="./images/plus.svg" alt="Plus" />
            </button>
          </div>
        </div>
        </div>`;

        const profileWrapper = document.querySelector('.profile-section');
        const profileModal = document.getElementById('profileSelectModal');
        const profileOptions = document.querySelectorAll('.profile-option');
        const profileImg = document.getElementById('characterProfileImg');
        const modalContent = document.querySelector('.modal-content');

        
        profileWrapper.addEventListener('click', () => {
          profileModal.classList.add('active');
        });

        profileModal.addEventListener('click', (e) => {
          if (e.target === profileModal) {
            profileModal.classList.remove('active');
          }
        });

        if (modalContent) {
          modalContent.addEventListener('click', (e) => {
            e.stopPropagation(); // 내부 클릭은 무시
          });
        }

        profileOptions.forEach(option => {
          option.addEventListener('click', () => {

            profileOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');

            const selectedSrc = option.dataset.img;
            profileImg.src = selectedSrc;
            localStorage.setItem('characterProfileImg', selectedSrc);

            profileModal.classList.remove('active');
          });
        });
        
        if (savedProfileImg) {
          // 유저가 직접 선택한 프로필 이미지가 있다면
          profileImg.src = savedProfileImg;
        } else if (savedRole && defaultImages[savedRole]) {
          // 유저가 프로필은 선택하지 않았지만 직업은 있을 때
          profileImg.src = defaultImages[savedRole];
        } else {
          // 아무 것도 없으면 기본 프로필
          profileImg.src = '#';
        }

        const mainHpContainer = document.getElementById('hpContainer-main');
        renderHp(mainHpContainer);

        const decreaseBtn = document.getElementById('decreaseHp');
        const increaseBtn = document.getElementById('increaseHp');

        if (decreaseBtn && increaseBtn) {
          decreaseBtn.addEventListener('click', () => {
            if (currentHp > 0) {
              currentHp--;
              renderHp(mainHpContainer);
              const modalHpContainer = document.getElementById('hpContainer');
              if (modalHpContainer) renderHp(modalHpContainer); // 연동 업데이트
            }
          });

          increaseBtn.addEventListener('click', () => {
            if (currentHp < MAX_HP) {
              currentHp++;
              renderHp(mainHpContainer);
              const modalHpContainer = document.getElementById('hpContainer');
              if (modalHpContainer) renderHp(modalHpContainer);
            }
          });
        }

        

    }

    function matchButtonHeights() {
    const buttons = document.querySelectorAll('.core-btn');
    let maxHeight = 0;

    // 높이 초기화 후 최대값 찾기
    buttons.forEach(btn => {
      btn.style.height = 'auto'; // 초기화
      const height = btn.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    // 최대 높이로 모두 설정
    buttons.forEach(btn => {
      btn.style.height = maxHeight + 'px';
    });
  }



  window.addEventListener('load', matchButtonHeights);
  window.addEventListener('resize', matchButtonHeights); // 반응형 대응

    const openCardModal = document.getElementById('openCardModal');
    const profileImgSrc = savedProfileImg || (savedRole && defaultImages[savedRole]) || '#';
    if (openCardModal && cardContainer) {
      openCardModal.addEventListener('click', () => {
      if (cardContainer) {
      cardContainer.style.display = 'block';


      cardContainer.innerHTML = `
        <div class="character-card license-card">
          <div class="card-photo-wrapper">
            <div class="photo-frame-rotated"></div>
            <div class="card-photo">
              <img src="${profileImgSrc}" alt="Profile">
            </div>
            <div class="photo-frame-front"></div>
          </div>
          <div class="card-info">
            <div class="card-text nickname">${localStorage.getItem('characterName') || '미정'}</div>
            <div class="card-text role">${savedRole || '직업 미정'}</div>
            <div class="card-text created">${savedCreatedAt || '-'}</div>
          </div>
          <div class="hp-sec">
            <img src="./images/hp_frame.png" alt="HP Frame Top" class="hp-frame top" />
            <div class="hpContainer">
              <div id="hpContainer" class="hp-bar-img"></div>
            </div>

            <img src="./images/hp_frame.png" alt="HP Frame Bottom" class="hp-frame bottom" />
          </div>
          <div class="stats-sec">
            <div class="card-stats">
              <div><img src="./images/공격력.svg"><span>${roleData.stats[0]}</span></div>
              <div><img src="./images/치명타.svg"><span>${roleData.stats[1]}</span></div>
              <div><img src="./images/방어.svg"><span>${roleData.stats[2]}</span></div>
              <div><img src="./images/원거리.svg"><span>${roleData.stats[3]}</span></div>
              <div><img src="./images/이동.svg"><span>${roleData.stats[4]}</span></div>
            </div>
            <div class="card-note">${roleData.note}</div>
          </div>
        </div>
      `;

      const modalHpContainer = document.getElementById('hpContainer');
      renderHp(modalHpContainer);


      const Cardcontainerinner = document.querySelector('.license-card');
      const CardInfo = document.querySelector('.card-info');
      const aspectRatio = window.innerHeight / window.innerWidth;

      if (Cardcontainerinner) {
        Cardcontainerinner.style.width = (aspectRatio >= 2) ? '100%' : '88%';
      }
      if (CardInfo) {
        CardInfo.style.height = (aspectRatio >= 2) ? '17vh' : '20vh';
      }

      cardContainer.classList.add('show-modal');
      cardContainer.style.display = 'block';
      // cardContainer.style.height = (aspectRatio >= 2.1) ? '70vh' : '74vh';

      // 모달 바깥 클릭 시 닫기
      cardContainer.addEventListener('click', (e) => {
        if (e.target === cardContainer) {
          cardContainer.classList.remove('show-modal');
          setTimeout(() => {
            cardContainer.style.display = 'none';
            cardContainer.innerHTML = ''; // 모달 내용 제거
          }, 300);
        }
      });

      // 카드 내부 클릭 시 이벤트 전파 차단
      const cardElement = document.querySelector('.license-card');
      if (cardElement) {
        cardElement.addEventListener('click', (e) => {
          e.stopPropagation(); // 내부 클릭 시 닫히지 않도록 방지
        });
      }



        
      }
    });

  }


  const nicknameWrapper = document.getElementById('nicknameInputWrapper');
  const nicknameDisplay = document.getElementById('nicknameDisplay');
  const nicknameModal = document.getElementById('nicknameModal');
  const modalInput = document.getElementById('modalNicknameInput');
  const modalSaveBtn = document.getElementById('modalNicknameSaveBtn');

  // 초기화 시 저장된 닉네임 표시
  const storedNickname = localStorage.getItem('characterName');
  if (storedNickname && nicknameDisplay) {
    nicknameDisplay.textContent = storedNickname;

    showCharacterSprite();
  }

  // nickname 박스 클릭 → 모달 열기
  nicknameWrapper?.addEventListener('click', () => {
    modalInput.value = storedNickname || '';
    nicknameModal.style.display = 'flex';
  });

  // 저장 버튼 클릭
  modalSaveBtn?.addEventListener('click', () => {
  const name = modalInput.value.trim();
  if (name) {
    localStorage.setItem('characterName', name);
    nicknameDisplay.textContent = name;
    nicknameModal.style.display = 'none';

    showCharacterSprite();

  } else {
    alert('이름을 입력해주세요.');
  }
});


    // 카드창 닫기 버튼 추가
    const closeButton = document.createElement('button');
    closeButton.textContent = '닫기';
    closeButton.className = 'card-close-button';
    closeButton.addEventListener('click', () => {
      cardContainer.classList.remove('show-modal');
      setTimeout(() => { cardContainer.style.display = 'none'; }, 300);
    });
    cardContainer.appendChild(closeButton);

  } else {
    // additionalMenus.style.display = 'none';
    characterMenu.style.display = 'block';
    characterInfo.style.display = 'none';
    if (characterInfoContainer) characterInfoContainer.style.display = 'none';
    if (cardContainer) cardContainer.style.display = 'none';
  }

  if (resetButton) {
    resetButton.addEventListener('click', function () {
      showModal('캐릭터 정보가 영구히 초기화됩니다.<br>정말 다시 만드시겠습니까?', () => {
        localStorage.removeItem('characterRole');
        localStorage.removeItem('characterImg');
        localStorage.removeItem('characterCreatedAt');
        localStorage.removeItem('characterName');
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
  const settingBtn = document.querySelector('.settings-fixed-btn');

  if (savedRole) {
    homeBtn.style.display = 'block';
    gameLogo.style.display = 'none';
    dustVideo.style.display = 'none';
    bgImage.style.display = 'none';
    settingBtn.style.display = 'block';
    if (playbookMenu) playbookMenu.style.display = 'none';
    if (headingTitle) headingTitle.style.display = 'none';
    if (subTitle) subTitle.style.display = 'none';
    if (subTitle2) subTitle2.style.display = 'block';
    if (subTitle3) subTitle3.style.display = 'none';
    if (titleSec) titleSec.style.display = 'none';
  } else {
    homeBtn.style.display = 'none';
    gameLogo.style.display = 'block';
    dustVideo.style.display = 'block';
    bgImage.style.display = 'block';
    settingBtn.style.display = 'none';
    if (playbookMenu) playbookMenu.style.display = 'block';
    if (headingTitle) headingTitle.style.display = 'block';
    if (subTitle) subTitle.style.display = 'block';
    if (subTitle2) subTitle2.style.display = 'none';
    if (subTitle3) subTitle3.style.display = 'block';
  }


  
const playbookBtn = document.getElementById('playbookBtn');
const versusBtn = document.getElementById('versusBtn');
const itemshopBtn = document.getElementById('itemshopBtn');

if (playbookBtn) {
  playbookBtn.addEventListener('click', () => {
    window.location.href = 'playbook.html';
  });
}

if (versusBtn) {
  versusBtn.addEventListener('click', () => {
    window.location.href = 'dice.html';
  });
}

if (itemshopBtn) {
  itemshopBtn.addEventListener('click', () => {
    window.location.href = 'shop.html';
  });
}

const body = document.body;

if (savedRole === '전사') {
  body.classList.add('warrior');
} else if (savedRole === '궁수') {
  body.classList.add('archer');
} else if (savedRole === '도적') {
  body.classList.add('thief');
}



  const diceBtn = document.querySelector('.dice-btn');
  const diceModal = document.getElementById('diceModal');
  const diceText = document.getElementById('diceText');
  const diceConfirmBtn = document.getElementById('diceConfirmBtn');
  const diceSound = document.getElementById('dice_roll_sound2');

  let diceAnimationInterval = null;

  diceBtn.addEventListener('click', () => {
    diceText.classList.remove('dice-result-big');
    diceText.textContent = '주사위 굴리는 중';
    diceConfirmBtn.classList.add('hidden');
    diceModal.classList.add('show');

    // 효과음 재생
    diceSound.currentTime = 0;
    diceSound.play();

    // 점점 늘어나는 ... 애니메이션
    let dotCount = 0;
    diceAnimationInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4; // 0~3
      diceText.textContent = '주사위 굴리는 중' + '.'.repeat(dotCount);
    }, 500);

    // 3초 후 결과 표시
    setTimeout(() => {
    clearInterval(diceAnimationInterval); // 애니메이션 종료
    const result = Math.floor(Math.random() * 6) + 1;
    diceText.textContent = `${result}`;
    diceText.classList.add('dice-result-big');  // 🎯 강조 클래스 추가
    diceConfirmBtn.classList.remove('hidden');
  }, 1500);

  });

  diceConfirmBtn.addEventListener('click', () => {
    diceModal.classList.remove('show');
  });

});


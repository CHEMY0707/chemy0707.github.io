const jobDescriptionMap = {
  '전사': '최고의 공격과 방어, 둔하지만 맞서 싸우는 타입',
  '궁수': '빠르고 민첩함, 원거리 공격과 회피 특화',
  '도적': '빠른 기습과 회피, 트릭성 플레이 특화'
};



// 📌 슬라이드 드래그 및 버튼 이동 포함 + 선택된 카드 표시 + 저장
const sliderFrame = document.querySelector('.character-slider-wrapper');
const sliderInner = document.getElementById('characterSlider');
const options = sliderInner.querySelectorAll('.character-option');
let currentIndex = 0;
const offset = 254;

let isDragging = false;
let startX = 0;
let currentX = 0;
let movedX = 0;

sliderFrame.addEventListener('touchstart', dragStart);
sliderFrame.addEventListener('touchmove', dragMove);
sliderFrame.addEventListener('touchend', dragEnd);
sliderFrame.addEventListener('mousedown', dragStart);
sliderFrame.addEventListener('mousemove', dragMove);
sliderFrame.addEventListener('mouseup', dragEnd);
sliderFrame.addEventListener('mouseleave', dragEnd);

function dragStart(e) {
  isDragging = true;
  startX = getPositionX(e);
}

function dragMove(e) {
  if (!isDragging) return;
  currentX = getPositionX(e);
  movedX = currentX - startX;
}

function dragEnd() {
  if (!isDragging) return;
  isDragging = false;
  if (movedX < -50 && currentIndex < options.length - 1) {
    currentIndex++;
  } else if (movedX > 50 && currentIndex > 0) {
    currentIndex--;
  }
  update3DSlider();
  movedX = 0;
}

function getPositionX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}



function update3DSlider() {
  options.forEach((opt, i) => {
    const position = i - currentIndex;
    const translateOffset = position * offset;
    const rotateY = position === 0 ? 0 : (position > 0 ? -30 : 30);
    const scale = position === 0 ? 1 : 0.9;

    // 카드 위치 조정 (부모)
    const optionTransform = `translateX(calc(-50% + ${translateOffset}px)) rotateY(${rotateY}deg)`;

    // 이미지에 적용할 transform (translateX는 제거!)
    const imageTransform = `rotateY(${rotateY}deg) scale(${scale})`;

    if (Math.abs(position) > 2) {
      opt.style.opacity = '0';
      opt.style.zIndex = '0';
      opt.classList.remove('selected');
      opt.style.transform = 'translateX(-50%) scale(0.95)';

      const img = opt.querySelector('img');
      if (img) img.style.transform = 'scale(0.95)';
      
    } else {
      opt.style.opacity = position === 0 ? '1' : '0.5'
      opt.style.zIndex = position === 0 ? 10 : 5;
      opt.classList.toggle('selected', position === 0);
      opt.style.transform = optionTransform;

      const img = opt.querySelector('img');
      if (img) img.style.transform = imageTransform;
    }
  });

  updateJobDescription();

}



document.getElementById('prevSlide').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    update3DSlider();
  }
});

document.getElementById('nextSlide').addEventListener('click', () => {
  if (currentIndex < options.length - 1) {
    currentIndex++;
    update3DSlider();
  }
});

update3DSlider();

function updateJobDescription() {
  const descriptionEl = document.getElementById('jobDescription'); // 이 id 가진 div 있어야 함
  if (!descriptionEl) return;

  const selected = document.querySelector('.character-option.selected');
  const role = selected?.getAttribute('data-role');

  if (window.innerHeight > 900 && role && jobDescriptionMap[role]) {
    descriptionEl.textContent = jobDescriptionMap[role];
    descriptionEl.style.display = 'block';
  } else {
    descriptionEl.style.display = 'none';
  }
}




// 📌 저장 기능 연동
const form = document.getElementById('characterForm');
const input = document.getElementById('characterName');
const createdDate = new Date().toLocaleDateString();
localStorage.setItem('characterCreatedAt', createdDate);


form.addEventListener('submit', function (event) {
  event.preventDefault();

  const nickname = input.value.trim();
  const selectedCard = document.querySelector('.character-option.selected');
  const selectedRole = selectedCard ? selectedCard.getAttribute('data-role') : null;
  const selectedImg = selectedCard ? selectedCard.querySelector('img')?.getAttribute('src') : '';
  const createdAt = new Date().toISOString().slice(0, 10);


  localStorage.setItem('characterName', nickname);
  localStorage.setItem('characterRole', selectedRole);
  localStorage.setItem('characterImg', selectedImg || '');
  localStorage.setItem('characterCreatedAt', createdAt);


  window.location.href = 'index.html';
});

// 모달 함수 추가
window.showModal = function (message, onConfirm, onCancel) {
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
};

document.addEventListener('DOMContentLoaded', () => {

    
    const toggleBtn = document.getElementById('settings-toggle');
    const settingModal = document.querySelector('.settings-modal');
    const modalContent = document.querySelector('.settings-content');

    toggleBtn.addEventListener('click', () => {
        settingModal.classList.toggle('show');
    });

    // 배경 클릭 시 닫기
    settingModal.addEventListener('click', (e) => {
    if (e.target === settingModal) {
        settingModal.classList.remove('show');
    }
    });

    // 내부 클릭 시 전파 방지
    if (modalContent) {
    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    }


    // 사운드 토글
    const soundBtn = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    let isMuted = false;

    soundBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        soundIcon.src = isMuted ? './images/sound-off.png' : './images/sound-on.png';
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => {
            audio.muted = isMuted;
        });
    });

    // 캐릭터 초기화 버튼 (모달 내)
    const modalResetBtn = document.getElementById('resetCharacterInModal');
    if (modalResetBtn) {
        modalResetBtn.addEventListener('click', () => {
            showModal('진행중인 캐릭터 정보를 영구히 초기화하시겠습니까?', () => {
                localStorage.removeItem('characterName');
                localStorage.removeItem('characterRole');
                localStorage.removeItem('characterImg');
                localStorage.removeItem('characterCreatedAt');
                window.location.href = 'character.html';
            });
        });
    }

    // 플레이북 버튼
    const playbookBtn = document.getElementById('playbook-btn');
    if (playbookBtn) {
        playbookBtn.addEventListener('click', () => {
            window.location.href = 'playbook.html';
        });
    }

    const Cardcontainer = document.getElementById('characterCardContainer');
    if (!Cardcontainer) return;

    const aspectRatio = window.innerHeight / window.innerWidth;

    if (aspectRatio >= 2) {
      // 세로가 긴 경우
        Cardcontainer.style.height = '70vh';
    } else {
      // 일반 비율 이하
        Cardcontainer.style.height = '64vh';
    }
});
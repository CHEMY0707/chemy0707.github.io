document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('settings-toggle');
    const modal = document.getElementById('settings-modal');

    // 모달 열기/닫기
    toggleBtn.addEventListener('click', () => {
        modal.classList.toggle('hidden');
    });

    // 사운드 토글
    const soundBtn = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    let isMuted = false;

    soundBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        // 아이콘 변경
        soundIcon.src = isMuted ? './images/sound-off.png' : './images/sound-on.png';
        // 효과음 음소거 처리 (예: 전체 오디오 태그에 반영)
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => {
            audio.muted = isMuted;
        });
    });
    
    // 캐릭터 초기화 버튼
    const resetBtn = document.getElementById('reset-character-btn');
    resetBtn.addEventListener('click', () => {
        // 기존 초기화 기능 호출
        if (typeof resetCharacter === 'function') {
            resetCharacter();
        } else {
            alert('초기화 함수가 연결되지 않았어요.');
        }
    });

    // 플레이북 버튼
    const playbookBtn = document.getElementById('playbook-btn');
    playbookBtn.addEventListener('click', () => {
        window.open('./images/playbook_1.png', '_blank');
    });
});

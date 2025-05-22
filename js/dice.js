const savedRole = localStorage.getItem('characterRole');
const savedPlayerHp = parseInt(localStorage.getItem('playerHp'), 10);
const savedMonsterHp = parseInt(localStorage.getItem('monsterHp'), 10);

const roleStats = {
    '전사': { hp: 7 },
    '궁수': { hp: 6 },
    '도적': { hp: 5 }
};

let playerHp = !isNaN(savedPlayerHp) ? savedPlayerHp : (roleStats[savedRole]?.hp || 5);
let monsterHp = !isNaN(savedMonsterHp) ? savedMonsterHp : 0;


const monsterStats = {
    '고블린': { hp: 3, img: './images/monster_profile_goblin.png' },
    '스켈레톤': { hp: 3, img: './images/monster_profile_skelleton.png' },
    '그린슬라임': { hp: 4, img: './images/monster_profile_.png' },
    '소악마 룰루': { hp: 3, img: './images/monster_profile_.png' },
    '스켈레톤 메이지': { hp: 5, img: './images/monster_profile_skelletonmage.png' },
    '마물병사': { hp: 5, img: './images/monster_profile_monstersoldier.png' },
    '돌 골렘': { hp: 5, img: './images/monster_profile_stonegollem.png' },
    '물약몬스터': { hp: 1, img: './images/monster_profile_.png' },
    '늑대인간': { hp: 8, img: './images/monster_profile_wolf.png' },
    '타락한 드루이드': { hp: 9, img: './images/monster_profile_druid.png' }
};


var g_dice_count=1;

        var g_audio_player=new Array();
        var g_prev_number=[];
		var rerall_all_f=false;

        g_audio_player["dice_roll"] = document.getElementById("dice_roll_sound");



        function cng_cnt(a){
            dice_cnt=a;
            $("#div_raffle_data").html("");
            for (i=0; i< dice_cnt ;i++ )
            {
            make_dice(i);
            }
        }
        function reroll_all(){
			rerall_all_f=true;
			
				$("#history_list").prepend("-----------<br>");
            for (i=0; i< dice_cnt ;i++ )
            {
                rollDice(dice_cnt-i-1);
            }
				
				$("#history_list").prepend("-----------<br>");
			rerall_all_f=false;
        }


        //range button
        $(".number-spinner button").mousedown(function () {
            btn = $(this);
            input = btn.closest('.number-spinner').find('.bold');
            btn.closest('.number-spinner').find('button').prop("disabled", false);

            if (btn.attr('data-dir') == 'up') {
                if ( input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max')) ) {
                    input.val(parseInt(input.pVal())+1);
                }else{
                    btn.prop("disabled", true);
                    clearInterval(action);
                }
            } else {
                if ( input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min')) ) {
                    input.val(parseInt(input.pVal())-1);
                }else{
                    btn.prop("disabled", true);
                    clearInterval(action);
                }
            }
        });

        function make_dice(i, containerId, side) {
            const diceId = `dice_${i}`;
            let sentence = `<div id="${diceId}" class="dice dice-one">`;

            sentence += "<div id='dice-one-side-one' class='side one'>";
            sentence += "<div class='dice_dot_red one-1'></div></div>";

            sentence += "<div id='dice-one-side-two' class='side two'>";
            sentence += "<div class='dice_dot two-1'></div>";
            sentence += "<div class='dice_dot two-2'></div></div>";

            sentence += "<div id='dice-one-side-three' class='side three'>";
            sentence += "<div class='dice_dot three-1'></div>";
            sentence += "<div class='dice_dot three-2'></div>";
            sentence += "<div class='dice_dot three-3'></div></div>";

            sentence += "<div id='dice-one-side-four' class='side four'>";
            sentence += "<div class='dice_dot four-1'></div>";
            sentence += "<div class='dice_dot four-2'></div>";
            sentence += "<div class='dice_dot four-3'></div>";
            sentence += "<div class='dice_dot four-4'></div></div>";

            sentence += "<div id='dice-one-side-five' class='side five'>";
            sentence += "<div class='dice_dot five-1'></div>";
            sentence += "<div class='dice_dot five-2'></div>";
            sentence += "<div class='dice_dot five-3'></div>";
            sentence += "<div class='dice_dot five-4'></div>";
            sentence += "<div class='dice_dot five-5'></div></div>";

            sentence += "<div id='dice-one-side-six' class='side six'>";
            sentence += "<div class='dice_dot_red six-1'></div>";
            sentence += "<div class='dice_dot_red six-2'></div>";
            sentence += "<div class='dice_dot_red six-3'></div>";
            sentence += "<div class='dice_dot_red six-4'></div>";
            sentence += "<div class='dice_dot_red six-5'></div>";
            sentence += "<div class='dice_dot_red six-6'></div></div></div>";

            $(`#${containerId}`).append(sentence);
            $(`#${diceId}`).on("click", () => {
                if ((side === 'monster' && currentTurn !== 'monster') ||
                    (side === 'player' && currentTurn !== 'player')) {
                return; // 턴이 아니면 무시
                }
                rollDice(i);
            });
        }

		function rollDice(i) {
			let today = new Date();   

            const audio = document.getElementById("dice_roll_sound");
            audio.currentTime = 0;
            audio.play().catch(e => console.warn("음원 재생 실패:", e));

			var elDiceOne = document.getElementById('dice_' + i);
			var dice = Math.floor((Math.random() * 6) + 1);
			while (g_prev_number[i] == dice) {
				dice = Math.floor((Math.random() * 6) + 1);
			}
			g_prev_number[i] = dice;
			// 주사위를 굴린 후 눈금을 설정
			for (var j = 1; j <= 6; j++) {
				elDiceOne.classList.remove('show-' + j);
				if (dice === j) {
					elDiceOne.classList.add('show-' + j);
				}
			}
			if(rerall_all_f){$("#history_list").prepend(today.toLocaleString()+"&nbsp;&nbsp;&nbsp;"+"눈금 : " +dice + "<br>");
			}else{
				$("#history_list").prepend(today.toLocaleString()+"&nbsp;&nbsp;&nbsp;"+"눈금 : " +dice + "<br>");
				$("#history_list").prepend("<br>");
			}

            setTimeout(() => {
                const resultModal = document.getElementById("diceResultModal");
                const resultMessage = document.getElementById("diceResultMessage");
                const resultOk = document.getElementById("diceModalOk");

                resultMessage.textContent = `${dice}`;
                resultModal.classList.remove("hidden");

                resultOk.onclick = () => {
                    resultModal.classList.add("hidden");
                };
                }, 1000); // 회전 애니메이션이 끝나는 1초 후 표시
			
		}

		function getCurrentDiceValue(diceElement) {
			for (var i = 1; i <= 6; i++) {
				if (diceElement.classList.contains('show-' + i)) {
					return i;
				}
			}
			return null;
		}

        function isInteger(x) {
            return (typeof x === 'number') && (x % 1 === 0);
        }

        // document.getElementById("showHistoryBtn").addEventListener("click", function () {
        //     const rawHistory = document.getElementById("history_list").innerHTML;
        //     const historyModal = document.getElementById("historyModal");
        //     const historyContent = document.getElementById("historyContent");
        //     const closeBtn = document.getElementById("historyModalOk");

        //     historyContent.innerHTML = rawHistory || "아직 주사위 기록이 없습니다.";
        //     historyModal.classList.remove("hidden");

        //     closeBtn.onclick = () => {
        //         historyModal.classList.add("hidden");
        //     };
        // });

let currentTurn = 'monster';

function setTurn(turn) {
    currentTurn = turn;

    const monsterCard = document.querySelector('.monster-side .character-card');
    const playerCard = document.querySelector('.adventurer-side .character-card');

    if (turn === 'monster') {
        monsterCard.classList.add('active');
        monsterCard.classList.remove('inactive');
        playerCard.classList.remove('active');
        playerCard.classList.add('inactive');
    } else {
        playerCard.classList.add('active');
        playerCard.classList.remove('inactive');
        monsterCard.classList.remove('active');
        monsterCard.classList.add('inactive');
    }
}

// 버튼 이벤트 연결
document.getElementById('monsterAttackBtn').addEventListener('click', () => {
    setTurn('monster');
});

document.getElementById('playerDefenseBtn').addEventListener('click', () => {
    setTurn('player');
});

const savedProfileImg = localStorage.getItem('characterProfileImg');
document.getElementById('adventurerProfileCard').src = savedProfileImg || './images/default_profile.png';

function renderHp(targetElement, hpValue) {
    if (!targetElement) return;

    const maxHp = 10;
    targetElement.innerHTML = '';
    for (let i = 0; i < maxHp; i++) {
        const heart = document.createElement('img');
        heart.src = i < hpValue ? './images/heart_filled.svg' : './images/heart_empty.svg';
        heart.style.width = '9.6%';
        heart.style.maxWidth = '2rem';
        targetElement.appendChild(heart);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const monsterImg = document.getElementById('monsterProfileCard');
    const placeholder = document.getElementById('monsterPlaceholderText');

    // 1) 초깃값 렌더
    renderHp(document.getElementById('hpContainer-adventurer'), playerHp);
    renderHp(document.getElementById('hpContainer-monster'), monsterHp);
    
    function updateMonsterCardUI() {
        if (!localStorage.getItem('monsterHp') || monsterHp === 0) {
            monsterImg.classList.add('placeholder');
            monsterImg.removeAttribute('src');
            placeholder.style.display = 'flex';
        } else {
            monsterImg.classList.remove('placeholder');
            placeholder.style.display = 'block';
        }
    }

// 초기 렌더링
updateMonsterCardUI();

    // 2) 플레이어 HP 버튼
    document.getElementById('increaseHp-adventurer').addEventListener('click', () => {
        if (playerHp < 10) {
        playerHp++;
        localStorage.setItem('playerHp', playerHp);
        renderHp(document.getElementById('hpContainer-adventurer'), playerHp);
        }
    });
    document.getElementById('decreaseHp-adventurer').addEventListener('click', () => {
        if (playerHp > 0) {
        playerHp--;
        localStorage.setItem('playerHp', playerHp);
        renderHp(document.getElementById('hpContainer-adventurer'), playerHp);
        }
    });

    // 3) 몬스터 HP 버튼
    document.getElementById('increaseHp-monster').addEventListener('click', () => {
        if (monsterHp < 10) {
        monsterHp++;
        localStorage.setItem('monsterHp', monsterHp);
        renderHp(document.getElementById('hpContainer-monster'), monsterHp);
        }
    });
    document.getElementById('decreaseHp-monster').addEventListener('click', () => {
        if (monsterHp > 0) {
        monsterHp--;
        localStorage.setItem('monsterHp', monsterHp);
        renderHp(document.getElementById('hpContainer-monster'), monsterHp);
        }
    });

    // 4) 몬스터 선택 모달 열기
    document.getElementById('monsterCardWrapper').addEventListener('click', () => {
        document.getElementById('monsterSelectModal').classList.add('active');
    });

    // 몬스터 선택 시 업데이트
    document.querySelectorAll('.monster-option').forEach(option => {
        option.addEventListener('click', () => {
            const name = option.dataset.name;
            const monster = monsterStats[name];
            if (!monster) return;

            monsterImg.src = monster.img;
            monsterImg.classList.remove('placeholder');
            placeholder.style.display = 'none';

            monsterHp = monster.hp;
            localStorage.setItem('monsterHp', monsterHp);
            renderHp(document.getElementById('hpContainer-monster'), monsterHp);

            document.getElementById('monsterSelectModal').classList.remove('active');
        });
    });


    // 6) 주사위, 턴 등 기존 로직 초기화
    make_dice(0, 'dice-monster', 'monster');
    make_dice(1, 'dice-adventurer', 'player');
    g_prev_number[0] = 1; g_prev_number[1] = 1;
    setTurn('monster');
});

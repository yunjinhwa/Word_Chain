//요소 불러오기
let number = Number(prompt('참가자는 몇명인가요?'));
const input = document.querySelector('input');
const button = document.querySelector('button');
const wordEl = document.querySelector('#word');
const orderEl = document.querySelector('#order');

// 새로 추가: 화면 전환용 요소
const gameEl   = document.getElementById('game');
const resultEl = document.getElementById('result');
const resultH1 = resultEl.querySelector('h1');

// 결과 영역은 처음에 숨김
resultEl.style.display = 'none';

//참가자 이름 저장
const player_name = [];
for(let i = 0; i < number; i++) {
    let name = prompt('참가자 이름을 입력해주세요(입력된 순서대로 게임이 진행됩니다)');
    player_name[i] = name;
}

//참가자 순서
let order = 0;
orderEl.textContent = player_name[order];

//기존 단어와 새로 입력될 단어 저장
let newWord;
let word;
let TDB = [];

//단어가 입력되면 새로운 단어에 저장
const onInput = function(event) {
    newWord = event.target.value;
}

//버튼이 클릭되었을 때 조건에 해당되는 단어인지 판별
const onClickButton = () => {
    //마지막 단어와 입력된 단어가 이어지는가?
    if(!word || word.at(-1) === newWord[0]) {
        if(TDB.indexOf(newWord) === -1){
            word = newWord;
            TDB[TDB.length] = word;
            wordEl.textContent = word;
            if(order + 1 >= number) {
                orderEl.textContent = player_name[0];
                order = 0;
            }
            else {
                orderEl.textContent = player_name[order + 1];
                order++;
            }
        }
        else{
            alert('이미 사용된 단어입니다.');
            player_over();
        }
    }
    //조건에 맞지 않을 경우
    else {
        alert('틀린 단어입니다!');
        player_over();
    }

    input.value = '';
    input.focus();
};

const onEnterButton = (e) => {
    if(e.key === "Enter") {
        button.click();
    }
};

function player_over() {
    alert('탈락하셨습니다');
    player_name.splice(order, 1);
    number--;

    if(number <= 1) {
        gameEl.style.display = 'none';
        resultEl.style.display = 'flex';
        resultH1.innerHTML = `우승자는 ${player_name[0]}님입니다.`;
        return; // 뒤 로직 실행 막기
    }

    if(order >= number) order = 0;
    orderEl.textContent = player_name[order];
}

//함수 호출
input.addEventListener('input', onInput);
button.addEventListener('click', onClickButton);
input.addEventListener('keydown', onEnterButton);

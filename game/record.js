document.addEventListener('DOMContentLoaded', function() {
    // localStorage에서 배경 이미지 가져오기
    const savedBackground = localStorage.getItem('selectedBackground');

    // 배경 이미지 설정
    if (savedBackground) {
        document.body.style.backgroundImage = `url('${savedBackground}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    }

    // 게임 기록을 로드하여 표시
    const score = localStorage.getItem('lastScore');
    const time = localStorage.getItem('lastTime');
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalTime').textContent = time;

    loadHighScores(); // 기록 로드 및 표시
});

document.getElementById('saveButton').addEventListener('click', function() {
    const initials = document.getElementById('initials').value.toUpperCase();
    const score = localStorage.getItem('lastScore');
    const time = localStorage.getItem('lastTime');
    if (initials.length === 3) {
        saveRecord(initials, score, time);
        window.location.href = 'start.html';  // 첫 화면으로 돌아가기
    } else {
        alert('이니셜을 3글자로 입력해 주세요.');
    }
});

document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'start.html';  // 첫 화면으로 돌아가기
});

function saveRecord(initials, score, time) {
    // 기존 기록 불러오기
    let records = JSON.parse(localStorage.getItem('highScores')) || [];
    
    // 새로운 기록 추가
    records.push({ initials, score: parseInt(score), time: parseInt(time) });
    
    // 점수 순으로 정렬 (파괴한 장애물 수 기준 내림차순)
    records.sort((a, b) => b.score - a.score);
    
    // 최대 10개의 기록만 유지
    records = records.slice(0, 10);
    
    // 기록 저장
    localStorage.setItem('highScores', JSON.stringify(records));
}

function loadHighScores() {
    const highScoresList = document.getElementById('highScores');
    const records = JSON.parse(localStorage.getItem('highScores')) || [];
    
    highScoresList.innerHTML = ''; // 기존 내용 초기화
    
    records.forEach((record, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${record.initials} - ${record.score} 을 해치웠다!`;
        highScoresList.appendChild(li);
    });
}

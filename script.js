// script.js

document.addEventListener('DOMContentLoaded', function() {
    const weddingDate = new Date('2024-10-05T12:00:00');

    // D-Day 계산 및 표시
    updateCountdown(weddingDate);

    // FullCalendar 초기화 및 이벤트 추가
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: '2024-10-01',
        locale: 'ko',
        events: [
            {
                title: '결혼식',
                start: '2024-10-05',
                end: '2024-10-05',
                color: '#ff69b4', // 색상 지정
                textColor: '#ffffff'
            }
        ]
    });
    calendar.render();

    // D-Day 타이머 업데이트
    setInterval(() => updateCountdown(weddingDate), 1000);
});

function updateCountdown(weddingDate) {
    const now = new Date();
    const timeDifference = weddingDate - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `D-Day: ${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남았습니다.`;

    if (timeDifference < 0) {
        clearInterval(this);
        document.getElementById('countdown').innerHTML = "축하합니다! 오늘은 결혼식 날입니다!";
    }
}

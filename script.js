// script.js

document.addEventListener('DOMContentLoaded', function() {
    const weddingDate = new Date('2024-10-05T12:00:00');

    // D-Day 계산 및 표시
    updateCountdown(weddingDate);

    // 달력 생성 및 표시
    const calendarContainer = document.getElementById('calendar');
    createCalendar(calendarContainer, 2024, 9); // 9월은 10월을 나타냄 (0부터 시작)

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

function createCalendar(container, year, month) {
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const lastDay = new Date(year, month + 1, 0).getDate(); // 해당 월의 마지막 날짜
    const firstDay = new Date(year, month, 1).getDay(); // 해당 월의 첫 번째 날의 요일

    // 요일 이름 추가
    dayNames.forEach(dayName => {
        const dayDiv = document.createElement('div');
        dayDiv.innerText = dayName;
        dayDiv.classList.add('day-name');
        container.appendChild(dayDiv);
    });

    // 첫 번째 주 빈칸 채우기
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        container.appendChild(emptyDiv);
    }

    // 날짜 추가
    for (let date = 1; date <= lastDay; date++) {
        const dateDiv = document.createElement('div');
        dateDiv.innerText = date;
        if (date === 5) { // 결혼식 날짜 강조
            dateDiv.classList.add('highlight');
        }
        container.appendChild(dateDiv);
    }
}

function initMap() {
    const mapOptions = {
        center: { lat: 37.653205, lng: 126.853228 }, // 파노라마 베이커리 카페 야 좌표
        zoom: 15
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const marker = new google.maps.Marker({
        position: mapOptions.center,
        map: map
    });
}

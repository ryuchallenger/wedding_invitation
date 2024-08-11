function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(37.6543021, 126.9352783), // 결혼식장 좌표
        zoom: 15,
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(37.6543021, 126.9352783),
        map: map,
        title: "파노라마 베이커리 카페"
    });
}

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
                color: '#b2a9e8', // 색상 지정
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
    const timeDifference = now - weddingDate; // 시간 차이 계산

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    let message;
    if (timeDifference >= 0) {
        // 결혼식 이후의 경과 시간
        message = `부부가 된 후, ${days}일 ${hours}시간 ${minutes}분 ${seconds}초 지났습니다.`;
    } else {
        // 결혼식 전까지 남은 시간
        const absTimeDifference = Math.abs(timeDifference);
        const absDays = Math.floor(absTimeDifference / (1000 * 60 * 60 * 24));
        const absHours = Math.floor((absTimeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const absMinutes = Math.floor((absTimeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const absSeconds = Math.floor((absTimeDifference % (1000 * 60)) / 1000);
        message = `결혼식까지, ${absDays}일 ${absHours}시간 ${absMinutes}분 ${absSeconds}초 남았습니다.`;
    }

    document.getElementById('countdown').innerHTML = message;
}

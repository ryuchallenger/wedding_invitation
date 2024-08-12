document.addEventListener('DOMContentLoaded', function() {
    // TMap 지도 초기화
    var map = new Tmapv2.Map("map", {
        center: new Tmapv2.LatLng(37.6543021, 126.9352783), // 결혼식장 좌표
        zoom: 15
    });

    // 마커 추가
    var marker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(37.6543021, 126.9352783),
        map: map,
        title: "파노라마 베이커리 카페"
    });

    // 결혼식 날짜 타이머
    const weddingDate = new Date('2024-10-05T12:00:00');
    updateCountdown(weddingDate);
    setInterval(() => updateCountdown(weddingDate), 1000);

    // Heart icon 클릭 시 "마음 전하실 곳" 페이지 열기
    const heartIcon = document.querySelector('.heart-icon');
    heartIcon.addEventListener('click', function() {
        window.location.href = 'donation.html'; // 새로운 HTML 페이지로 이동
    });

    // 꽃잎 애니메이션 생성
    generatePetals(30); // 생성할 꽃잎 수
});

function updateCountdown(weddingDate) {
    const now = new Date();
    const timeDifference = weddingDate - now; // 시간 차이 계산

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    let message;
    if (timeDifference >= 0) {
        // 결혼식 전까지 남은 시간
        message = `결혼식까지, ${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남았습니다.`;
    } else {
        // 결혼식 이후의 경과 시간
        message = `부부가 된 지, ${days}일 ${hours}시간 ${minutes}분 ${seconds}초 지났습니다.`;
    }

    document.getElementById('countdown').innerHTML = message;
}

function generatePetals(num) {
    const petalContainer = document.querySelector('.petal-container');

    for (let i = 0; i < num; i++) {
        let petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 3 + 2}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petalContainer.appendChild(petal);
    }
}

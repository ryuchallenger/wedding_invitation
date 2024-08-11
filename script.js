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

    // 신랑측 계좌번호 클릭 시
    document.getElementById('groom-account').addEventListener('click', function() {
        const details = document.getElementById('groom-account-details');
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    });

    // 신부측 계좌번호 클릭 시
    document.getElementById('bride-account').addEventListener('click', function() {
        const details = document.getElementById('bride-account-details');
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    });

    // "복사하기" 버튼 클릭 시 계좌번호 복사 기능
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', function() {
            const accountText = button.getAttribute('data-account');
            copyToClipboard(accountText);
        });
    });
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

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('계좌번호가 클립보드에 복사되었습니다!');
    }).catch(err => {
        console.error('클립보드 복사 실패: ', err);
    });
}

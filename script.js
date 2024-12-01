document.addEventListener('DOMContentLoaded', function() {

    // 결혼식 날짜 타이머
    const weddingDate = new Date('2024-10-05T12:00:00');
    updateCountdown(weddingDate);
    setInterval(() => updateCountdown(weddingDate), 1000);
    
    // Heart icon 클릭 시 "마음 전하실 곳" 페이지 열기
    const heartIcon = document.querySelector('.heart-icon');
    if (heartIcon) {
        heartIcon.addEventListener('click', function() {
            window.location.href = 'donation.html';
        });
    } else {
        console.error('Heart icon not found');
    }
    
    // Invitation icon 클릭 시 "종이청첩장" 페이지 열기
    const InvitationIcon = document.querySelector('.invitation-icon');
    if (InvitationIcon) {
        InvitationIcon.addEventListener('click', function() {
            window.location.href = 'invitation.html';
        });
    } else {
        console.error('Invitation icon not found');
    }
    
    // Photoalbum icon 클릭 시 "결혼식사진" 페이지 열기
    const PhotoalbumIcon = document.querySelector('.photoalbum-icon');
    if (PhotoalbumIcon) {
        PhotoalbumIcon.addEventListener('click', function() {
            window.location.href = 'photoalbum.html';
        });
    } else {
        console.error('Photoalbum icon not found');
    }
});

    // 꽃잎 애니메이션 생성
    generatePetals(20); // 생성할 꽃잎 수



function updateCountdown(weddingDate) {
    const now = new Date();
    const timeDifference = now - weddingDate; // 시간 차이 계산

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    let message;
    if (timeDifference <= 0) {
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
        petal.style.animationDuration = `${Math.random() * 10 + 5}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petalContainer.appendChild(petal);
    }
}

// 이미지 폴더와 파일 이름을 자동으로 로드
const gallery = document.getElementById("gallery");
const imageFolder = "photoalbum"; // 이미지 폴더 경로
const imageCount = 2; // 폴더 안의 이미지 파일 수
const imageExtension = "JPG"; // 이미지 확장자 (예: jpg, png 등)

// 이미지 로드 및 추가
for (let i = 1; i <= imageCount; i++) {
    const img = document.createElement("img");
    img.src = `${imageFolder}/photo${i}.${imageExtension}`;
    img.alt = `Photo ${i}`;
    gallery.appendChild(img);
}

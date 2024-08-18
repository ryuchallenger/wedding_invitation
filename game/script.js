document.addEventListener('DOMContentLoaded', function() {
    // 배경 이미지 후보 배열을 생성
    const backgrounds = [
        'universe.jpg',
        'Ocean.jpg',
        'field.jpg'
    ];

    // 랜덤으로 배경 이미지 선택
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    // 선택된 이미지를 배경으로 설정
    document.body.style.backgroundImage = `url('${randomBackground}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
});


const gameContainer = document.getElementById('gameContainer');
const player = document.getElementById('player');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');

let gameOver = false;
let score = 0;
let startTime = Date.now();

function movePlayer(x, y) {
    if (gameOver) return;

    const rect = gameContainer.getBoundingClientRect();
    const mouseX = x - rect.left;
    const mouseY = y - rect.top;

    player.style.left = `${mouseX - player.clientWidth / 2}px`;
    player.style.top = `${mouseY - player.clientHeight / 2}px`;
}

gameContainer.addEventListener('mousemove', (event) => {
    movePlayer(event.clientX, event.clientY);
});

gameContainer.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    movePlayer(touch.clientX, touch.clientY);
});

gameContainer.addEventListener('click', () => {
    if (gameOver) return;

    fireMissile('up');
    fireMissile('down');
    fireMissile('left');
    fireMissile('right');
});

gameContainer.addEventListener('touchstart', (event) => {
    event.preventDefault(); // 터치 이벤트가 브라우저 기본 동작을 방해하지 않도록 설정
    if (gameOver) return;

    fireMissile('up');
    fireMissile('down');
    fireMissile('left');
    fireMissile('right');
});

function fireMissile(direction) {
    const missile = document.createElement('div');
    missile.classList.add('missile');

    const playerRect = player.getBoundingClientRect();

    missile.style.left = `${playerRect.left + playerRect.width / 2 - 5}px`;
    missile.style.top = `${playerRect.top + playerRect.height / 2 - 5}px`;

    gameContainer.appendChild(missile);

    function moveMissile() {
        if (gameOver) return;

        const missileX = parseFloat(missile.style.left);
        const missileY = parseFloat(missile.style.top);

        switch (direction) {
            case 'up':
                missile.style.top = `${missileY - 5}px`;
                break;
            case 'down':
                missile.style.top = `${missileY + 5}px`;
                break;
            case 'left':
                missile.style.left = `${missileX - 5}px`;
                break;
            case 'right':
                missile.style.left = `${missileX + 5}px`;
                break;
        }

        if (
            missileX < 0 || missileX > gameContainer.clientWidth ||
            missileY < 0 || missileY > gameContainer.clientHeight
        ) {
            missile.remove();
        } else {
            const obstacles = document.querySelectorAll('.obstacle');
            obstacles.forEach(obstacle => {
                const obstacleRect = obstacle.getBoundingClientRect();

                if (
                    missileX < obstacleRect.right &&
                    missileX + 10 > obstacleRect.left &&
                    missileY < obstacleRect.bottom &&
                    missileY + 10 > obstacleRect.top
                ) {
                    obstacle.remove();
                    missile.remove();
                    score++;
                    scoreElement.textContent = score;
                }
            });

            requestAnimationFrame(moveMissile);
        }
    }

    moveMissile();
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');

    const size = Math.random() * 50 + 20;
    obstacle.style.width = `${size}px`;
    obstacle.style.height = `${size}px`;

    const side = Math.floor(Math.random() * 4);
    let startX, startY, targetX, targetY;

    switch (side) {
        case 0:
            startX = Math.random() * gameContainer.clientWidth;
            startY = -size;
            targetX = Math.random() * gameContainer.clientWidth;
            targetY = gameContainer.clientHeight + size;
            break;
        case 1:
            startX = gameContainer.clientWidth + size;
            startY = Math.random() * gameContainer.clientHeight;
            targetX = -size;
            targetY = Math.random() * gameContainer.clientHeight;
            break;
        case 2:
            startX = Math.random() * gameContainer.clientWidth;
            startY = gameContainer.clientHeight + size;
            targetX = Math.random() * gameContainer.clientWidth;
            targetY = -size;
            break;
        case 3:
            startX = -size;
            startY = Math.random() * gameContainer.clientHeight;
            targetX = gameContainer.clientWidth + size;
            targetY = Math.random() * gameContainer.clientHeight;
            break;
    }

    obstacle.style.left = `${startX}px`;
    obstacle.style.top = `${startY}px`;

    gameContainer.appendChild(obstacle);

    const angle = Math.atan2(targetY - startY, targetX - startX);
    const speed = 3;

    function moveObstacle() {
        if (gameOver) return;

        const obstacleX = parseFloat(obstacle.style.left);
        const obstacleY = parseFloat(obstacle.style.top);

        obstacle.style.left = `${obstacleX + Math.cos(angle) * speed}px`;
        obstacle.style.top = `${obstacleY + Math.sin(angle) * speed}px`;

        if (
            obstacleX < -size || obstacleX > gameContainer.clientWidth + size ||
            obstacleY < -size || obstacleY > gameContainer.clientHeight + size
        ) {
            obstacle.remove();
        } else {
            const playerRect = player.getBoundingClientRect();
            const obstacleRect = obstacle.getBoundingClientRect();

            if (
                playerRect.left < obstacleRect.right &&
                playerRect.right > obstacleRect.left &&
                playerRect.top < obstacleRect.bottom &&
                playerRect.bottom > obstacleRect.top
            ) {
                gameOver = true;
                const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
                // 게임 기록을 localStorage에 저장
                localStorage.setItem('lastScore', score);
                localStorage.setItem('lastTime', elapsedTime);
                setTimeout(() => {
                    window.location.href = 'record.html';  // 기록 페이지로 이동
                }, 100);
                return;
            }

            requestAnimationFrame(moveObstacle);
        }
    }

    moveObstacle();
}

// 장애물 여러 개 동시 생성
function createMultipleObstacles(count) {
    for (let i = 0; i < count; i++) {
        createObstacle();
    }
}

// 100ms마다 3개의 장애물을 생성
setInterval(() => createMultipleObstacles(2), 100);

function updateTime() {
    if (!gameOver) {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timeElement.textContent = elapsedTime;
        requestAnimationFrame(updateTime);
    }
}

updateTime();

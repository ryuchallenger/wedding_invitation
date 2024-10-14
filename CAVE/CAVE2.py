import sys
from random import randint
import pygame
from pygame.locals import QUIT, Rect, KEYDOWN, K_SPACE, MOUSEBUTTONDOWN

pygame.init()
pygame.key.set_repeat(5, 5)
SURFACE = pygame.display.set_mode((800, 600))
FPSCLOCK = pygame.time.Clock()

def reset_game():
    """ 게임 상태를 초기화하는 함수 """
    global walls, ship_y, velocity, score, slope, holes, game_over
    walls = 80
    ship_y = 250
    velocity = 0
    score = 0
    slope = randint(1, 6)
    holes = [Rect(xpos * 10, 100, 10, 400) for xpos in range(walls)]
    game_over = False

def main():
    global walls, ship_y, velocity, score, slope, holes, game_over
    sysfont = pygame.font.SysFont(None, 36)
    ship_image = pygame.image.load("ship.png")
    bang_image = pygame.image.load("bang.png")
    
    reset_game()  # 처음 시작할 때 상태를 초기화

    while True:
        is_space_down = False
        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == KEYDOWN:  # 키보드 입력
                if event.key == K_SPACE:
                    is_space_down = True
                    if game_over:
                        reset_game()  # 게임 오버 상태일 때 스페이스바를 누르면 초기화
            elif event.type == MOUSEBUTTONDOWN:  # 터치나 클릭 감지
                is_space_down = True
                if game_over:
                    reset_game()  # 터치로도 게임 초기화

        # 캐릭터의 이동
        if not game_over:
            score += 10
            velocity += -3 if is_space_down else 3
            ship_y += velocity

            # 동굴을 스크롤
            edge = holes[-1].copy()
            test = edge.move(0, slope)
            if test.top <= 0 or test.bottom >= 600:
                slope = randint(1, 6) * (-1 if slope > 0 else 1)
                edge.inflate_ip(0, -20)
            edge.move_ip(10, slope)
            holes.append(edge)
            del holes[0]
            holes = [x.move(-10, 0) for x in holes]

            # 충돌 체크
            if holes[0].top > ship_y or holes[0].bottom < ship_y + 80:
                game_over = True

        # 그리기
        SURFACE.fill((0, 255, 0))
        for hole in holes:
            pygame.draw.rect(SURFACE, (0, 0, 0), hole)
        SURFACE.blit(ship_image, (0, ship_y))
        score_image = sysfont.render("score is {}".format(score), True, (0, 0, 255))
        SURFACE.blit(score_image, (600, 20))

        if game_over:
            SURFACE.blit(bang_image, (0, ship_y - 40))

        pygame.display.update()
        FPSCLOCK.tick(15)

if __name__ == '__main__':
    main()

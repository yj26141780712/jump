
import { _decorator, Component, Node, Vec3 } from 'cc';
import { Board } from './board';
import { Constants } from './constants';
import { Game } from './game';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ball
 * DateTime = Mon Feb 14 2022 09:51:23 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = ball.ts
 * FileBasenameNoExtension = ball
 * URL = db://assets/scripts/game/ball.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('ball')
export class Ball extends Component {

    jumpState = Constants.BALL_JUMP_STATE.JUMPUP;
    currentPos = new Vec3();
    timeScale = 0;
    game: Game;
    currentBoard: Board;
    currentIndex = 0;
    tempPos = new Vec3();
    // 是否处于弹簧跳状态
    isJumpSpring = false;
    currJumpFrame = 0;

    start() {
        // [3]
        this.reset();
    }

    reset() {
        //初始化小球位置
        this.currentPos.set(Constants.BOARD_INIT_POS);
        this.currentPos.y += Constants.BALL_RADIUS + Constants.BOARD_HEIGTH / 2;
        this.node.setPosition(this.currentPos);
        this.node.active = true;
    }

    update(deltaTime: number) {
        // [4]
        console.log(123);
        this.timeScale = Math.floor((deltaTime / Constants.normalDt) * 100) / 100;
        if (this.game.state === Constants.GAME_STATE.PLAYING) {
            const boardList = this.game.boardManager.boardList;
            if (this.jumpState === Constants.BALL_JUMP_STATE.FALLDOWN) { // 往下掉
                for (let i = this.currentIndex + 1; i >= 0; i--) {
                    const board = boardList[i];
                    if (this.isOnBoard(board)) {
                        this.currentBoard = board;
                        this.activeCurrBoard();
                        break;
                    }
                }
                this.currJumpFrame += this.timeScale;
                this.setPosX()
                this.setPosY();

            } else if (this.jumpState === Constants.BALL_JUMP_STATE.SPRINT) { // 冲刺

            } else if (this.jumpState === Constants.BALL_JUMP_STATE.JUMPUP) { // 正常跳跃

            }
        }
    }

    isOnBoard(board: Board) {
        const pos = this.node.getPosition();
        const boardPos = board.node.getPosition();
        const x = pos.x - boardPos.x;
        const y = pos.y - boardPos.y;
        this.currJumpFrame = 0;
        if (Math.abs(x) < board.getRadius()) {
            if (y > 0 && y <= Constants.BALL_RADIUS + board.getHeight() / 2) {
                return true;
            }
        }
        return false;
    }

    //激活当前跳板
    activeCurrBoard() {
        const pos = this.node.getPosition();
        const boardPos = this.currentBoard.node.getPosition();
        const type = this.currentBoard.type;
        if (type === Constants.BOARD_TYPE.SPRING) {

        } else if (type === Constants.BOARD_TYPE.SPRINT) {
            this.jumpState = Constants.BALL_JUMP_STATE.SPRINT;
        } else {
            this.jumpState = Constants.BALL_JUMP_STATE.JUMPUP;
        }
    }

    setPosX() {

    }

    setPosY() {
        console.log(this.currJumpFrame);
        this.currentPos.set(this.node.getPosition());
        if (this.jumpState === Constants.BALL_JUMP_STATE.JUMPUP) {
            if (this.isJumpSpring) {

            } else {
                this.currentPos.y += Constants.BALL_JUMP_STEP[Math.floor(this.currJumpFrame / 2)] * this.timeScale;
            }
        } else if (this.jumpState === Constants.BALL_JUMP_STATE.FALLDOWN) {

        } else if (this.jumpState === Constants.BALL_JUMP_STATE.SPRINT) {

        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */

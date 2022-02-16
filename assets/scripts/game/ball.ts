
import { _decorator, Component, Node, Vec3 } from 'cc';
import { Board } from './board';
import { Constants } from './constants';
import { Game } from './game';
import { utils } from './utils';

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
    diffLevel = 0;
    boardGroupCount = 0;
    hasSprint = false;

    start() {
        // [3]
        this.reset();
    }

    reset() {
        //初始化小球位置
        this.currentPos.set(Constants.BOARD_INIT_POS);
        this.currentPos.y += Constants.BALL_RADIUS + Constants.BOARD_HEIGTH;
        this.node.setPosition(this.currentPos);
        this.jumpState = Constants.BALL_JUMP_STATE.FALLDOWN;
        this.currJumpFrame = 0;
        this.currentIndex = 0;
        this.currentBoard = this.game.boardManager.boardList[0];
        this.node.active = true;
    }

    update(deltaTime: number) {
        // [4]
        this.timeScale = Math.floor((deltaTime / Constants.normalDt) * 100) / 100;
        if (this.game.state === Constants.GAME_STATE.PLAYING) {
            const pos = this.node.getPosition();
            const boardList = this.game.boardManager.boardList;
            this.currJumpFrame += this.timeScale;
            if (this.jumpState === Constants.BALL_JUMP_STATE.FALLDOWN) { // 往下掉
                if (this.currJumpFrame > Constants.PLAYER_MAX_DOWN_FRAMES || (this.currentBoard.node.position.y - pos.y) - (Constants.BOARD_GAP + Constants.BOARD_HEIGTH) > 0.001) {
                    this.game.endGame();
                    return;
                }
                for (let i = this.currentIndex + 1; i >= 0; i--) {
                    const board = boardList[i];
                    if (this.isOnBoard(board)) {
                        this.currentIndex = i;
                        this.currentBoard = board;
                        this.activeCurrBoard();
                        break;
                    }
                }
            } else if (this.jumpState === Constants.BALL_JUMP_STATE.SPRINT) { // 冲刺
                if (this.currJumpFrame >= Constants.BALL_JUMP_FRAMES_SPRING) { // 冲刺状态结束
                    this.jumpState = Constants.BALL_JUMP_STATE.JUMPUP;
                    this.isJumpSpring = false;
                    this.currJumpFrame = 0;
                    this.hasSprint = false;
                }
            } else if (this.jumpState === Constants.BALL_JUMP_STATE.JUMPUP) { // 正常跳跃
                if (this.isJumpSpring && this.currJumpFrame >= Constants.BALL_JUMP_FRAMES_SPRING) {
                    // 处于跳跃状态并且当前跳跃高度超过弹簧板跳跃高度
                    this.jumpState = Constants.BALL_JUMP_STATE.FALLDOWN;
                    this.currJumpFrame = 0;
                } else {
                    if (!this.isJumpSpring && this.currJumpFrame >= Constants.BALL_JUMP_FRAMES) {
                        // 跳跃距离达到限制，开始下落
                        this.jumpState = Constants.BALL_JUMP_STATE.FALLDOWN;
                        this.currJumpFrame = 0;
                    }
                }
            }
            this.setPosY();
            this.setPosX();
            this.game.touchPosX = this.game.movePosX;
        }
    }

    isOnBoard(board: Board) {
        const pos = this.node.getPosition();
        const boardPos = board.node.getPosition();
        const x = pos.x - boardPos.x;
        const y = pos.y - boardPos.y;
        if (Math.abs(x) < board.getRadius()) {
            // 坐标判断  可能失败
            if (y > 0 && y <= Constants.BALL_RADIUS + board.getHeight() / 2) {
                return true;
            }
            if (this.isJumpSpring && this.currJumpFrame >= Constants.BALL_JUMP_FRAMES_SPRING) {
                // 是否处于反弹后的第一次匀减速范围内
                if (Math.abs(y) < Constants.BALL_JUMP_STEP_SPRING[0]) {
                    return true;
                }
            } else if (!this.isJumpSpring && this.currJumpFrame >= Constants.BALL_JUMP_FRAMES) {
                if (Math.abs(y) < Constants.BALL_JUMP_STEP[0]) {
                    return true;
                }
            }
        }
        return false;
    }

    //激活当前跳板
    activeCurrBoard() {
        const pos = this.node.getPosition();
        const boardPos = this.currentBoard.node.getPosition();
        const type = this.currentBoard.type;
        // const y = boardPos.y + Constants.BALL_RADIUS + this.currentBoard.getHeight() / 2 - .01;
        this.node.setPosition(pos.x, pos.y, pos.z);
        this.currJumpFrame = 0;
        if (type === Constants.BOARD_TYPE.SPRINT) {
            this.jumpState = Constants.BALL_JUMP_STATE.SPRINT;
        } else {
            this.jumpState = Constants.BALL_JUMP_STATE.JUMPUP;
        }
        if (!this.currentBoard.isActive) { // 跳板激活 获得分数 增加难度
            this.currentBoard.isActive = true;
            let score = Constants.SCORE_BOARD_NOT_CENTER;
            if (Math.abs(pos.x - boardPos.x) <= Constants.BOARD_RADIUS_CENTER) {
                score = Constants.SCORE_BOARD_CENTER;
            }
            this.diffLevel += Math.floor(score / 2);
            for (let l = this.currentIndex - Constants.BOARD_NEW_INDEX; l > 0; l--) {
                this.setNewBoard();
            }
        }
        this.currentBoard.setWave();
        if (type == Constants.BOARD_TYPE.SPRING || type == Constants.BOARD_TYPE.SPRINT) {
            this.currentBoard.setSpring()
        }
        this.game.Camera.setOriginPosX(pos.x);
        this.game.Camera.setOriginPosY(boardPos.y + Constants.CAMERA_OFFSET_Y);
    }

    setNewBoard() {
        let type = Constants.BOARD_TYPE.NORMAL;
        const coeff = utils.getDiffCoeff(this.diffLevel, 1, 10);
        if (this.boardGroupCount <= 0) {
            const t = Math.random() * coeff;
            if (t < 4.2) {
                type = Constants.BOARD_TYPE.NORMAL;
            } else if (t <= 5.5) {
                type = Constants.BOARD_TYPE.GIANT;
                this.boardGroupCount = 3;
            } else if (t <= 6.2) {
                type = Constants.BOARD_TYPE.SPRING;
                if (Math.random() > 0.5) {
                    this.boardGroupCount = 2;
                }
            } else if (t <= 7) {
                type = Constants.BOARD_TYPE.DROP;
                this.boardGroupCount = 3
            } else if (t <= 7.5 && this.hasSprint === false) {
                type = Constants.BOARD_TYPE.SPRINT;
                this.hasSprint = true;
                this.boardGroupCount = 3
            } else {
                type = Constants.BOARD_TYPE.NORMAL;
            }
        }
        this.boardGroupCount--;
        this.game.boardManager.newBoard(type);
    }

    setPosX() {
        if (this.game.isTouch && this.game.touchPosX !== this.game.movePosX) {
            const x = (this.game.movePosX - this.game.touchPosX) * Constants.COEFF_POS_BALL;
            this.node.setPosition(this.currentPos.x + x, this.currentPos.y, this.currentPos.z);
        }
    }

    setPosY() {
        this.currentPos.set(this.node.getPosition());
        if (this.jumpState === Constants.BALL_JUMP_STATE.JUMPUP) {
            if (this.isJumpSpring) {

            } else {
                this.currentPos.y += Constants.BALL_JUMP_STEP[Math.floor(this.currJumpFrame / 2)] * this.timeScale;
            }
            this.node.setPosition(this.currentPos);
        } else if (this.jumpState === Constants.BALL_JUMP_STATE.FALLDOWN) {
            if (this.currentBoard.type === Constants.BOARD_TYPE.SPRING) {
                if (this.currJumpFrame < Constants.BALL_JUMP_FRAMES_SPRING) {
                    const step = Constants.BALL_JUMP_FRAMES_SPRING - this.currJumpFrame - 1;
                    this.currentPos.y -= Constants.BALL_JUMP_STEP_SPRING[Math.floor((step >= 0 ? step : 0) / 3)] * this.timeScale;
                } else {
                    this.currentPos.y -= Constants.BALL_JUMP_STEP_SPRING[0] * this.timeScale;
                }
            } else if (this.currJumpFrame < Constants.BALL_JUMP_FRAMES) {
                const step = Constants.BALL_JUMP_FRAMES - this.currJumpFrame - 1;
                this.currentPos.y -= Constants.BALL_JUMP_STEP[Math.floor((step >= 0 ? step : 0) / 2)] * this.timeScale;
            } else {
                this.currentPos.y -= Constants.BALL_JUMP_STEP[0] * this.timeScale;
            }
            this.node.setPosition(this.currentPos);
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


import { _decorator, Component, Node, Prefab, instantiate, EventTouch } from 'cc';
import { Ball } from './ball';
import { BoardManager } from './board-manager';
import { Constants } from './constants';
import { Camera } from './camera';
import { UiManager } from './UiManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = game
 * DateTime = Mon Feb 14 2022 09:49:34 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = game.ts
 * FileBasenameNoExtension = game
 * URL = db://assets/scripts/game/game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('game')
export class Game extends Component {

    @property(Prefab)
    public ballPrefab: Prefab = null;

    @property(BoardManager)
    public boardManager: BoardManager = null;

    @property(Camera)
    public Camera: Camera = null;

    @property(UiManager)
    public uiManager: UiManager = null;

    currentJumpFre = 0; //当前跳跃频率;
    state = Constants.GAME_STATE.READY;

    isTouch = false;
    touchPosX = 0;
    movePosX = 0;

    start() {
        //初始化小球
        const ballNode = instantiate(this.ballPrefab);
        const ball = ballNode.getComponent(Ball);
        ball.game = this;
        this.node.parent.addChild(ballNode);
        //监听事件
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.scheduleOnce(() => {
            this.startGame();
        }, 3)
    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart(event: EventTouch) {
        this.isTouch = true;
        this.touchPosX = this.movePosX = event.getLocation().x;
    }

    onTouchMove(event: EventTouch) {
        this.movePosX = event.getLocation().x;
    }

    onTouchEnd(event: EventTouch) {
        this.isTouch = false;
    }

    startGame() {
        this.state = Constants.GAME_STATE.PLAYING;
    }

    endGame() {

    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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

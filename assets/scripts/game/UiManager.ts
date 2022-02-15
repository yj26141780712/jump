
import { _decorator, Component, Node } from 'cc';
import { Game } from './game';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UiManager
 * DateTime = Mon Feb 14 2022 16:42:24 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = UiManager.ts
 * FileBasenameNoExtension = UiManager
 * URL = db://assets/scripts/game/UiManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('UiManager')
export class UiManager extends Component {

    @property(Node)
    public pageStart: Node = null;

    @property(Node)
    public pageResult: Node = null;

    @property(Game)
    public game: Game = null;

    start() {
        // [3]
    }

    startGame() {
        this.game.startGame();
    }

    show() {
        this.pageStart.active = true;
    }

    hide() {
        this.pageStart.active = false;
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

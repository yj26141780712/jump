
import { _decorator, Component, Node, Prefab, Vec3 } from 'cc';
import { Constants } from './Constants';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = board
 * DateTime = Fri Feb 11 2022 14:13:17 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = board.ts
 * FileBasenameNoExtension = board
 * URL = db://assets/scripts/game/board.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('board')
export class Board extends Component {

    @property(Prefab)
    diamondPrefab: Prefab = null!;

    @property({ type: Prefab })
    centerPrefab: Prefab = null!;

    @property({ type: Prefab })
    wavePrefab: Prefab = null!;

    // 弹簧片
    @property({ type: Prefab })
    springTopPrefab: Prefab = null!;

    // 弹簧
    @property({ type: Prefab })
    springHelixPrefab: Prefab = null!;

    type = Constants.BOARD_TYPE.NORMAL;

    start() {
        // [3]
    }

    reset(type: number, pos: Vec3) {
        this.node.setPosition(pos);
        this.type = type;
        if (type = Constants.BOARD_TYPE.NORMAL) {

        }
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

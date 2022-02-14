
import { _decorator, Component, Node, Prefab, Vec3 } from 'cc';
import { Constants } from './constants';
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
    originScale = new Vec3();

    onLoad() {
        this.originScale.set(this.node.scale);
    }

    /**
     * 重置跳板
     * @param type 跳板类型
     * @param pos 跳板位置
     */
    reset(type: number, pos: Vec3) {
        this.node.setPosition(pos);
        this.type = type;
        //设置跳板大小
        if (type === Constants.BOARD_TYPE.GIANT) {
            this.node.setScale(this.originScale.x * Constants.BOARD_SCALE_GIANT, this.originScale.y, this.originScale.z);
        } else if (type === Constants.BOARD_TYPE.DROP) {
            this.node.setScale(this.originScale.x, this.originScale.y * Constants.BOARD_HEIGTH_SCALE_DROP, this.originScale.z);
        } else {
            this.node.setScale(this.originScale);
        }
    }

    getHeight() {
        return this.type === Constants.BOARD_TYPE.DROP ? Constants.BOARD_HEIGTH / 2 : Constants.BOARD_HEIGTH;
    }

    getRadius() {
        return this.type === Constants.BOARD_TYPE.GIANT ? Constants.BOARD_SCALE_GIANT * Constants.BOARD_RADIUS : Constants.BOARD_RADIUS;
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

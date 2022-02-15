
import { _decorator, Component, Node, Vec3 } from 'cc';
import { Constants } from './constants';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = camre
 * DateTime = Fri Feb 11 2022 16:24:02 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = camre.ts
 * FileBasenameNoExtension = camre
 * URL = db://assets/scripts/game/camre.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('camera')
export class Camera extends Component {

    @property(Node)
    public planeNode: Node = null;

    currentPos = new Vec3();
    originPos = new Vec3();

    start() {
        this.originPos.set(Constants.CAMERA_INIT_POS);
        this.setBgPosition(this.originPos);
        this.node.eulerAngles = Constants.CAMERA_INIT_ROT;
    }

    setOriginPosX(val: number) {
        this.originPos.x = val;
    }

    setOriginPosY(val: number) {
        this.originPos.y = val;
    }

    // 相机更新的同时更新背景板
    setBgPosition(position: Vec3) {
        this.node.setPosition(position);
        const y = position.y - 27;
        this.planeNode.setPosition(position.x, y, -100);
    }

    reset() {
        this.originPos.set(Constants.CAMERA_INIT_POS);
        this.setBgPosition(this.originPos);
    }

    update(deltaTime: number) {
        this.currentPos.set(this.node.getPosition());
        if (this.originPos.x === this.currentPos.x && this.originPos.y === this.currentPos.y) {
            return;
        }
        if (Math.abs(this.currentPos.x - this.originPos.x) < Constants.CAMERA_MOVE_MINI_ERR) {
            this.currentPos.x = this.originPos.x;
            this.setBgPosition(this.currentPos);
        } else {
            const x = this.originPos.x - this.currentPos.x;
            this.currentPos.x += x / Constants.CAMERA_MOVE_X_FRAMES;
            this.setBgPosition(this.currentPos);
        }
        this.currentPos.set(this.node.getPosition());
        if (Math.abs(this.currentPos.y - this.originPos.y) <= Constants.CAMERA_MOVE_MINI_ERR) {
            this.currentPos.y = this.originPos.y;
            this.setBgPosition(this.currentPos);
        } else {
            const y = this.originPos.y - this.currentPos.y;
            this.currentPos.y += y / Constants.CAMERA_MOVE_Y_FRAMES;
            this.setBgPosition(this.currentPos);
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

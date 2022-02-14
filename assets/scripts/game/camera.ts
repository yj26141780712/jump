
import { _decorator, Component, Node, Vec3 } from 'cc';
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

@ccclass('camre')
export class Camera extends Component {

    @property(Node)
    public planeNode: Node = null;

    currentPos = new Vec3();
    originPos = new Vec3();

    start() {
        this.originPos = 
    }

    update(deltaTime: number) {

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

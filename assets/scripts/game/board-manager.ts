
import { _decorator, Component, Node, Prefab, instantiate, Vec3, setDisplayStats } from 'cc';
import { Board } from './board';
import { Constants } from './Constants';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = board_manager
 * DateTime = Fri Feb 11 2022 14:07:48 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = board-manager.ts
 * FileBasenameNoExtension = board-manager
 * URL = db://assets/scripts/game/board-manager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('board_manager')
export class BoardManager extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Prefab)
    public boardPrefab: Prefab = null;

    boardList: Board[] = [];

    start() {
        setDisplayStats(false);
        // [3]
        this.initBoard();
    }

    //初始化跳板
    initBoard() {
        // 设置跳板位置和类型
        for (let i = 0; i < Constants.BOARD_NUM; i++) {
            const node = instantiate(this.boardPrefab);
            this.boardList.push(node.getComponent(Board));
            this.node.addChild(node);
        }
        this.reset();
    }

    reset() {
        let pos = Constants.BOARD_INIT_POS.clone();
        for (let i = 0; i < Constants.BOARD_NUM; i++) {
            const board = this.boardList[i];
            board.reset(Constants.BOARD_TYPE.NORMAL, pos);
            pos = this.getNextPos(board);
        }
    }

    getNextPos(board: Board) {
        const pos = board.node.getPosition().clone();
        if (board.type === Constants.BOARD_TYPE.SPRING) {
            pos.y += Constants.BOARD_GAP_SPRING;
        } else if (board.type === Constants.BOARD_TYPE.SPRINT) {
            pos.y += Constants.BOARD_GAP_SPINGT;
        } else {
            pos.y += Constants.BOARD_GAP;
        }
        return pos;
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
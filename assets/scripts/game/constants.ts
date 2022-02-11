import { Vec3 } from "cc";

// 跳板类型
enum BOARD_TYPE {
    NORMAL = 0, // 正常
    SPRING = 1, // 弹簧
    DROP = 2, // 会掉落的跳板
    GIANT = 3, // 大跳板
    SPRINT = 4 // 冲刺板
}

export class Constants {

    // board
    static BOARD_INIT_POS = new Vec3(0, 10, 0);
    static BOARD_NUM = 6;

    static BOARD_GAP = 4.3;
    static BOARD_GAP_SPRING = 9;
    static BOARD_GAP_SPINGT = 198;
    static BOARD_TYPE = BOARD_TYPE;
}
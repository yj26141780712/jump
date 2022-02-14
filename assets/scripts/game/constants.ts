import { Vec3 } from "cc";

// 跳板类型
enum BOARD_TYPE {
    NORMAL = 0, // 正常
    SPRING = 1, // 弹簧
    DROP = 2, // 会掉落的跳板
    /**
     * @zh 大跳板
     */
    GIANT = 3, // 大跳板
    SPRINT = 4 // 冲刺板
}

export class Constants {

    // ball 

    // camera
    static CAMERA_INIT_POS = new Vec3(0, 15, 22); //相机初始位置
    static CAMERA_INIT_ROT = new Vec3(-11, 0, 0);//相机初始旋转

    // board
    static BOARD_INIT_POS = new Vec3(0, 10, 0);
    static BOARD_NUM = 6;
    static BOARD_HEIGTH = 0.25; // 跳板厚度
    static BOARD_RADIUS = 1.5; // 跳板半径
    static BOARD_GAP = 4.3;
    static BOARD_GAP_SPRING = 9;
    static BOARD_GAP_SPINGT = 198;
    static BOARD_HEIGTH_SCALE_DROP = 0.5; // 掉落板厚度缩放比例
    static BOARD_SCALE_GIANT = 2.8;  // 大跳板缩放比例
    static BOARD_TYPE = BOARD_TYPE;
    static SCENE_MAX_OFFSET_X = 3.5; // 小球最大横向移动距离
    //game
}
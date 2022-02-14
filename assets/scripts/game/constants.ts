import { Vec3 } from "cc";

// 跳板类型
enum BOARD_TYPE {
    /**
     * @zh 正常
     */
    NORMAL = 0,
    /**
     * @zh 弹簧
     */
    SPRING = 1,
    /**
     * @zh 掉落
     */
    DROP = 2,
    /**
     * @zh 大跳板
     */
    GIANT = 3,
    /**
     * @zh 冲刺
     */
    SPRINT = 4
}

enum JUMP_STATE {
    /**
     * @zh 正常跳跃
     */
    JUMPUP = 1,
    /**
     * @zh 下落
     */
    FALLDOWN = 2,
    /**
     * @zh 冲刺
     */
    SPRINT = 3,
}

enum GAME_STATE {
    /**
     * @zh 游戏准备中
     */
    READY = 1,
    /**
     * @zh 游戏中
     */
    PLAYING = 2,
    /**
     * @zh 游戏暂停
     */
    PAUSE = 3,
    /**
     * @zh 游戏结束
     */
    OVER = 4,
}

export class Constants {

    // ball 
    static BALL_RADIUS = 0.5; // 球体半径
    static BALL_JUMP_STATE = JUMP_STATE; // 小球跳跃状态枚举
    static BALL_JUMP_FRAMES = 20; // 正常跳跃帧数  4.3/20 
    static BALL_JUMP_FRAMES_SPRING = 27; // 弹簧板跳跃帧数 9/27 0.33
    static BALL_JUMP_FRAMES_SPRINT = 240; // 冲刺板跳跃帧数  192/240  
    static BALL_JUMP_STEP = [0.8, 0.6, 0.5, 0.4, 0.3, 0.2, 0.15, 0.1, 0.05, 0.03]; // 正常跳跃步长
    static BALL_JUMP_STEP_SPRING = [1.2, 0.8, 0.6, 0.4, 0.3, 0.2, 0.15, 0.1, 0.05]; // 弹簧跳跃步长
    static BALL_JUMP_STEP_SPRINT = 0.8; // 冲刺跳跃步长
    static BALL_SPRINT_STEP_Y = 10; //

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
    static GAME_STATE = GAME_STATE;
    static BALL_JUMP_STATE = JUMP_STATE; // 小球跳跃状态枚举

    static normalDt = 1 / 60;
}
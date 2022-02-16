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

    static COEFF_POS_BALL = 8 / 360;
    static PLAYER_MAX_DOWN_FRAMES = 40; // 最大下落帧数
    static SCENE_MAX_OFFSET_X = 3.5; // 小球最大横向移动距离

    // score
    static SCORE_BOARD_CENTER = 2; // 小球靠近跳板圆心的分数
    static SCORE_BOARD_NOT_CENTER = 1; // 小球跳入非跳板圆心的分数

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
    static CAMERA_MOVE_X_FRAMES = 20; // 相机横向偏移比例
    static CAMERA_MOVE_Y_FRAMES = 15; // 相机纵向偏移比例
    static CAMERA_MOVE_Y_FRAMES_SPRING = 23; // 弹簧跳板纵向偏移比例
    static CAMERA_MOVE_MINI_ERR = 0.02; // 相机位置最小误差
    static CAMERA_OFFSET_Y = 10;
    static CAMERA_OFFSET_Y_SPRINT = 15;
    static BOARD_BUMP_FRAMES = 10;
    static BOARD_BUMP_STEP = [-0.15, -0.1, -0.07, -0.02, -0.003, 0.003, 0.02, 0.07, 0.1, 0.15];

    // board
    static BOARD_INIT_POS = new Vec3(0, 10, 0);
    static BOARD_NUM = 6;
    static BOARD_NEW_INDEX = 2; // 每次新增两个跳板
    static BOARD_HEIGTH = 0.25; // 跳板厚度
    static BOARD_RADIUS = 1.5; // 跳板半径
    static BOARD_GAP = 4.3;
    static BOARD_GAP_SPRING = 9;
    static BOARD_GAP_SPINGT = 198;
    static BOARD_HEIGTH_SCALE_DROP = 0.5; // 掉落板厚度缩放比例
    static BOARD_SCALE_GIANT = 2.8;  // 大跳板缩放比例
    static BOARD_TYPE = BOARD_TYPE;
    static BOARD_RADIUS_CENTER = 0.35; // 跳板圆心半径，小球根据距离圆心远近增加不同分数
    static BOARD_SPRING_FRAMES = 10;
    static BOARD_WAVE_FRAMES = 16; // 板子波动帧率
    static BOARD_WAVE_INNER_START_FRAMES = 8;
    static BOARD_WAVE_INNER_STEP = 0.12 * 2;
    static BOARD_WAVE_STEP = 0.15 * 15;

    static SPRING_HEIGHT = 0.25;
    static SPRING_HELIX_STEP = 0.12;
    static SPRING_HELIX_STEP_SPIRNT = 0.3;
    static SPRING_TOP_STEP = 0.25;
    static SPRING_TOP_STEP_SPRINT = 0.5;
    static WAVE_OFFSET_Y = 0.13 / 2;
    //game
    static GAME_STATE = GAME_STATE;

    static normalDt = 1 / 60;
}
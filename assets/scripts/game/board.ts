
import { _decorator, Component, Node, Prefab, Vec3, instantiate, MeshRenderer, Color } from 'cc';
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
    isActive = false;

    // 波动
    waveNode: Node;
    innerWaveNode: Node;
    currWaveFrame: number;
    waveOriginScale = new Vec3();

    // 弹簧
    springHelixNode: Node;
    spirngTopNode: Node;
    currSpringFrame: number;

    onLoad() {
        this.originScale.set(this.node.scale);
        this.initWave();
        this.initSpring();
    }

    /**
     * 重置跳板
     * @param type 跳板类型
     * @param pos 跳板位置
     */
    reset(type: number, pos: Vec3) {
        this.isActive = false;
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
        this.spirngTopNode.active = false;
        if (this.type === Constants.BOARD_TYPE.SPRING || this.type === Constants.BOARD_TYPE.SPRINT) {
            this.springHelixNode.active = true;
            this.spirngTopNode.active = true;
            this.setSpringPos();
        }
    }

    getHeight() {
        return this.type === Constants.BOARD_TYPE.DROP ? Constants.BOARD_HEIGTH / 2 : Constants.BOARD_HEIGTH;
    }

    getRadius() {
        return this.type === Constants.BOARD_TYPE.GIANT ? Constants.BOARD_SCALE_GIANT * Constants.BOARD_RADIUS : Constants.BOARD_RADIUS;
    }

    //波动
    initWave() {
        this.waveNode = instantiate(this.wavePrefab);
        this.waveNode.active = false;
        this.node.parent.addChild(this.waveNode);
        this.innerWaveNode = instantiate(this.wavePrefab);
        this.innerWaveNode.active = false;
        this.node.parent.addChild(this.innerWaveNode);
        this.waveOriginScale.set(this.waveNode.getScale());
    }

    setWave() {
        this.currWaveFrame = 0;
        const pos = this.node.getPosition().clone();
        pos.y += Constants.WAVE_OFFSET_Y;

        this.waveNode.setPosition(pos);
        this.waveNode.setScale(this.waveOriginScale.clone());
        this.waveNode.active = true;

        this.innerWaveNode.setPosition(pos);
        this.innerWaveNode.setScale(this.waveOriginScale.clone());
        this.innerWaveNode.active = true;
    }

    effectWave() {
        if (this.currWaveFrame < Constants.BOARD_WAVE_FRAMES) {
            if (this.currWaveFrame >= Constants.BOARD_WAVE_INNER_START_FRAMES) {
                if (!this.innerWaveNode.active) {
                    this.innerWaveNode.active = true;
                }

                const mat2 = this.innerWaveNode.getComponent(MeshRenderer).material;
                // 初始化时保存以下变量
                const pass = mat2!.passes[0];
                const hColor = pass.getHandle('color');
                const color = new Color('#dadada');
                color.a = 127 - Math.sin(this.currWaveFrame * 0.05) * 127;
                pass.setUniform(hColor, color);
                const scale = this.innerWaveNode.getScale();
                this.innerWaveNode.setScale(scale.x + Constants.BOARD_WAVE_INNER_STEP, scale.y, scale.z + Constants.BOARD_WAVE_INNER_STEP);
            }
            const mat2 = this.waveNode.getComponent(MeshRenderer)!.material;
            // 初始化时保存以下变量
            const pass = mat2!.passes[0];
            const hColor = pass.getHandle('color');
            const color = new Color('#dadada');
            color.a = 127 - Math.sin(this.currWaveFrame * 0.1) * 127;
            pass.setUniform(hColor, color);
            const scale = this.innerWaveNode.getScale();;
            this.waveNode.setScale(scale.add(new Vec3(Constants.BOARD_WAVE_STEP, 0, Constants.BOARD_WAVE_STEP)));
            this.currWaveFrame++;
        } else {
            this.waveNode.active = false;
            this.innerWaveNode.active = false;
        }
    }

    //弹簧
    initSpring() {
        this.currSpringFrame = 2 * Constants.BOARD_SPRING_FRAMES;
        this.springHelixNode = instantiate(this.springHelixPrefab);
        this.springHelixNode.setScale(1.5, 1, 1.5);
        this.springHelixNode.active = false;
        this.node.parent!.addChild(this.springHelixNode);
        this.spirngTopNode = instantiate(this.springTopPrefab);
        this.spirngTopNode.active = false;
        this.node.parent.addChild(this.spirngTopNode);
        this.setSpringPos();
    }

    setSpring() {
        this.currSpringFrame = 0;
        this.setSpringPos();
        this.springHelixNode.setScale(1.5, 1, 1.5);
        this.spirngTopNode.active = true;
        this.springHelixNode.active = true;
    }

    setSpringPos() {
        let pos = this.node.position.clone();
        pos.y += Constants.BOARD_HEIGTH;
        this.springHelixNode.setPosition(pos);
        pos = this.node.position.clone();
        pos.y += (Constants.BOARD_HEIGTH + Constants.SPRING_HEIGHT/2);
        this.spirngTopNode.setPosition(pos);
    }

    effectSpring() {
        const y = this.type === Constants.BOARD_TYPE.SPRINT ? Constants.SPRING_HELIX_STEP_SPIRNT : Constants.SPRING_HELIX_STEP;
        const z = this.type === Constants.BOARD_TYPE.SPRINT ? Constants.SPRING_TOP_STEP_SPRINT : Constants.SPRING_TOP_STEP;
        const scale = this.springHelixNode.getScale().clone(); // 放大
        const pos = this.spirngTopNode.position;
        if (this.currSpringFrame < Constants.BOARD_SPRING_FRAMES) { //弹上去
            this.spirngTopNode.setPosition(pos.x, pos.y + z, pos.z);
            this.springHelixNode.setScale(scale.x, scale.y + y, scale.z);
            this.currSpringFrame++;  //拉下来
        } else if (this.currSpringFrame >= Constants.BOARD_SPRING_FRAMES && this.currSpringFrame < 2 * Constants.BOARD_SPRING_FRAMES) {
            this.spirngTopNode.setPosition(pos.x, pos.y - z, pos.z);
            this.springHelixNode.setScale(scale.x, scale.y - y, scale.z);
            this.currSpringFrame++;
        } else {
            this.springHelixNode.active = false;
        }
    }

    update(deltaTime: number) {
        this.effectWave();
        if (this.type === Constants.BOARD_TYPE.SPRING || this.type === Constants.BOARD_TYPE.SPRINT) {
            this.effectSpring();
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

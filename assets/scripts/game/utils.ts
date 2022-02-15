
export const utils = {
    getDiffCoeff: function (e: number, t: number, a: number) {
        return (a * e + 1) * t / (t * e + 1 + a - t);
    }
}
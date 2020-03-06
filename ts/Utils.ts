class Utilities {
    public static RandomRange(max: number, min: number) {
        return Math.random() * (max - min) + min;
    }
}

export { Utilities }
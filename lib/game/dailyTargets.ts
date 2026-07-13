export function generateTargets(
    mode: "normal" | "extreme"
) {
    return Array.from({ length: 5 }, () => {
        if (mode === "normal") {
            return Number(
                (Math.random() * 9.5 + 0.5).toFixed(2)
            );
        }

        return Number(
            (Math.random() * 20 + 10).toFixed(2)
        );
    });
}
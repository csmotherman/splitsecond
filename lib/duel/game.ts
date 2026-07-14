export function calculateError(
    targetMs: number,
    actualMs: number
) {
    return Math.abs(
        targetMs - actualMs
    );
}

export function formatMs(
    milliseconds: number
) {
    return (
        milliseconds / 1000
    ).toFixed(3);
}

export function formatTarget(
    milliseconds: number
) {
    return (
        milliseconds / 1000
    ).toFixed(3);
}

export function getWinner(
    playerOneError: number,
    playerTwoError: number
) {
    if (
        playerOneError ===
        playerTwoError
    ) {
        return null;
    }

    return playerOneError <
        playerTwoError
        ? 1
        : 2;
}
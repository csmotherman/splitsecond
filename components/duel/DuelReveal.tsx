type Props = {
    targetMs: number;
    yourTime: number;
    opponentTime: number;
};

export default function DuelReveal({
    targetMs,
    yourTime,
    opponentTime,
}: Props) {
    const yourError =
        Math.abs(
            targetMs -
            yourTime
        );

    const opponentError =
        Math.abs(
            targetMs -
            opponentTime
        );

    return (
        <div className="space-y-6 text-center text-white">
            <div className="text-6xl font-black text-neon-lime">
                {(
                    targetMs / 1000
                ).toFixed(3)}
            </div>

            <div>
                You:{" "}
                {(
                    yourTime /
                    1000
                ).toFixed(3)}
            </div>

            <div>
                Opponent:{" "}
                {(
                    opponentTime /
                    1000
                ).toFixed(3)}
            </div>

            <div>
                Error:{" "}
                {(
                    yourError /
                    1000
                ).toFixed(3)}
            </div>

            <div>
                Opponent Error:{" "}
                {(
                    opponentError /
                    1000
                ).toFixed(3)}
            </div>
        </div>
    );
}
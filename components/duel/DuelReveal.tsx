type Props = {
    roundNumber: number;

    targetMs: number;

    yourTime: number;
    opponentTime: number;

    yourWins: number;
    opponentWins: number;
};

export default function DuelReveal({
    roundNumber,
    targetMs,
    yourTime,
    opponentTime,
    yourWins,
    opponentWins,
}: Props) {
    return (
        <div className="text-white">
            Round {roundNumber}
            <br />
            Score: {yourWins}-{opponentWins}
            <br />
            Target: {targetMs}
            <br />
            You: {yourTime}
            <br />
            Opponent: {opponentTime}
        </div>
    );
}
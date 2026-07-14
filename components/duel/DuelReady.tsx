type Props = {
    onReady: () => void;
    ready: boolean;
};

export default function DuelReady({
    ready,
    onReady,
}: Props) {
    return (
        <button
            onClick={onReady}
            className="w-full rounded-2xl bg-neon-lime p-4 font-black text-black"
        >
            {ready
                ? "READY"
                : "READY UP"}
        </button>
    );
}
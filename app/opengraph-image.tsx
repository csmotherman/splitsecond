import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Play SplitSecond, the free daily timing challenge";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    alignItems: "center",
                    background: "#0A0B0E",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                    position: "relative",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        background: "rgba(57, 255, 20, 0.14)",
                        borderRadius: 999,
                        filter: "blur(80px)",
                        height: 360,
                        position: "absolute",
                        width: 700,
                    }}
                />
                <div
                    style={{
                        color: "white",
                        display: "flex",
                        fontSize: 104,
                        fontWeight: 800,
                        letterSpacing: 2,
                        lineHeight: 1,
                    }}
                >
                    SPLIT<span style={{ color: "#39FF14" }}>SECOND</span>
                </div>
                <div
                    style={{
                        color: "#CBD5E1",
                        display: "flex",
                        fontSize: 38,
                        marginTop: 34,
                    }}
                >
                    The free daily timing game
                </div>
                <div
                    style={{
                        border: "2px solid rgba(57, 255, 20, 0.45)",
                        borderRadius: 999,
                        color: "#39FF14",
                        display: "flex",
                        fontSize: 26,
                        fontWeight: 700,
                        marginTop: 44,
                        padding: "14px 28px",
                    }}
                >
                    EVERY MILLISECOND MATTERS
                </div>
            </div>
        ),
        size
    );
}

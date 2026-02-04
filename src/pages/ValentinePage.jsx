import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import cute from "../assets/cute.webp"
import ConfettiCanvas from "../components/ConfettiCanvas";

export default function ValentinePage() {
    const { name } = useParams();
    const personName =
        name?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "My Love";

    const musicRef = useRef(null);
    const noBtnRef = useRef(null);
    const canvasRef = useRef(null);

    const [accepted, setAccepted] = useState(false);

    /* 🎵 Play music after user interaction */
    useEffect(() => {
        const playMusic = () => {
            musicRef.current?.play().catch(() => { });
            document.removeEventListener("click", playMusic);
        };
        document.addEventListener("click", playMusic);
    }, []);

    /* 💔 Move "No" button */
    const moveButton = () => {
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        noBtnRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    /* 🎉 Confetti */
    useEffect(() => {
        if (!accepted) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        const pieces = Array.from({ length: 200 }).map(createPiece);

        function createPiece() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 6 + 4,
                speed: Math.random() * 3 + 2,
                color: `hsl(${Math.random() * 360}, 100%, 70%)`
            };
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pieces.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
                p.y += p.speed;
                if (p.y > canvas.height) Object.assign(p, createPiece());
            });
            requestAnimationFrame(draw);
        }

        draw();
        musicRef.current?.play();

        return () => window.removeEventListener("resize", resize);
    }, [accepted]);

    return (
        <div className="app-wrapper">


            {/* 🎵 Background Music */}
            {/* <audio ref={musicRef} loop>
                <source
                    src="https://www.bensound.com/bensound-music/bensound-love.mp3"
                    type="audio/mpeg"
                />
            </audio> */}

            {/* 🎊 Confetti */}
            <canvas ref={canvasRef} />

            <div className="container px-3">
                {!accepted ? (
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                            <div className="card text-center p-4">
                                <div className="card-body">
                                    <img
                                        src={cute}
                                        alt="Cute"
                                        className="cute-img mb-3"
                                    />

                                    <div className="heart mb-3">❤️</div>

                                    <h1 className="mb-3">
                                        {personName}, Will You Be My Valentine?
                                    </h1>

                                    <p className="text-muted mb-4">
                                        I prepared something special just for us. Will you
                                        celebrate Valentine’s Day with me? 💕
                                    </p>

                                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                                        <button
                                            className="btn btn-success btn-lg px-4"
                                            onClick={() => setAccepted(true)}
                                        >
                                            Yes 💖
                                        </button>

                                        <button
                                            ref={noBtnRef}
                                            className="btn btn-outline-danger btn-lg px-4"
                                            onMouseEnter={moveButton}
                                            onClick={moveButton}
                                        >
                                            No 💔
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-white">
                        <h1 className="mb-3">Yaaay {personName}! 🎉❤️</h1>
                        <p className="fs-4">
                            I can’t wait to spend Valentine’s Day with you 💕
                        </p>
                        <p className="fs-5">
                            This is going to be our special moment ✨
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

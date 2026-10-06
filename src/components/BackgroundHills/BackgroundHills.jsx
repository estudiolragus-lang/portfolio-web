import './BackgroundHills.css';

// Tres capas de colinas (fondo → frente) sobre un cielo en degradé.
// La capa del frente usa el mismo color que el fondo de la página, así se funde sin cortes.
function BackgroundHills() {
  return (
    <div className="bg-hills" aria-hidden="true">
      <svg
        className="bg-hills__svg"
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYMax slice"
      >
        <path
          className="bg-hills__back"
          d="M-20 330 C40 220 140 170 250 175 C340 180 400 215 450 250 C500 190 600 160 700 175 C780 188 830 230 860 252 C920 175 1060 140 1180 150 C1300 160 1400 210 1460 280 L1460 520 L-20 520 Z"
        />
        <path
          className="bg-hills__mid"
          d="M-20 380 C60 270 200 215 340 215 C470 215 560 270 620 330 C700 250 840 225 960 235 C1100 248 1200 300 1260 340 C1330 270 1400 250 1460 255 L1460 520 L-20 520 Z"
        />
        <path
          className="bg-hills__front"
          d="M-20 330 C80 335 150 400 190 440 C330 340 560 300 760 305 C1000 312 1250 360 1460 420 L1460 520 L-20 520 Z"
        />
      </svg>
    </div>
  );
}

export default BackgroundHills;

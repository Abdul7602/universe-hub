"use client";

export default function CareerDNA() {
return (
<> <style>
{`           @keyframes floatDNA {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        `} </style>


  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginBottom: "64px",
    }}
  >
    <div
      style={{
        width: "260px",
        height: "260px",
        border:
          "2px solid rgba(102,224,255,0.4)",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow:
          "0 0 40px rgba(102,224,255,0.2)",
        background:
          "radial-gradient(circle, rgba(102,224,255,0.08), transparent)",
      }}
    >
      <div
        style={{
          fontSize: "120px",
          animation:
            "floatDNA 3s ease-in-out infinite",
          filter:
            "drop-shadow(0 0 20px #66e0ff)",
        }}
      >
        🧬
      </div>
    </div>
  </div>
</>


);
}

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FitNexus - 헬스장 PT 회원 관리 시스템";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
          backgroundImage: "linear-gradient(135deg, #4448ff 0%, #3535e6 100%)",
          position: "relative",
        }}
      >
        {/* 배경 패턴 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* 메인 컨텐츠 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {/* 로고/아이콘 영역 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: 30,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 80,
              }}
            >
              💪
            </div>
          </div>

          {/* 타이틀 */}
          <h1
            style={{
              fontSize: 80,
              fontWeight: "bold",
              color: "white",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            FitNexus
          </h1>

          {/* 서브타이틀 */}
          <p
            style={{
              fontSize: 36,
              color: "rgba(255, 255, 255, 0.9)",
              marginBottom: 40,
              textAlign: "center",
            }}
          >
            헬스장 PT 회원 관리 시스템
          </p>

          {/* 기능 설명 */}
          <div
            style={{
              display: "flex",
              gap: 40,
              marginTop: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px 30px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 15,
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>👥</div>
              <div style={{ fontSize: 24, color: "white", fontWeight: 600 }}>
                회원 관리
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px 30px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 15,
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>⭐</div>
              <div style={{ fontSize: 24, color: "white", fontWeight: 600 }}>
                트레이너 평가
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px 30px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 15,
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>📊</div>
              <div style={{ fontSize: 24, color: "white", fontWeight: 600 }}>
                통계 분석
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}


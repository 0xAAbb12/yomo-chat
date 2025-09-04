// lib/auth-popup.ts
export type OAuthResult = {
  id: string | null;
};

/**
 * 打开后端 OAuth 入口的弹窗，并等待回调页 postMessage
 * - backendLoginUrl: 你的后端登录入口（不含 redirect_uri）
 * - redirectPath: 前端回调页的相对路径，比如 "/auth/popup-callback"
 */
export function loginWithPopup(
  backendLoginUrl: string,
  redirectPath = "/auth/popup-callback",
): Promise<OAuthResult> {
  return new Promise((resolve, reject) => {
    const origin = window.location.origin;
    const redirect_uri = encodeURIComponent(`${origin}${redirectPath}`);

    // CSRF 防护
    const state = crypto.randomUUID();
    sessionStorage.setItem("oauth_state", state);

    // 拼后端登录 URL（约定：后端支持 redirect_uri & state）
    const url = `${backendLoginUrl}?redirect_uri=${redirect_uri}&state=${state}`;

    // 居中弹窗
    const W = 500;
    const H = 600;
    const y = window.top!.outerHeight / 2 + window.top!.screenY - H / 2;
    const x = window.top!.outerWidth / 2 + window.top!.screenX - W / 2;

    const popup = window.open(
      url,
      "google_oauth",
      `width=${W},height=${H},left=${x},top=${y}`,
    );

    if (!popup) {
      reject(new Error("Popup blocked"));
      return;
    }

    // 兜底：用户直接关掉弹窗
    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer);
        window.removeEventListener("message", onMsg);
        reject(new Error("Popup closed"));
      }
    }, 300);

    function onMsg(e: MessageEvent) {
      console.log(
        "Received messageReceived message:",
        e,
        e.origin,
        origin,
        e.data?.type,
        e.data.payload,
      );
      // if (e.origin !== origin) return; // 安全校验：只接受同源回传

      if (e.data?.type === "oauth_result" && e.data?.payload) {
        console.log(
          "Handling oauth_result:",
          e.data?.type,
          e.data?.payload,
        );
        resolve(e.data.payload as OAuthResult);
        clearInterval(timer);
        window.removeEventListener("message", onMsg);
        popup?.close();

        // const savedState = sessionStorage.getItem("oauth_state");
        // if (
        //   savedState &&
        //   e.data?.payload?.state &&
        //   savedState !== e.data.payload.state
        // ) {
        //   reject(new Error("State mismatch"));
        //   return;
        // }
      }
    }

    window.addEventListener("message", onMsg);
  });
}

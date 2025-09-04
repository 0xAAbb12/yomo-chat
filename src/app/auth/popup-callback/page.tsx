// app/auth/popup-callback/page.tsx
"use client";

import { useEffect } from "react";

/** 解析 #fragment 或 ?query 的工具 */
function parseParamsFromLocation() {
  // 兼容 fragment/hash（#token=...）与 query（?code=...）
  const frag = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const qry = new URLSearchParams(window.location.search);

  // 优先从 fragment 里取；如果没有就从 query 取
  const get = (k: string) => frag.get(k) ?? qry.get(k);
  console.log("Parsed params:Parsed params", get("id"));
  return {
    id: get("id"),
  };
}

export default function PopupCallback() {
  useEffect(() => {
    const payload = parseParamsFromLocation();

    // 将结果安全地回传给主窗口
    if (window.opener) {
      window.opener.postMessage(
        { type: "oauth_result", payload },
        window.location.origin, // 只发给同源
      );
    }

    // 友好：短暂停留再关闭（也可以立刻关闭）
    setTimeout(() => window.close(), 1000);
  }, []);

  return <main></main>;
}

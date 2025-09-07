"use client"; // [NEW] App Router 下必须加，否则 DOM/IntersectionObserver 都不生效

import React, { useState, useMemo, useRef, useEffect } from "react";

import { Card } from "~/components/ui/card";
import type { Message } from "~/core/messages";
import MarkdownStyled from "./MarkdownStyled";

export default function ResearchFindings({
  markdown,
  message,
}: {
  markdown: string;
  message: Message | undefined;
}) {
  const toc = useMemo(
    () => buildToc(message?.content || ""),
    [message?.content],
  );

  const [activeId, setActiveId] = useState<string | null>(toc[0]?.id ?? null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimer = useRef<number | null>(null);

  // [NEW] 右侧文章容器的 ref（如果页面是自定义滚动容器，这里要指向它）
  const articleRef = useRef<HTMLElement | null>(null);

  // [NEW] 查找实际的滚动容器：优先找最近的 overflow auto/scroll 容器，否则用 window
  const getScrollParent = (el: HTMLElement | null): HTMLElement | Window => {
    let node: HTMLElement | null = el;
    while (node && node !== document.body) {
      const { overflowY } = getComputedStyle(node);
      if (/(auto|scroll|overlay)/.test(overflowY)) return node;
      node = node.parentElement;
    }
    // 如果页面就是用 window 滚动：
    return window;
  };

  // [NEW] 计算目标元素在滚动容器中的 top（非 window 场景）
  const getOffsetTopWithin = (el: HTMLElement, container: HTMLElement) => {
    let y = 0;
    let node: HTMLElement | null = el;
    while (node && node !== container) {
      y += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    return y;
  };

  // Scroll to anchor smoothly（兼容 window 与自定义滚动容器）
  const handleJump = (id: string) => {
    const h = document.getElementById(id);
    if (!h) return;

    setActiveId(id); // ① 立即激活

    isProgrammaticScroll.current = true;
    if (scrollTimer.current) window.clearTimeout(scrollTimer.current);

    const scrollContainer = getScrollParent(articleRef.current);
    const offset = 80; // 你的吸顶高度
    if (scrollContainer === window) {
      const y = h.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      const container = scrollContainer as HTMLElement;
      const y = getOffsetTopWithin(h, container) - offset;
      container.scrollTo({ top: y, behavior: "smooth" });
    }

    // history.replaceState(null, "", `#${id}`);

    scrollTimer.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 600);
  };

  // ========== 替换你现有的 useEffect(设置 IntersectionObserver) ==========
  useEffect(() => {
    if (!toc.length) return;

    const scrollContainer = getScrollParent(articleRef.current);
    const rootEl =
      scrollContainer === window ? null : (scrollContainer as Element);

    // 获取“中线”相对容器顶部的位置（像素）
    const getViewportMid = () => {
      if (scrollContainer === window) return window.innerHeight * 0.5;
      const el = scrollContainer as HTMLElement;
      return el.clientHeight * 0.5;
    };

    // 从所有 entries 中选出最靠近中线的一个
    const pickClosestToMid = (entries: IntersectionObserverEntry[]) => {
      const mid = getViewportMid();
      let best: { id: string; dist: number } | null = null;

      for (const e of entries) {
        const id = (e.target as HTMLElement).id;
        // 以目标顶部到容器可视区顶部的距离衡量
        const top = e.boundingClientRect.top;
        const dist = Math.abs(top - mid);
        if (e.isIntersecting) {
          if (!best || dist < best.dist) best = { id, dist };
        }
      }
      return best?.id ?? null;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        // 1) 优先：在中线带内的 isIntersecting 元素里选一个最近的
        const id = pickClosestToMid(entries);
        if (id) {
          setActiveId(id);
        }
        // 2) 没有命中时，交给滚动兜底（下面的 scroll 监听会处理）
      },
      {
        root: rootEl,
        // 中线带：上 45% / 下 55% 之外不算可见（就会更偏向中间区域）
        rootMargin: "-45% 0px -55% 0px",
        threshold: 0,
      },
    );

    // 监听实际 DOM 里的 h2 节点
    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  // ========== 额外新增：滚动兜底（无 isIntersecting 时） ==========
  useEffect(() => {
    if (!toc.length) return;

    const scrollContainer = getScrollParent(articleRef.current);
    const containerEl =
      scrollContainer === window
        ? document.documentElement
        : (scrollContainer as HTMLElement);

    const getScrollTop = () =>
      scrollContainer === window
        ? window.scrollY
        : (scrollContainer as HTMLElement).scrollTop;
    const getViewportMid = () => {
      if (scrollContainer === window) return window.innerHeight * 0.5;
      return (scrollContainer as HTMLElement).clientHeight * 0.5;
    };

    const onScroll = () => {
      if (isProgrammaticScroll.current) return;

      const mid = getScrollTop() + getViewportMid();

      // 计算所有标题的“文档坐标系 top”（相对页面或容器）
      const tops = toc
        .map((t) => {
          const el = document.getElementById(t.id);
          if (!el) return null;

          if (scrollContainer === window) {
            const docTop = el.getBoundingClientRect().top + window.scrollY;
            return { id: t.id, top: docTop };
          } else {
            // 容器内坐标
            const container = scrollContainer as HTMLElement;
            let y = 0;
            let node: HTMLElement | null = el;
            while (node && node !== container) {
              y += node.offsetTop;
              node = node.offsetParent as HTMLElement | null;
            }
            return { id: t.id, top: y };
          }
        })
        .filter(Boolean) as { id: string; top: number }[];

      if (!tops.length) return;

      // 1) 找到 <= mid 的最后一个标题
      let current = tops[0]?.id;
      for (const item of tops) {
        if (item.top <= mid) current = item.id;
        else break;
      }

      // 2) 接近底部时，强制选最后一个标题（避免底部区域没有任何标题穿过中线）
      const bottom =
        scrollContainer === window
          ? window.scrollY + window.innerHeight
          : (scrollContainer as HTMLElement).scrollTop +
            (scrollContainer as HTMLElement).clientHeight;
      const maxScroll =
        scrollContainer === window
          ? document.documentElement.scrollHeight
          : (scrollContainer as HTMLElement).scrollHeight;

      // 距底 <= 2px 视为在底部（可酌情放宽）
      if (maxScroll - bottom <= 2) {
        current = tops[tops.length - 1]?.id;
      }

      setActiveId((prev: any) => (prev === current ? prev : current));
    };

    // 监听滚动 + 视口尺寸变化
    const target =
      scrollContainer === window ? window : (scrollContainer as HTMLElement);
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // 初次触发一次，保证进入页面就有正确 active
    onScroll();

    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [toc]);

  // 初次进入时根据 hash 定位（等待布局稳定）
  // useEffect(() => {
  //   const id = decodeURIComponent(location.hash.replace(/^#/, ""));
  //   if (!id) return;

  //   const h = document.getElementById(id);
  //   if (!h) return;

  //   const scrollContainer = getScrollParent(articleRef.current);
  //   const offset = 80;

  //   // RAF 两次，确保图片/字体导致布局变化后再定位
  //   requestAnimationFrame(() => {
  //     requestAnimationFrame(() => {
  //       if (scrollContainer === window) {
  //         const y = h.getBoundingClientRect().top + window.scrollY - offset;
  //         window.scrollTo({ top: y });
  //       } else {
  //         const container = scrollContainer as HTMLElement;
  //         const y = getOffsetTopWithin(h, container) - offset;
  //         container.scrollTo({ top: y });
  //       }
  //       setActiveId(id);
  //     });
  //   });
  // }, []);

  return (
    <div className="w-full text-black">
      {/* Top */}
      <div className="h-[260px] w-full rounded-2xl bg-gradient-to-r from-[#fff] to-[#979797] ring-1 ring-black/10 backdrop-blur-xl"></div>
      {/* Main */}
      <div className="mt-[30px] flex gap-[30px]">
        <aside className="relative w-[230px] flex-shrink-0">
          <Card className="sticky top-6 overflow-auto rounded-2xl border-black/10 p-4 backdrop-blur-md">
            <div className="text-sm font-semibold text-neutral-800">目录</div>
            <nav className="space-y-2">
              {toc.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleJump(item.id)}
                  className={
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors " +
                    (activeId === item.id
                      ? "bg-black/5 text-black"
                      : "text-neutral-500 hover:bg-black/5 hover:text-black")
                  }
                >
                  <span
                    className={
                      "grid h-6 w-6 place-content-center rounded-full border text-xs " +
                      (activeId === item.id
                        ? "border-[#f67c00]/70 bg-[#f67c00]/20"
                        : "border-black/10 bg-black/5")
                    }
                  >
                    {idx + 1}
                  </span>
                  <span className="line-clamp-1">{item.text}</span>
                </button>
              ))}
            </nav>
          </Card>
        </aside>

        {/* [CHG] 绑定 ref，供定位与观察使用；若你有外层自定义滚动容器，可把 ref 绑到它上面 */}
        <article ref={articleRef} className="min-h-[60vh] min-w-0 flex-1">
          <MarkdownStyled markdown={message?.content || ""} />
        </article>
      </div>
    </div>
  );
}

/** 你的 buildToc/slug 原样保留即可 */
function buildToc(md: string): { id: string; text: string }[] {
  const lines = md.split(/\n+/);
  const items: { id: string; text: string }[] = [];
  for (const ln of lines) {
    const m = /^##\s+(.+)$/.exec(ln.trim());
    if (m && m[1]) {
      const text = m[1].trim();
      const id = slug(text);
      items.push({ id, text });
    }
  }
  return items;
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

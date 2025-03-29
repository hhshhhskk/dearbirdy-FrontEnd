import { useEffect, useState } from "react";

export default function useKeyboardTransformOffset({
  offsetFromKeyboard = -35, // bottom 44 - margin 9
}: {
  offsetFromKeyboard?: number;
} = {}) {
  const [transformY, setTransformY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const viewport = window.visualViewport;
    if (!viewport) return;

    let animationFrame: number;

    const update = () => {
      const heightDiff = window.innerHeight - viewport.height;

      const isKeyboardOpen = heightDiff > 100;
      const isKeyboardClosingQuick = heightDiff < 50;

      if (isKeyboardOpen) {
        setTransformY(heightDiff + offsetFromKeyboard);
      } else if (isKeyboardClosingQuick) {
        setTransformY(0);
      }
    };

    const handleVisualViewport = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(update);
    };

    const handleFocusOut = () => {
      // 키보드 내려가기 직전에 미리 처리
      setTransformY(0);
    };

    update(); // 초기 실행
    viewport.addEventListener("resize", handleVisualViewport);
    viewport.addEventListener("scroll", handleVisualViewport);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      viewport.removeEventListener("resize", handleVisualViewport);
      viewport.removeEventListener("scroll", handleVisualViewport);
      document.removeEventListener("focusout", handleFocusOut);
      cancelAnimationFrame(animationFrame);
    };
  }, [offsetFromKeyboard]);

  return transformY;
}

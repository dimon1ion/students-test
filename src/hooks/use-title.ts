import { useLayoutEffect } from "react";

/**
 * Хук смены имени вкладки
 */
export default function useTitle(title: string) {
  useLayoutEffect(() => {
    document.title = title;
  });
  return;
}

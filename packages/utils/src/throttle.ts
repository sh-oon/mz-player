/**
 * 함수 호출을 지정된 시간 간격으로 제한합니다.
 * 
 * @param func - 실행할 함수
 * @param limit - 실행 간격 (밀리초)
 * @returns throttle이 적용된 함수
 */
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, limit);
  };
}


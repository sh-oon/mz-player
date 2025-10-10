import type { ReactNode } from 'react';

export interface ButtonGroupProps {
  /** 자식 컴포넌트들 */
  children: ReactNode;
  /** CSS 클래스명 */
  className?: string;
}

export function ButtonGroup({ children, className = '' }: Readonly<ButtonGroupProps>) {
  return <div className={`mz-player-buttons ${className}`}>{children}</div>;
}

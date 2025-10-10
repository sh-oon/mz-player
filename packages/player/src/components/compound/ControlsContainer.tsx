import type { ReactNode } from 'react';

export interface ControlsContainerProps {
  /** 자식 컴포넌트들 */
  children: ReactNode;
  /** CSS 클래스명 */
  className?: string;
}

export function ControlsContainer({ children, className = '' }: Readonly<ControlsContainerProps>) {
  return (
    <div className={`mz-player-controls ${className}`}>
      <div className="mz-player-progress">
        {children}
      </div>
    </div>
  );
}


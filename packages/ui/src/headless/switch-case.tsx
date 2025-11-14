import { Fragment, memo } from 'react';

export interface SwitchCaseProps {
  value: string | boolean | number;
  cases: {
    [key: string]: React.ReactNode;
  };
  defaultCase?: React.ReactNode;
}

/**
 * 값에 따라 다른 콘텐츠를 렌더링하는 React 컴포넌트입니다. switch-case 문과 유사하게 동작합니다.
 *
 * @param value - 케이스 키와 비교할 값
 * @param cases - 케이스 키와 해당 React 노드를 매핑하는 객체
 * @param defaultCase - 일치하는 케이스가 없을 때 렌더링할 기본 콘텐츠 (선택사항)
 *
 * @example
 * ```tsx
 * <SwitchCase
 *   value={loading}
 *   cases={{
 *     loading: <Spinner />,
 *     error: <ErrorMessage />,
 *     success: <SuccessContent />
 *   }}
 *   defaultCase={<DefaultContent />}
 * />
 * ```
 */
export const SwitchCase = memo(({ value, cases, defaultCase }: SwitchCaseProps) => {
  const caseKeys = Object.keys(cases);

  return (
    <div>
      {caseKeys.map((key) => (
        <Fragment key={key}>{key === value && cases[key]}</Fragment>
      ))}
      {defaultCase && !caseKeys.includes(value.toString()) && <Fragment>{defaultCase}</Fragment>}
    </div>
  );
});

SwitchCase.displayName = 'SwitchCase';

import { PropsWithChildren } from 'react';

export function PageContainer({ children }: PropsWithChildren) {
  return <div className="mx-auto max-w-2xl">{children}</div>;
}

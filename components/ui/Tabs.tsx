export interface TabsProps {
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ children, className }: TabsProps) {
  return <div className={className}>{children}</div>;
}

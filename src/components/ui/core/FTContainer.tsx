interface FTContainerProps {
  children: React.ReactNode;
  className?: string;
}

function FTContainer({ children, className = '' }: FTContainerProps) {
  return (
    <div className={`max-w-[1526px] mx-auto  ${className}`}>{children}</div>
  );
}

export default FTContainer;

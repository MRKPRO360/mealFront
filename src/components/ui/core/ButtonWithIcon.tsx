interface IButtonWithIconProps {
  variant: 'blue' | 'black';
  text: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

export function ButtonWithIcon({
  variant,
  text,
  icon,
  disabled = false,
}: IButtonWithIconProps) {
  const baseClasses =
    'w-full flex items-center justify-center p-2 rounded-xs transition-all';
  const variantClasses = {
    black: disabled
      ? 'bg-black/80 text-white cursor-not-allowed'
      : 'bg-black text-white cursor-pointer',
    blue: disabled
      ? 'bg-blue-400 text-white cursor-not-allowed'
      : 'bg-blue-600 text-white cursor-pointer',
  };

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {icon}
      <span className="ml-auto mr-auto">Login with {text}</span>
    </button>
  );
}

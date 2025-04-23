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
  return (
    <button
      disabled={disabled}
      className={`w-full flex items-center justify-center cursor-pointer p-2 rounded-xs ${
        variant === 'black' ? 'bg-black text-white' : 'bg-blue-500 text-white'
      }`}
    >
      {icon}
      <span className="ml-auto mr-auto">Login with {text}</span>
    </button>
  );
}

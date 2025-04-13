const truncateWords = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);

  // Find the last space within the truncated portion
  const lastSpace = truncated.lastIndexOf(' ');

  return `${truncated.slice(0, lastSpace)}...`;
};

interface ITruncatedTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

export const TruncatedText = ({
  text,
  maxLength = 100,
  className = '',
}: ITruncatedTextProps) => {
  const safeText =
    text.length <= maxLength ? text : truncateWords(text, maxLength);

  return <p className={className}>{safeText}</p>;
};

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-title text-white px-3 w-fit select-none rounded">
      {text}
    </button>
  );
}

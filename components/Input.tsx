export default function Input({ value, setValue, placeholder }: InputProps) {
  return (
    <>
      <div className="px-2 pt-2 text-sm">{placeholder}</div>
      <input
        className="border border-title rounded-md px-4 py-1 w-full"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}

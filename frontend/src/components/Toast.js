export default function Toast({ message }) {
  return (
    <div className="bg-[#E2725B] text-white px-4 py-2 rounded shadow animate-fadeIn">
      {message}
    </div>
  );
}

const icons = {
  VEG: "🥗",
  NON_VEG: "🍖",
  DRINK: "🥤"
};

export default function CategoryBadge({ type }) {
  return (
    <span className="text-sm text-[color:var(--secondary)] font-medium">
      {icons[type]} {type.replace("_", " ")}
    </span>
  );
}

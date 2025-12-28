import type { MainTag } from "../types/dashboard";

export default function TagStatus({ tag }: { tag: MainTag }) {
  return (
    <div className="flex justify-between text-sm">
      <span>{tag.tag_name}</span>

      <span
        className={`font-medium ${
          tag.active ? "text-green-600" : "text-gray-400"
        }`}
      >
        {tag.active ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

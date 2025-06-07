"use client";

interface Tag {
  id: number;
  name: string;
}

interface Props {
  tags: Tag[];
  selected: number[];
  onChange: (ids: number[]) => void;
}

export default function TagSelector({ tags, selected, onChange }: Props) {
  const toggle = (id: number) => {
    const next = selected.includes(id)
      ? selected.filter((i) => i !== id)
      : [...selected, id];
    onChange(next);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {tags.map((tag) => (
        <label key={tag.id} className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={selected.includes(tag.id)}
            onChange={() => toggle(tag.id)}
          />
          {tag.name}
        </label>
      ))}
    </div>
  );
}

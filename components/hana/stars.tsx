import { Star } from "lucide-react";

/** Note en étoiles ambre (sur 5). */
export function Stars({ note }: { note: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${note} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < note ? "fill-ambre text-ambre" : "text-espresso/20"}`}
        />
      ))}
    </div>
  );
}

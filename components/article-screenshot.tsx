"use client";

import { useState } from "react";

export function ArticleScreenshot({
  url,
  title,
  source,
}: {
  url: string;
  title: string;
  source: string;
}) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const shotUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(
    url,
  )}?w=1200&h=750`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group block relative rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--card)] hover:border-[var(--foreground)] transition-colors mb-8"
      style={{ aspectRatio: "1200/750" }}
      aria-label={`Open original article on ${source}`}
    >
      {!errored ? (
        <>
          {!loaded && <PlaceholderArt source={source} title={title} />}
          <img
            src={shotUrl}
            alt=""
            loading="lazy"
            onLoad={(e) => {
              const img = e.currentTarget;
              // mshots returns a tiny placeholder gif (~400 bytes) when not yet rendered; treat as error.
              if (img.naturalWidth < 200) {
                setErrored(true);
              } else {
                setLoaded(true);
              }
            }}
            onError={() => setErrored(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
          />
        </>
      ) : (
        <PlaceholderArt source={source} title={title} />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <span className="text-white text-sm font-medium inline-flex items-center gap-1.5">
          Open on {source} ↗
        </span>
      </div>
    </a>
  );
}

function PlaceholderArt({ source, title }: { source: string; title: string }) {
  // Deterministic hue from the source name
  const hue =
    Math.abs(source.split("").reduce((a, c) => a + c.charCodeAt(0) * 7, 0)) %
    360;
  return (
    <div
      className="w-full h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 35% 22%) 0%, hsl(${(hue + 40) % 360} 30% 12%) 100%)`,
      }}
    >
      <div className="text-center">
        <div className="text-white/40 text-xs uppercase tracking-widest mb-3 font-mono">
          {source}
        </div>
        <div className="text-white/90 text-base font-medium leading-snug max-w-md mx-auto line-clamp-3">
          {title}
        </div>
      </div>
    </div>
  );
}

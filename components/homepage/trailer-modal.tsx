"use client";

import { useEffect, useState } from "react";
import { X, Loader2, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type TrailerModalProps = {
  movieId: number | null;
  open: boolean;
  onClose: () => void;
};

export default function TrailerModal({
  movieId,
  open,
  onClose,
}: TrailerModalProps) {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId || !open) return;

    async function fetchTrailer() {
      setLoading(true);
      try {
        const res = await fetch(`/api/trailer?movieId=${movieId}`);
        const data = await res.json();
        setVideoKey(data?.key ?? null);
      } catch {
        setVideoKey(null);
      } finally {
        setLoading(false);
      }
    }

    fetchTrailer();
  }, [movieId, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* Changed max-w-5xl to max-w-6xl for a bigger player */}
      <DialogContent className="max-w-6xl border-white/10 bg-black p-0 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <VisuallyHidden>
          <DialogTitle>Movie Trailer</DialogTitle>
        </VisuallyHidden>

        <div className="relative aspect-video bg-zinc-950 flex items-center justify-center">
          {/* Enhanced Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[100] group flex items-center justify-center 
                       h-10 w-10 rounded-full bg-black/50 backdrop-blur-md 
                       border border-white/10 text-white transition-all 
                       hover:bg-primary hover:border-primary hover:scale-110 active:scale-95"
            aria-label="Close trailer"
          >
            <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
          </button>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">
                Loading Stream
              </p>
            </div>
          )}

          {/* Video Player */}
          {!loading && videoKey && (
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          )}

          {/* Error State */}
          {!loading && !videoKey && (
            <div className="flex flex-col items-center gap-4 px-6 text-center">
              <div className="rounded-full bg-zinc-900 p-6">
                <AlertCircle className="h-10 w-10 text-zinc-700" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  Trailer Unavailable
                </h4>
                <p className="text-zinc-500 text-sm">
                  We couldn't load the preview for this title.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface EditorialImageProps {
  src?: string;
  alt: string;
  caption?: string;
  aspectClass?: string;
  className?: string;
  imgClassName?: string;
  fallbackLabel?: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  caption,
  aspectClass = 'aspect-[4/3]',
  className = '',
  imgClassName = '',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  const showFallback = !src || hasError;

  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        className={`relative overflow-hidden rounded-lg bg-slate-100 border border-slate-200 ${aspectClass}`}
      >
        {showFallback ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-50 to-slate-200/70">
            <GraduationCap className="w-8 h-8 text-[#1E3A8A] mb-3 stroke-[1.5]" aria-hidden="true" />
            <span className="font-serif text-sm text-slate-700 max-w-xs">
              {fallbackLabel || alt}
            </span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-transform duration-300 ${imgClassName}`}
          />
        )}
      </div>
      {caption && (
        <figcaption className="text-xs text-slate-500 mt-2.5 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

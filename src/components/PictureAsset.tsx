import type { PropertyImage } from '../data/propertyData';

interface PictureAssetProps {
  image: PropertyImage;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: 'hero' | 'lazy' | 'default';
  decoding?: 'async' | 'sync' | 'auto';
}

export function PictureAsset({
  image,
  sizes,
  className = 'block',
  imgClassName = 'block w-full h-auto',
  priority = 'default',
  decoding = 'async',
}: PictureAssetProps) {
  const base = `${import.meta.env.BASE_URL}media/${image.slug}`;

  return (
    <picture className={className}>
      <source
        type="image/avif"
        srcSet={`${base}-640.avif 640w, ${base}-960.avif 960w, ${base}-1920.avif 1920w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${base}-640.webp 640w, ${base}-960.webp 960w, ${base}-1920.webp 1920w`}
        sizes={sizes}
      />
      <img
        src={`${base}-1920.jpg`}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={imgClassName}
        decoding={decoding}
        fetchPriority={priority === 'hero' ? 'high' : undefined}
        loading={priority === 'lazy' ? 'lazy' : undefined}
      />
    </picture>
  );
}

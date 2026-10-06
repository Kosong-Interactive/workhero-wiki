export default function Icon({ src, size = 24, alt = '' }: { src: string | null | undefined; size?: number; alt?: string }) {
  if (!src) return <span className="icon-missing" style={{ width: size, height: size }} />
  return <img className="icon" src={src} width={size} height={size} alt={alt} />
}

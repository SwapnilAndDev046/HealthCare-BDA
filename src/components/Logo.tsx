import { Stethoscope } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="HealthWise Navigator Home">
      <Stethoscope className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold text-foreground tracking-tight">
        HealthWise Navigator
      </span>
    </Link>
  );
}

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import Logo from '@/components/Logo';

const footerLinks = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Your smart healthcare recommendation assistant.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-foreground">Navigation</h3>
                    <Link href="/" className="text-sm text-muted-foreground hover:text-primary">Home</Link>
                    <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-foreground">Legal</h3>
                    {footerLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                        {link.label}
                    </Link>
                    ))}
                </div>
                <div className="sm:col-span-2 md:col-span-1 p-4 bg-card rounded-lg border border-destructive/50">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <h4 className="font-semibold text-destructive">Emergency Disclaimer</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        This tool is for informational purposes only and not a substitute for professional medical advice. If you are experiencing a medical emergency, call your local emergency number immediately.
                    </p>
                </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} HealthWise Navigator. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import Image from 'next/image';
import SymptomInputForm from '@/components/SymptomInputForm';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-health-illustration');

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
              Navigate Your Health with Confidence
            </h1>
            <p className="text-lg text-muted-foreground">
              Enter your symptoms to receive a list of potential conditions and expert-backed next steps, powered by advanced AI.
            </p>
            <div className="mt-4">
              <SymptomInputForm />
            </div>
          </div>
          <div className="relative h-64 md:h-auto md:aspect-square">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover rounded-xl shadow-2xl"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

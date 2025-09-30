import Link from 'next/link';
import { Suspense } from 'react';
import { adjustRecommendations } from '@/ai/flows/personalized-recommendation-adjustment';
import RecommendationCard from '@/components/RecommendationCard';
import type { Recommendation } from '@/lib/definitions';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Loading from './loading';

// Mock function to simulate fetching initial recommendations from a ML model
async function getInitialRecommendations(symptoms: string): Promise<string[]> {
  // In a real app, this would be an API call to a service like PySpark MLlib
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  const lowerSymptoms = symptoms.toLowerCase();
  if (lowerSymptoms.includes('headache') && lowerSymptoms.includes('fever')) {
    return ['Migraine', 'Common Cold', 'Flu (Influenza)', 'Sinusitis'];
  }
  if (lowerSymptoms.includes('stomach') && (lowerSymptoms.includes('nausea') || lowerSymptoms.includes('pain'))) {
    return ['Gastroenteritis', 'Food Poisoning', 'Acid Reflux', 'Irritable Bowel Syndrome'];
  }
  if (lowerSymptoms.includes('cough') && lowerSymptoms.includes('chest')) {
      return ['Bronchitis', 'Pneumonia', 'Asthma', 'Common Cold'];
  }
  return ['Common Cold', 'Allergies', 'Stress', 'Dehydration'];
}

// Mock function to simulate getting clustered symptom data
async function getClusteredSymptomData(symptoms: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return "Users with similar symptoms were also diagnosed with tension headaches and dehydration.";
}

// Mock function to simulate getting past results
async function getPastResults(symptoms: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return "Past anonymized data shows a high correlation between persistent headaches and migraines, with over-the-counter pain relievers being the most common first-line treatment.";
}


async function RecommendationsList({ symptoms }: { symptoms: string }) {
  try {
    const initialRecommendations = await getInitialRecommendations(symptoms);
    const pastResults = await getPastResults(symptoms);
    const clusteredSymptomData = await getClusteredSymptomData(symptoms);

    const adjustedList = await adjustRecommendations({
      symptoms,
      initialRecommendations,
      pastResults,
      clusteredSymptomData,
    });

    const finalRecommendations: Recommendation[] = adjustedList.map((condition) => ({
      condition,
      confidence: Math.floor(Math.random() * (95 - 60 + 1)) + 60, // Random confidence between 60-95%
      nextSteps: 'Consult a Healthcare Professional',
      details: `Based on your symptoms, ${condition} is a possible cause. This information is not a diagnosis.`,
    }));
    
    if (finalRecommendations.length === 0) {
        return <p>No recommendations could be generated for the provided symptoms.</p>
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-50 duration-500">
        {finalRecommendations.map((rec, index) => (
          <RecommendationCard key={index} recommendation={rec} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                We're sorry, but an error occurred while generating your recommendations. Please try again later.
            </AlertDescription>
        </Alert>
    )
  }
}

export default function RecommendationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const symptoms = typeof searchParams.symptoms === 'string' ? searchParams.symptoms : '';

  if (!symptoms) {
    return (
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold font-headline">No Symptoms Provided</h1>
        <p className="text-muted-foreground mt-2">
          Please go back to the home page to enter your symptoms.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <Button asChild variant="outline" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Enter Different Symptoms
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Your Health Recommendations</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Based on your symptoms, here are some potential conditions. This is not a medical diagnosis. Please consult a healthcare professional for an accurate assessment.
        </p>
        <div className="mt-4 p-4 border border-dashed border-border rounded-lg bg-card/50">
            <h3 className="font-semibold text-foreground mb-1">Your Symptoms:</h3>
            <p className="text-sm text-muted-foreground italic">"{symptoms}"</p>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <RecommendationsList symptoms={symptoms} />
      </Suspense>
    </div>
  );
}

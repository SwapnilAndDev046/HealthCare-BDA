'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { Recommendation } from "@/lib/definitions";
import { useEffect, useState } from "react";

type RecommendationCardProps = {
  recommendation: Recommendation;
};

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar on mount
    const timer = setTimeout(() => setProgress(recommendation.confidence), 100);
    return () => clearTimeout(timer);
  }, [recommendation.confidence]);

  return (
    <Card className="flex flex-col transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-primary/30 bg-card">
      <CardHeader>
        <CardTitle className="text-xl font-headline">{recommendation.condition}</CardTitle>
        <CardDescription>Potential Match</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <p className="text-sm font-medium mb-2 text-muted-foreground">Confidence Score: {recommendation.confidence}%</p>
          <Progress value={progress} className="w-full h-2 [&>div]:bg-primary" />
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-1 text-foreground">Details</h4>
          <p className="text-sm text-muted-foreground">
            {recommendation.details}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" disabled>
          {recommendation.nextSteps}
        </Button>
      </CardFooter>
    </Card>
  );
}

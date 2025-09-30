'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { Recommendation } from "@/lib/definitions";
import { useEffect, useState, useRef } from "react";
import { generateSpeech } from "@/ai/flows/text-to-speech";
import { Volume2, LoaderCircle, AlertCircle } from 'lucide-react';

type RecommendationCardProps = {
  recommendation: Recommendation;
};

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const [progress, setProgress] = useState(0);
  const [audioState, setAudioState] = useState<'idle' | 'loading' | 'playing' | 'error'>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(recommendation.confidence), 100);
    return () => clearTimeout(timer);
  }, [recommendation.confidence]);

  const handleListen = async () => {
    if (audioRef.current && audioState === 'playing') {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioState('idle');
      return;
    }
    
    if (audioRef.current && audioState === 'idle') {
        audioRef.current.play();
        return;
    }

    setAudioState('loading');
    try {
      const { media } = await generateSpeech(recommendation.details);
      const audio = new Audio(media);
      audioRef.current = audio;
      audio.play();
      setAudioState('playing');

      audio.onended = () => {
        setAudioState('idle');
      };
      audio.onplay = () => {
        setAudioState('playing');
      }
      audio.onpause = () => {
        if(audio.currentTime !== audio.duration) {
            setAudioState('idle');
        }
      }

    } catch (error) {
      console.error("Error generating speech:", error);
      setAudioState('error');
    }
  };

  const getListenButtonContent = () => {
    switch(audioState) {
        case 'loading':
            return <><LoaderCircle className="animate-spin" /> Loading...</>
        case 'playing':
            return <><Volume2 /> Stop</>
        case 'error':
            return <><AlertCircle /> Error</>
        case 'idle':
        default:
            return <><Volume2 /> Listen</>
    }
  }

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
      <CardFooter className="flex-col sm:flex-row gap-2">
        <Button variant="outline" className="w-full" disabled>
          {recommendation.nextSteps}
        </Button>
        <Button variant="secondary" className="w-full" onClick={handleListen} disabled={audioState === 'loading'}>
            {getListenButtonContent()}
        </Button>
      </CardFooter>
    </Card>
  );
}

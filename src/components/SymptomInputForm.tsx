
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { HeartPulse, Mic, MicOff } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  symptoms: z.string().min(10, {
    message: 'Please describe your symptoms in at least 10 characters.',
  }),
});

// Extend the window type for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function SymptomInputForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      symptoms: '',
    },
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }
          const currentSymptoms = form.getValues('symptoms');
          form.setValue('symptoms', currentSymptoms + finalTranscript + interimTranscript);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.onerror = (event: any) => {
          toast({
            variant: 'destructive',
            title: 'Speech Recognition Error',
            description: `An error occurred: ${event.error}. Please check your connection and try again.`,
          });
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setSpeechSupported(false);
      }
    }
  }, [form, toast]);

  const handleListen = () => {
    if (!speechSupported) {
        toast({
            variant: 'destructive',
            title: 'Unsupported Browser',
            description: "Sorry, your browser doesn't support speech recognition.",
        });
        return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if(recognitionRef.current) {
        form.setValue('symptoms', ''); // Clear previous text
        try {
          recognitionRef.current?.start();
          setIsListening(true);
        } catch (error) {
            console.error("Could not start recognition:", error);
            toast({
                variant: 'destructive',
                title: 'Could Not Start Listening',
                description: 'Please ensure microphone permissions are granted and try again.',
            });
        }
      }
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    if(isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
    const params = new URLSearchParams({ symptoms: data.symptoms });
    router.push(`/recommendations?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="symptoms"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Symptoms</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., 'I have a persistent headache, fever, and a sore throat...'"
                  className="min-h-[120px] resize-none text-base bg-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <Button type="submit" size="lg" className="w-full font-semibold" disabled={isSubmitting || isListening}>
            <HeartPulse className="mr-2 h-5 w-5" />
            {isSubmitting ? 'Analyzing...' : 'Get Recommendations'}
          </Button>
          <Button type="button" size="lg" variant="outline" onClick={handleListen} className="w-full sm:w-auto" disabled={isSubmitting}>
              {isListening ? <MicOff className="mr-2 h-5 w-5" /> : <Mic className="mr-2 h-5 w-5" />}
              {isListening ? 'Stop Listening' : 'Use Mic'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

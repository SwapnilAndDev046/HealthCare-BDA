
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
import { HeartPulse } from 'lucide-react';
import { useState } from 'react';

const FormSchema = z.object({
  symptoms: z.string().min(10, {
    message: 'Please describe your symptoms in at least 10 characters.',
  }),
});

export default function SymptomInputForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      symptoms: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
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
          <Button type="submit" size="lg" className="w-full font-semibold" disabled={isSubmitting}>
            <HeartPulse className="mr-2 h-5 w-5" />
            {isSubmitting ? 'Analyzing...' : 'Get Recommendations'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl py-16 px-4">
      <h1 className="text-4xl font-bold font-headline mb-4">Contact Us</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Have questions or feedback? We'd love to hear from you.
        </p>
        <p>
          For general inquiries, please email us at: <a href="mailto:contact@healthwisenavigator.com" className="text-primary hover:underline">contact@healthwisenavigator.com</a>
        </p>
        <p>
          Please note that we cannot provide medical advice. If you have a medical question, please consult a healthcare professional.
        </p>
        <h2 className="text-2xl font-semibold text-foreground pt-4 font-headline">Address</h2>
        <p>
          HealthWise Navigator HQ<br />
          123 Wellness Ave.<br />
          Health City, HC 45678
        </p>
      </div>
    </div>
  );
}

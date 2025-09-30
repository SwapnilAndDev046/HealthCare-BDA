export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl py-16 px-4">
      <h1 className="text-4xl font-bold font-headline mb-4">Privacy Policy</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Your privacy is important to us. This Privacy Policy explains how HealthWise Navigator collects, uses, and protects your information.
        </p>
        <h2 className="text-2xl font-semibold text-foreground pt-4 font-headline">Information We Collect</h2>
        <p>
          We collect the symptoms you provide to generate health recommendations. This data is processed anonymously to improve our service and for analytical purposes. We do not require personal identification to use our core service.
        </p>
        <h2 className="text-2xl font-semibold text-foreground pt-4 font-headline">Data Storage and Security</h2>
        <p>
          All symptom data is stored securely. We implement industry-standard security measures to protect your information from unauthorized access. Anonymized and aggregated data may be used for research and to enhance our AI models.
        </p>
        <h2 className="text-2xl font-semibold text-foreground pt-4 font-headline">Third-Party Services</h2>
        <p>
          We use third-party services for AI processing. Your symptom data is shared with these services solely for the purpose of generating your recommendations.
        </p>
         <h2 className="text-2xl font-semibold text-foreground pt-4 font-headline">Your Consent</h2>
        <p>
          By using our website, you consent to our Privacy Policy.
        </p>
         <h2 className="text-2xl font-semibold text-foreground pt-4 font-headline">Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
      </div>
    </div>
  );
}

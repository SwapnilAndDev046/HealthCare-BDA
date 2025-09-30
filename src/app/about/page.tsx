export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl py-16 px-4">
      <h1 className="text-4xl font-bold font-headline mb-4">About HealthWise Navigator</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          HealthWise Navigator is a modern, AI-powered tool designed to help individuals understand their symptoms and explore potential health conditions. Our mission is to provide accessible, trustworthy, and preliminary health information to empower users in their healthcare journey.
        </p>
        <p>
          Using advanced machine learning models and large language models, our platform analyzes user-provided symptoms to generate a ranked list of possible conditions, complete with confidence scores and suggested next steps.
        </p>
        <h2 className="text-2xl font-semibold text-foreground pt-4 font-headline">Our Technology</h2>
        <p>
          The core of our recommendation engine is built on a sophisticated backend that simulates integration with predictive analytics tools like PySpark MLlib. We leverage anonymized, aggregated data from past queries and clustered symptom data to continually refine our models, ensuring the insights we provide are relevant and informed.
        </p>
        <h2 className="text-2xl font-semibold text-foreground pt-4 font-headline">Important Disclaimer</h2>
        <p>
          HealthWise Navigator is an informational tool and does not provide medical advice. The recommendations generated are not a diagnosis and should not be treated as such. Always consult with a qualified healthcare professional for any medical concerns or before making any decisions related to your health.
        </p>
      </div>
    </div>
  );
}

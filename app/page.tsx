import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AdSight
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Real-Time Ad Metrics Monitoring & Alerting Platform
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <FeatureCard
            title="Real-Time Monitoring"
            description="Track KPIs in real-time across all your ad campaigns"
          />
          <FeatureCard
            title="Multi-Channel Alerts"
            description="Get notified via Email, Slack, WhatsApp, or Dashboard"
          />
          <FeatureCard
            title="Configurable Rules"
            description="Define custom triggers for any metric with flexible conditions"
          />
          <FeatureCard
            title="Persona-Based Routing"
            description="Route alerts to the right people via their preferred channels"
          />
          <FeatureCard
            title="Health Scores"
            description="Get a 0-100 health score for each campaign"
          />
          <FeatureCard
            title="Tiered Alerts"
            description="Critical, Warning, and Informational alert levels"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}


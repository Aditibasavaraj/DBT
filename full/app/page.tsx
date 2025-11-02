import DBTChecker from '@/components/DBTChecker';

export default function Home() {
  return (
    <div>
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              DBT Awareness Dashboard
            </h1>
            <p className="mt-3 text-lg text-gray-500">
              Check your DBT (Direct Benefit Transfer) status and verify account readiness
            </p>
          </div>
          <DBTChecker />
        </div>
      </main>
    </div>
  );
}

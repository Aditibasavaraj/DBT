'use client';

import { useState } from 'react';
import { DBTCheckPayload, DBTCheckResponse } from '@/lib/types';

export default function DBTChecker() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult('');

    const formData = new FormData(event.currentTarget);
    const payload: DBTCheckPayload = {
      name: formData.get('name') as string,
      aadhaar: formData.get('aadhaar') as string,
      account: formData.get('account') as string,
      bank: formData.get('bank') as string,
    };

    try {
      const response = await fetch('/api/dbt-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: DBTCheckResponse = await response.json();
      setResult(data.message);
    } catch (error) {
      console.error('Error:', error);
      setResult('⚠️ Error connecting to server.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">DBT Status Checker</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700">Aadhaar</label>
          <input
            type="text"
            id="aadhaar"
            name="aadhaar"
            required
            pattern="\d{12}"
            title="Please enter a valid 12-digit Aadhaar number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="account" className="block text-sm font-medium text-gray-700">Account Number</label>
          <input
            type="text"
            id="account"
            name="account"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="bank" className="block text-sm font-medium text-gray-700">Bank Name</label>
          <input
            type="text"
            id="bank"
            name="bank"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Check Status'}
        </button>
      </form>

      {result && (
        <div className={`mt-4 p-4 rounded-md ${
          result.includes('ready') ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'
        }`}>
          {result}
        </div>
      )}
    </div>
  );
}
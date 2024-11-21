import React from 'react';
import { ArrowLeft } from 'lucide-react';

const Tos: React.FC = () => {
  return (
    <div className="min-h-screen  bg-background flex flex-col  text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a href="/" className="flex items-center justify-center">
          <ArrowLeft className="h-6 w-6 mr-2" />
          <span className="text-lg font-semibold">Back to Home</span>
        </a>
      </header>
      <main className="max-w-5xl flex-grow  container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-purple-100">Terms of Service</h1>
        <div className="prose max-w-none text-white">
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using the Second Brain service, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our service.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">2. Description of Service</h2>
          <p className="mb-4">
            Second Brain provides a digital knowledge management platform. We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">3. User Responsibilities</h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">4. Content</h2>
          <p className="mb-4">
            You retain all rights to the content you post on Second Brain. By posting content, you grant us a license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the service.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">5. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">6. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is your responsibility to check these Terms periodically for changes.
          </p>
        </div>
      </main>
     
    </div>
  );
};

export default Tos;
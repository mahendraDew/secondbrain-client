import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import FloatingNav from '@/components/ui/floating-navbar';
import { navItems } from '@/site/nav';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
    
      <FloatingNav navItems={navItems} />
    <div className="min-h-screen bg-transparent flex flex-col justify-center items-center mt-20 z-10">
      <header className="max-w-5xl w-full px-4 md:px-2 h-14 flex items-center ">
        <a href={"/"} className="">
         <span><ArrowLeft  /></span> 
          {/* <span className="text-lg">Home</span> */}
        </a>
      </header>
      <main className="max-w-5xl flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-purple-100">Privacy Policy</h1>
        <div className="prose max-w-none text-white">
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us. This may include your name, email address, and any other information you choose to provide.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience with Second Brain.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">3. Information Sharing and Disclosure</h2>
          <p className="mb-4">
            We do not share your personal information with third parties except as described in this policy. We may share information with your consent, to comply with laws, to protect your rights, or to fulfill business obligations.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">4. Data Security</h2>
          <p className="mb-4">
            We use reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">5. Your Rights</h2>
          <p className="mb-4">
            You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data. To exercise these rights, please contact us.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">6. Changes to This Policy</h2>
          <p className="mb-4">
            We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, provide you with additional notice.
          </p>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
};

export default PrivacyPolicy;
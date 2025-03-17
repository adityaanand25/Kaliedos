import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Star, Users, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { stripePromise } from '../lib/stripe';

function Club() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async (tier: typeof membershipTiers[0]) => {
    try {
      setLoading(tier.name);
      setError(null);

      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/signup', { state: { redirectTo: '/club', selectedTier: tier.name } });
        return;
      }

      // Create Stripe Checkout Session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: tier.priceId,
          userId: user.id,
          tierName: tier.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
      
      if (stripeError) {
        throw stripeError;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Join Kaleidos Club</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Become a member of our exclusive art community and enjoy special benefits, early access to new artworks, and member-only events.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center p-6 bg-gray-50 rounded-lg">
              {benefit.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Membership Tiers */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">Membership Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTiers.map((tier) => (
              <div key={tier.name} className="border rounded-lg p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-4xl font-bold mb-6">${tier.price}<span className="text-lg text-gray-600">/month</span></p>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Star className="h-5 w-5 text-indigo-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleJoin(tier)}
                  disabled={loading === tier.name}
                  className={`w-full py-3 rounded-lg font-semibold ${
                    tier.recommended
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === tier.name ? 'Processing...' : 'Join Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const benefits = [
  {
    icon: <Star className="h-8 w-8 text-indigo-600 mx-auto" />,
    title: "Early Access",
    description: "Be the first to view and purchase new artworks before they're available to the public."
  },
  {
    icon: <Users className="h-8 w-8 text-indigo-600 mx-auto" />,
    title: "Exclusive Events",
    description: "Join member-only exhibitions, workshops, and social gatherings."
  },
  {
    icon: <CreditCard className="h-8 w-8 text-indigo-600 mx-auto" />,
    title: "Special Discounts",
    description: "Enjoy member pricing and special offers on selected artworks."
  },
  {
    icon: <Zap className="h-8 w-8 text-indigo-600 mx-auto" />,
    title: "Artist Connect",
    description: "Direct access to artists through exclusive Q&A sessions and studio visits."
  }
];

const membershipTiers = [
  {
    name: "Basic",
    price: "9.99",
    priceId: "price_basic", // Replace with actual Stripe Price ID
    features: [
      "Early access to new artworks",
      "Member-only newsletter",
      "10% discount on purchases",
      "Access to monthly virtual events"
    ],
    recommended: false
  },
  {
    name: "Premium",
    price: "19.99",
    priceId: "price_premium", // Replace with actual Stripe Price ID
    features: [
      "All Basic features",
      "20% discount on purchases",
      "Quarterly art prints",
      "Priority access to events",
      "Artist studio visits"
    ],
    recommended: true
  },
  {
    name: "Collector",
    price: "49.99",
    priceId: "price_collector", // Replace with actual Stripe Price ID
    features: [
      "All Premium features",
      "30% discount on purchases",
      "Personal art advisor",
      "VIP exhibition previews",
      "Custom framing service"
    ],
    recommended: false
  }
];

export default Club;
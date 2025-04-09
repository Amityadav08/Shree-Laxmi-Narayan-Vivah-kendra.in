import React, { useState } from "react";
// Using react-icons as a potential replacement for lucide-react if available
// import { ChevronRightIcon, HeartIcon, StarIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'; // Example if using heroicons

// --- Data copied from reference code ---
const benefits = [
  {
    title: "AI-Powered Matchmaking",
    description:
      "Get personalized matches based on your preferences and lifestyle.",
    icon: "❤️",
  },
  {
    title: "Video Calls with Matches",
    description:
      "Connect via secure video calls to get to know your match better.",
    icon: "📹",
  },
  {
    title: "Verified Profiles",
    description:
      "Our team ensures all profiles are genuine and verified for authenticity.",
    icon: "✅",
  },
];

const pricingPlans = [
  {
    name: "Basic Plan",
    price: "₹499",
    duration: "/month",
    features: [
      "Basic matchmaking features",
      "Limited profile views",
      "Email support",
      "Basic search filters",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Premium Plan",
    price: "₹4,999",
    duration: "/year",
    features: [
      "AI-powered matchmaking",
      "Unlimited profile views",
      "Video call feature",
      "24/7 priority support",
      "Advanced search filters",
      "Profile highlighting",
    ],
    cta: "Get Premium",
    popular: true,
  },
  {
    name: "Elite Plan",
    price: "₹14,999",
    duration: " lifetime",
    features: [
      "All Premium features",
      "Personal matchmaking consultant",
      "Priority profile boost",
      "Exclusive events access",
      "Background verification",
      "Relationship counseling",
    ],
    cta: "Go Elite",
    popular: false,
  },
];

const reviews = [
  {
    name: "Priya & Rahul",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n2WtXQXVJJBNVmsDH9uG21PB2S9oRo.png",
    testimonial:
      "Shree Laxminarayan Vivah Kendra helped us find our perfect match. The AI matchmaking was spot on!",
    duration: "Together for 2 years",
  },
  {
    name: "Anita & Vikram",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HlXue6uHjb38woHRZzf9PAk5rZL1YR.png",
    testimonial:
      "The video call feature made it so easy to connect before meeting in person.",
    duration: "Together for 1.5 years",
  },
  {
    name: "Neha & Arjun",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n2WtXQXVJJBNVmsDH9uG21PB2S9oRo.png",
    testimonial:
      "We felt safe knowing all profiles were verified. Found our soulmate here!",
    duration: "Together for 3 years",
  },
  // Add more reviews if needed for carousel later
];
// --- End of Data ---

// Simple Icon placeholders if react-icons/lucide-react not available
const ChevronRight = () => (
  <span className="w-5 h-5 mr-2 text-red-600 shrink-0 mt-0.5 inline-block">
    &gt;
  </span>
);
const Star = () => (
  <span className="w-6 h-6 text-amber-500 inline-block">*</span>
);
const Heart = () => (
  <span className="w-6 h-6 text-red-600 inline-block">❤</span>
);
const ChevronLeft = () => (
  <span className="w-6 h-6 text-red-800 inline-block">&lt;</span>
);

export default function PricingPage() {
  // State for reviews carousel (implement later)
  const [currentReview, setCurrentReview] = useState(0);

  const handleReviewChange = (direction) => {
    // Basic logic, full implementation later
    if (direction === "prev") {
      setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    } else {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }
    console.log("Review changed to index:", currentReview); // Placeholder action
  };

  return (
    // Using approximate cream/burgundy/gold colors with standard Tailwind
    <div className="min-h-screen bg-orange-50 font-sans">
      {" "}
      {/* cream-50 approx */}
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-screen flex items-center justify-center overflow-hidden">
        {/* Consider adding an Image component if using Next.js or similar */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-awENOJtyPAhF8u05oTUJiX7Zk9itEl.png"
          alt="Luxurious Indian wedding venue"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay - burgundy-900 approx */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/70 via-red-900/50 to-red-900/70" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          {/* Using text-amber-300 for gold-300, text-orange-100 for cream-100 */}
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-300 mb-6 drop-shadow-[0_0_15px_rgba(253,220,150,0.3)]">
            Start Your Forever with Shree Laxminarayan Vivah Kendra
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 font-light">
            Tailored matchmaking, exclusive features, and the perfect partner
            await.
          </p>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* text-red-900 for burgundy-900 */}
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-red-900 mb-12">
            Why Choose Shree Laxminarayan Vivah Kendra Premium?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              // bg-orange-50 for cream-50, border-amber-200 for gold-200
              <div
                key={index}
                className="bg-orange-50 p-8 rounded-xl shadow-lg border border-amber-200 hover:scale-105 transition-transform duration-200"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                {/* text-red-800 for burgundy-800 */}
                <h3 className="text-xl font-serif font-semibold text-red-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing Plans Section */}
      <section className="py-16 md:py-20 bg-orange-100">
        {" "}
        {/* cream-100 approx */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-red-900 mb-12">
            Choose Your Perfect Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                // border-amber-400 for gold-400 (popular), border-orange-200 for cream-200
                className={`relative bg-white rounded-2xl shadow-xl border-2 ${
                  plan.popular ? "border-amber-400" : "border-orange-200"
                } overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-200`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <Star /> {/* Placeholder Star icon */}
                  </div>
                )}
                <div className="p-8">
                  {/* text-red-800 for burgundy-800, text-red-900 for burgundy-900 */}
                  <h3 className="text-2xl font-serif font-bold text-red-800 mb-4">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-red-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">{plan.duration}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <ChevronRight /> {/* Placeholder icon */}
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Simulating Button component styles */}
                  <button
                    // bg-red-600/hover:bg-red-700 for burgundy-600/700
                    // bg-orange-100/hover:bg-orange-200 for cream-100/200
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
                      plan.popular
                        ? "bg-red-700 hover:bg-red-800 text-white"
                        : "bg-orange-100 hover:bg-orange-200 text-red-900"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Customer Reviews Section */}
      <section className="py-16 md:py-20 bg-red-50 overflow-hidden">
        {" "}
        {/* burgundy-50 approx */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-red-900 mb-12">
            Love Stories from Our Members
          </h2>
          {/* Static Review - Carousel controls/animation added later */}
          <div className="relative max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-200">
              {" "}
              {/* cream-200 approx */}
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 mb-4">
                  <img
                    src={reviews[currentReview].image || "/placeholder.svg"} // Use dynamic index later
                    alt={reviews[currentReview].name}
                    className="rounded-full object-cover w-full h-full border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1">
                    <Heart /> {/* Placeholder icon */}
                  </div>
                </div>
                {/* text-red-800 for burgundy-800 */}
                <h3 className="text-xl font-serif font-semibold text-red-800 mb-2">
                  {reviews[currentReview].name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {reviews[currentReview].duration}
                </p>
                <p className="text-gray-600 text-center italic">
                  "{reviews[currentReview].testimonial}"
                </p>
              </div>
            </div>

            {/* Placeholder Carousel Controls - functional later */}
            <button
              onClick={() => handleReviewChange("prev")}
              className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-orange-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 hover:scale-110"
              aria-label="Previous review"
            >
              <ChevronLeft /> {/* Placeholder icon */}
            </button>
            <button
              onClick={() => handleReviewChange("next")}
              className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-orange-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 hover:scale-110"
              aria-label="Next review"
            >
              {/* Using text ChevronRight for now */}
              <span className="w-6 h-6 text-red-800 inline-block">&gt;</span>
            </button>

            {/* Placeholder Dots - functional later */}
            <div className="flex justify-center mt-6 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  // bg-red-600 for burgundy-600, bg-red-200 for burgundy-200
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                    currentReview === index ? "bg-red-600" : "bg-red-200"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Enquire Section */}
      <section className="py-16 md:py-20 bg-orange-50">
        {" "}
        {/* cream-50 approx */}
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-red-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Have questions about our premium features? We'd love to help you
              find your perfect match.
            </p>
            {/* Basic form, needs state/submit handling later */}
            <form className="space-y-6">
              {/* Simulating Input component styles */}
              <input
                type="text"
                placeholder="Your Name"
                // border-orange-200 for cream-200, focus:border-red-500 for burgundy-500
                className="w-full px-4 py-3 rounded-lg bg-white border border-orange-200 focus:border-red-500 focus:ring focus:ring-red-500/20 outline-none transition-colors duration-200"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-white border border-orange-200 focus:border-red-500 focus:ring focus:ring-red-500/20 outline-none transition-colors duration-200"
              />
              {/* Simulating Textarea component styles */}
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-white border border-orange-200 focus:border-red-500 focus:ring focus:ring-red-500/20 outline-none transition-colors duration-200 min-h-[150px]"
              />
              {/* Simulating Button component styles */}
              <button
                type="submit"
                // bg-red-600/hover:bg-red-700 for burgundy-600/700
                className="w-full py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* Add Footer component/section here later if needed */}
    </div>
  );
}

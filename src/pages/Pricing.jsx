import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, ChevronLeft, Heart } from 'lucide-react';

// --- Data (similar to reference) ---
const benefits = [
  {
    title: "AI-Powered Matchmaking",
    description: "Get personalized matches based on your preferences and lifestyle.",
    icon: "❤️",
  },
  {
    title: "Video Calls with Matches",
    description: "Connect via secure video calls to get to know your match better.",
    icon: "📹",
  },
  {
    title: "Verified Profiles",
    description: "Our team ensures all profiles are genuine and verified for authenticity.",
    icon: "✅",
  },
];

const pricingPlans = [
  {
    name: "Basic Plan",
    price: "₹499",
    duration: "/month",
    features: ["Basic matchmaking features", "Limited profile views", "Email support", "Basic search filters"],
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
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n2WtXQXVJJBNVmsDH9uG21PB2S9oRo.png", // Using reference image
    testimonial: "Ujwal Bandhan helped us find our perfect match. The AI matchmaking was spot on!",
    duration: "Together for 2 years",
  },
  {
    name: "Anita & Vikram",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HlXue6uHjb38woHRZzf9PAk5rZL1YR.png", // Using reference image
    testimonial: "The video call feature made it so easy to connect before meeting in person.",
    duration: "Together for 1.5 years",
  },
  {
    name: "Neha & Arjun",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n2WtXQXVJJBNVmsDH9uG21PB2S9oRo.png", // Using reference image
    testimonial: "We felt safe knowing all profiles were verified. Found our soulmate here!",
    duration: "Together for 3 years",
  },
  // Add more reviews if needed, ensure images are accessible or use placeholders
];

// --- Component ---
const Pricing = () => {
  const { scrollYProgress } = useScroll();
  // Adjust the range for opacity/scale effect if needed
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [slideDirection, setSlideDirection] = useState("left"); // 'left' for next, 'right' for prev

  const handleReviewChange = useCallback((direction) => {
    setIsAutoSliding(false);
    setSlideDirection(direction === "prev" ? "right" : "left");
    setCurrentReview((prev) => {
      if (direction === "prev") {
        return prev === 0 ? reviews.length - 1 : prev - 1;
      } else {
        return (prev + 1) % reviews.length;
      }
    });
    // Restart auto-slide after manual interaction
    const timer = setTimeout(() => setIsAutoSliding(true), 5000);
    return () => clearTimeout(timer); // Cleanup timer on component unmount or if called again
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoSliding) {
      interval = setInterval(() => {
        setSlideDirection("left"); // Default auto-slide direction
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      }, 5000); // Auto-slide every 5 seconds
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount or when auto-sliding stops
  }, [isAutoSliding]);

  // Placeholder image handler
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop if placeholder fails
    e.target.src = '/placeholder-user.jpg'; // Path to your placeholder image in public folder
  };

  return (
    <div className="min-h-screen bg-cream-50">

      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Use a relevant background image if available */}
         <img
           src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-awENOJtyPAhF8u05oTUJiX7Zk9itEl.png" // Reference image
           alt="Luxurious Indian wedding venue"
           className="absolute inset-0 w-full h-full object-cover"
           onError={handleImageError} // Add error handling for background
         />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy-900/60 via-burgundy-900/40 to-burgundy-900/60" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-serif font-bold text-gold-300 mb-6 drop-shadow-[0_0_15px_rgba(253,220,150,0.3)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Start Your Forever with Ujwal Bandhan
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-cream-100 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Tailored matchmaking, exclusive features, and the perfect partner await.
          </motion.p>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold text-center text-burgundy-900 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} // Trigger when 30% is visible
            transition={{ duration: 0.6 }}
          >
            Why Choose Ujwal Bandhan Premium?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-cream-50 p-6 sm:p-8 rounded-xl shadow-lg border border-gold-200"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }} // Slightly faster stagger
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-serif font-semibold text-burgundy-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-16 sm:py-20 bg-cream-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
             className="text-3xl md:text-4xl font-serif font-bold text-center text-burgundy-900 mb-12"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.3 }}
             transition={{ duration: 0.6 }}
          >
            Choose Your Perfect Plan
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl border-2 ${
                  plan.popular ? "border-gold-400" : "border-cream-200"
                } overflow-hidden flex flex-col`} // Added flex flex-col
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)", // Adjusted shadow
                  transition: { duration: 0.2 },
                }}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <Star className="w-6 h-6 text-gold-400 fill-gold-400" />
                  </div>
                )}
                <div className="p-6 sm:p-8 flex-grow"> {/* Added flex-grow */}
                  <h3 className="text-2xl font-serif font-bold text-burgundy-800 mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-burgundy-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.duration}</span>
                  </div>
                  <ul className="space-y-3 mb-8"> {/* Adjusted spacing */}
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 text-burgundy-500 shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                 {/* Button moved outside flex-grow div to stick to bottom */}
                <div className="p-6 sm:p-8 pt-0">
                    <button
                        className={`w-full py-2.5 px-4 rounded-md font-semibold ${ // Adjusted padding
                        plan.popular
                            ? "bg-burgundy-600 hover:bg-burgundy-700 text-white"
                            : "bg-cream-100 hover:bg-cream-200 text-burgundy-900"
                        } transition-all duration-200 transform hover:scale-105`}
                    >
                        {plan.cta}
                    </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      {/* Using the specific bg color from feedback: bg-review-bg */}
      <section className="py-16 sm:py-20 bg-review-bg overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold text-center text-burgundy-900 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            Love Stories from Our Members
          </motion.h2>
          <div className="relative max-w-xl mx-auto">
            <AnimatePresence custom={slideDirection} mode="wait">
              <motion.div
                key={currentReview} // Key change triggers animation
                custom={slideDirection}
                variants={{
                  enter: (direction) => ({
                    x: direction === "right" ? '100%' : '-100%', // Use percentage for better responsiveness
                    opacity: 0,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                  },
                  exit: (direction) => ({
                    x: direction === "right" ? '-100%' : '100%',
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }} // Smoother transition
                className="bg-white rounded-2xl shadow-lg p-6 border border-cream-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 mb-4">
                    <img
                      src={reviews[currentReview].image}
                      alt={reviews[currentReview].name}
                      className="rounded-full object-cover w-full h-full border-2 border-cream-300" // Added border
                      onError={handleImageError} // Use error handler
                    />
                    <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow">
                       {/* Using the specific heart color from feedback: text-review-heart fill-review-heart */}
                      <Heart className="w-5 h-5 text-review-heart fill-review-heart" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-burgundy-800 mb-1">
                    {reviews[currentReview].name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{reviews[currentReview].duration}</p>
                  <p className="text-gray-600 italic">"{reviews[currentReview].testimonial}"</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={() => handleReviewChange("prev")}
              className="absolute top-1/2 -left-4 sm:-left-10 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-cream-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burgundy-500 hover:scale-110 z-10"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-900" />
            </button>
            <button
              onClick={() => handleReviewChange("next")}
              className="absolute top-1/2 -right-4 sm:-right-10 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-cream-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burgundy-500 hover:scale-110 z-10"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-900" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                     setSlideDirection(index > currentReview ? 'left' : 'right');
                     setCurrentReview(index);
                     setIsAutoSliding(false); // Stop auto slide on dot click
                     // Let the main useEffect handle restarting the timer after interaction timeout
                  }}
                  // Using the specific heart color for active dot: bg-review-heart
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    currentReview === index ? "bg-review-heart" : "bg-burgundy-200 hover:bg-burgundy-300"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enquire Section */}
      <section className="py-16 sm:py-20 bg-cream-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-burgundy-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-center text-gray-600 mb-10">
              Have questions about our premium features? We'd love to help you find your perfect match.
            </p>
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2.5 bg-white border border-cream-200 rounded-md focus:border-burgundy-500 focus:ring-1 focus:ring-burgundy-500/50 transition duration-200" // Added focus ring
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2.5 bg-white border border-cream-200 rounded-md focus:border-burgundy-500 focus:ring-1 focus:ring-burgundy-500/50 transition duration-200"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-2.5 bg-white border border-cream-200 rounded-md focus:border-burgundy-500 focus:ring-1 focus:ring-burgundy-500/50 transition duration-200 min-h-[120px]"
              />
              <button
                type="submit"
                className="w-full py-3 px-4 bg-burgundy-600 hover:bg-burgundy-700 text-white font-semibold rounded-md transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg" // Added hover effect
              >
                Send Enquiry
              </button>
            </form>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Pricing;

import React, { useState, useEffect } from "react";

// Data from CustomerReviews component
const reviewsData = [
  [
    {
      names: "Ravi & Meera",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n2WtXQXVJJBNVmsDH9uG21PB2S9oRo.png",
      duration: "Together for 3 years",
      quote: "Ujwal Bandhan brought us together when we least expected it.",
    },
    {
      names: "Ankit & Aditi",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HlXue6uHjb38woHRZzf9PAk5rZL1YR.png",
      duration: "Together for 2 years",
      quote: "The AI matchmaking was so accurate! We couldn't be happier.",
    },
    {
      names: "Arjun & Neha",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n2WtXQXVJJBNVmsDH9uG21PB2S9oRo.png",
      duration: "Together for 1 year",
      quote: "The video profile feature helped us connect instantly.",
    },
    {
      names: "Aman & Priya",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HlXue6uHjb38woHRZzf9PAk5rZL1YR.png",
      duration: "Together for 4 years",
      quote: "Our journey started here, and now we're happily married!",
    },
  ],
  [
    {
      names: "Rahul & Sneha",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n2WtXQXVJJBNVmsDH9uG21PB2S9oRo.png",
      duration: "Together for 5 years",
      quote: "The verified profiles gave us peace of mind while searching.",
    },
    {
      names: "Kabir & Simran",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HlXue6uHjb38woHRZzf9PAk5rZL1YR.png",
      duration: "Together for 2.5 years",
      quote:
        "The privacy controls allowed us to be ourselves while building trust.",
    },
    {
      names: "Karthik & Divya",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n2WtXQXVJJBNVmsDH9uG21PB2S9oRo.png",
      duration: "Together for 3 years",
      quote: "Ujwal Bandhan made our long-distance love story possible.",
    },
    {
      names: "Varun & Shruti",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HlXue6uHjb38woHRZzf9PAk5rZL1YR.png",
      duration: "Together for 2 years",
      quote:
        "The platform's simplicity and advanced search made finding each other so easy.",
    },
  ],
  [
    {
      names: "Rohan & Ankita",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n2WtXQXVJJBNVmsDH9uG21PB2S9oRo.png",
      duration: "Together for 1.5 years",
      quote:
        "It was love at first sight, thanks to the unique matchmaking features.",
    },
    {
      names: "Vikram & Pooja",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HlXue6uHjb38woHRZzf9PAk5rZL1YR.png",
      duration: "Together for 4 years",
      quote:
        "We couldn't have asked for a better platform to meet our life partner!",
    },
    {
      names: "Ravi & Meera",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n2WtXQXVJJBNVmsDH9uG21PB2S9oRo.png",
      duration: "Together for 3 years",
      quote: "Ujwal Bandhan brought us together when we least expected it.",
    },
    {
      names: "Ankit & Aditi",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HlXue6uHjb38woHRZzf9PAk5rZL1YR.png",
      duration: "Together for 2 years",
      quote: "The AI matchmaking was so accurate! We couldn't be happier.",
    },
  ],
];

// Data from AboutTimeline component
const timelineEventsData = [
  {
    year: "2020",
    title: "Foundation",
    description:
      "Ujwal Bandhan was established with a vision to revolutionize matchmaking.",
  },
  {
    year: "2021",
    title: "Growth",
    description: "Expanded our services across major cities in India.",
  },
  {
    year: "2022",
    title: "Innovation",
    description: "Introduced AI-powered matchmaking and video profiles.",
  },
  {
    year: "2023",
    title: "Global Reach",
    description: "Extended our services to NRI communities worldwide.",
  },
];

// Data from AboutTeam component
const teamData = [
  {
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LBp9DnGp2C0A92HworIRXNW3kpsqWS.png",
    description:
      "Rajesh Kumar is the visionary behind Ujwal Bandhan. With over 15 years of experience, he has redefined matchmaking through technology and innovation.",
    specialization: "Driving innovation and operational excellence",
  },
  {
    name: "Priya Sharma",
    role: "Head of Matchmaking",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XZko9Xzoe5c7v3lofOuYlZqF4qjzye.png",
    description:
      "Priya Sharma ensures personalized matchmaking services. Her expertise in understanding client needs has led to countless success stories.",
    specialization:
      "Expert in creating human connections with a personal touch",
  },
  {
    name: "Amit Patel",
    role: "Technical Director",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xUUIvUgxyN4jsARMs12ocGbowBNFPg.png",
    description:
      "Amit Patel leads the technical development of Ujwal Bandhan. His expertise in AI-powered solutions ensures a seamless client experience.",
    specialization: "Building secure and innovative matchmaking platforms",
  },
];

const AboutPage = () => {
  // State for Customer Reviews Carousel
  const [currentBatch, setCurrentBatch] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBatch((prev) => (prev + 1) % reviewsData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextBatch = () => {
    setCurrentBatch((prev) => (prev + 1) % reviewsData.length);
  };

  const prevBatch = () => {
    setCurrentBatch(
      (prev) => (prev - 1 + reviewsData.length) % reviewsData.length
    );
  };

  // Define Tailwind color classes used in the reference project if not already defined globally
  // Assuming these colors (burgundy-*, gold-*, cream-*) are defined in index.css or similar
  // e.g., bg-burgundy-900, text-gold-300, bg-cream-50 etc.

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="h-screen relative">
        <div className="absolute inset-0">
          <img
            src="/bg.webp"
            alt="Traditional Indian wedding decoration with mandap and flowers"
            className="object-cover w-full h-full"
          />
          {/* Using Tailwind for gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy-900/60 via-burgundy-900/40 to-burgundy-900/80" />
        </div>
      </div>

      {/* About Content Section - ENHANCED */}
      <section className="py-20 md:py-28 bg-orange-50">
        {" "}
        {/* cream-50 approx, increased padding */}
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            {" "}
            {/* Increased bottom margin */}
            {/* text-red-900 approx */}
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-red-900 mb-6">
              Our Vision
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              At Ujwal Bandhan, we believe in creating meaningful connections
              that last a lifetime. Our platform combines traditional values
              with modern technology to help you find your perfect life partner.
            </p>
          </div>

          {/* Feature Cards Grid - ENHANCED */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {" "}
            {/* Increased gap, max-width */}
            {[
              {
                title: "Traditional Values",
                description:
                  "We understand and respect the importance of cultural traditions in marriage.",
                icon: "🕉️", // Using emoji
              },
              {
                title: "Modern Approach",
                description:
                  "Leveraging technology to make your partner search smooth and efficient.",
                icon: "💻", // Using emoji
              },
              {
                title: "Trusted Platform",
                description:
                  "Building trust through verified profiles and secure communications.",
                icon: "🤝", // Using emoji
              },
            ].map((feature, index) => (
              <div
                key={index}
                // Enhanced card styles: bg-white, more padding, subtle border, better hover
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Enhanced icon display */}
                <div className="text-5xl mb-5 inline-block p-3 bg-orange-100 rounded-full">
                  {" "}
                  {/* cream-100 approx bg */}
                  {feature.icon}
                </div>
                {/* text-red-900 approx */}
                <h3 className="text-xl font-semibold font-serif text-red-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 bg-cream-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-burgundy-900 mb-4">
            What Our Happy Couples Say
          </h2>
          <div className="relative w-fit mx-auto mb-12">
            <p className="text-xl text-gray-600 text-center">
              Stories of love, trust, and happily ever afters
            </p>
            {/* Simple underline instead of animated one */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-500"></div>
          </div>

          <div className="relative">
            {/* Carousel Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {reviewsData[currentBatch].map((review, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                >
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img
                      src={review.image}
                      alt={review.names}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-burgundy-900 text-center mb-2">
                    {review.names}
                  </h3>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    {review.duration}
                  </p>
                  <p className="text-gray-700 italic text-center">
                    "{review.quote}"
                  </p>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevBatch}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full bg-white p-2 rounded-full shadow-lg hover:bg-cream-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-burgundy-500"
              aria-label="Previous reviews"
            >
              <span className="w-6 h-6 text-burgundy-900">{"<"}</span>{" "}
              {/* Simple Arrow */}
            </button>
            <button
              onClick={nextBatch}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full bg-white p-2 rounded-full shadow-lg hover:bg-cream-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-burgundy-500"
              aria-label="Next reviews"
            >
              <span className="w-6 h-6 text-burgundy-900">{">"}</span>{" "}
              {/* Simple Arrow */}
            </button>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {reviewsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBatch(index)}
                className={`w-3 h-3 rounded-full ${
                  currentBatch === index ? "bg-burgundy-600" : "bg-burgundy-200"
                } transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-burgundy-500`}
                aria-label={`Go to review batch ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section - Updated with inspiration styles and animation */}
      <section className="py-20 bg-gray-50">
        {" "}
        {/* Updated background */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Our Journey
          </h2>{" "}
          {/* Updated text color */}
          <div className="relative">
            {/* Timeline line */}
            {/* Adjusted for responsiveness: hidden on small screens, shown md and up */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200 hidden md:block" />{" "}
            {/* Updated color */}
            {/* Timeline events */}
            <div className="space-y-12">
              {timelineEventsData.map((event, index) => (
                // Applying motion directly to the mapped element
                <div
                  key={index}
                  className={`md:flex md:items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } w-full relative`} // Added relative positioning for the dot
                >
                  {/* Content Block */}
                  <div className="md:w-1/2 md:px-8 mb-8 md:mb-0">
                    {" "}
                    {/* Added padding */}
                    <div
                      className={`${
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      } text-center md:text-inherit`}
                    >
                      {" "}
                      {/* Center text on small screens */}
                      <span className="text-2xl font-bold text-[#E05A79]">
                        {event.year}
                      </span>{" "}
                      {/* Updated color */}
                      <h3 className="text-xl font-semibold text-gray-800 mt-2">
                        {event.title}
                      </h3>{" "}
                      {/* Updated color */}
                      <p className="text-gray-600 mt-2">{event.description}</p>
                    </div>
                  </div>
                  {/* Dot (visible on medium screens and up) */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#E05A79] rounded-full hidden md:block" />{" "}
                  {/* Updated color */}
                  {/* Spacer for alignment (visible on medium screens and up) */}
                  <div className="md:w-1/2 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-burgundy-900 mb-16">
            Meet Our Team
          </h2>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {teamData.map((member, index) => (
              <div key={index} className="text-center relative">
                {/* Image Container */}
                <div className="relative mx-auto mb-6">
                  <div className="relative w-48 h-48 mx-auto overflow-hidden rounded-full shadow-lg">
                    <img
                      src={member.image || "/placeholder.svg"} // Use placeholder if image missing
                      alt={member.name}
                      className="object-cover object-top w-full h-full"
                    />
                  </div>
                </div>

                {/* Basic Info */}
                <h3 className="text-2xl font-semibold text-burgundy-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 font-light mb-4">{member.role}</p>
                {/* Simplified description display */}
                <p className="text-gray-600 text-sm leading-relaxed px-4">
                  {member.description}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-burgundy-800 mt-2">
                  <span>🏆</span> {/* Placeholder for Award icon */}
                  <span className="italic">{member.specialization}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-burgundy-900 mb-8">
              Get in Touch
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-white p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-white p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="bg-white w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
              />
              <textarea
                placeholder="Your Message"
                className="bg-white w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 min-h-[150px]"
              />
              <button
                type="submit"
                className="w-full bg-burgundy-600 hover:bg-burgundy-700 text-white font-bold py-3 px-6 rounded-md transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

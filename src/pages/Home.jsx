import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-100"> {/* Overall page background */}
      {/* Hero Section with Background Image */}
      <section
        className="relative min-h-[70vh] md:min-h-[80vh] bg-cover" /* Removed bg-center */
        style={{ 
          backgroundImage: 'url(/hero.webp)', 
          backgroundPosition: 'center 30%' /* Adjusted vertical position */ 
        }} // Using the specified background image
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-0"></div>

        {/* Optional Heading - Can be placed here if needed */}
        {/* <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Find Your Soulmate
          </h1>
        </div> */}
      </section>

      {/* Overlapping Form Container & Content Below */}
      <section className="relative pb-16 md:pb-24 -mt-24 md:-mt-32 z-10"> {/* Negative margin pulls this section up */}
        <div className="container mx-auto px-4">
          {/* Search Form Card - Updated Layout */}
          <div className="bg-[#F9EBE7] rounded-xl shadow-2xl p-6 md:p-10 max-w-xl mx-auto"> {/* Reverted background color */}
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 text-center">
              Search
            </h2>
            <form>
              {/* Updated grid to handle 3 rows implicitly */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-6">
                {/* Row 1 */}
                {/* Looking for (Gender) */}
                <select className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700 w-full bg-white">
                  <option value="" disabled selected>I'm looking for</option>
                  <option value="Woman">Woman</option>
                  <option value="Man">Man</option>
                </select>

                {/* Age */}
                <select className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700 w-full bg-white">
                  <option value="" disabled selected>Aged</option>
                  {/* Generate age options - simplified */}
                  {Array.from({ length: 53 }, (_, i) => i + 18).map(age => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>

                {/* Row 2 */}
                {/* Religion */}
                <select className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700 w-full bg-white">
                  <option value="" disabled selected>Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Jain">Jain</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Other">Other</option>
                </select>

                {/* Mother Tongue */}
                <select className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700 w-full bg-white">
                  <option value="" disabled selected>Mother Tongue</option>
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Odia">Odia</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Punjabi">Punjabi</option>
                  {/* Add more languages as needed */}
                </select>

                {/* Row 3 */}
                {/* Specific Religion/Caste/Community (Placeholder based on image) */}
                 <select className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700 w-full bg-white">
                   <option value="" disabled selected>Hindu</option> {/* Updated placeholder */}
                   {/* Add more specific options as needed */}
                 </select>

                 {/* Specific Language/Community (Placeholder based on image) */}
                 <select className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700 w-full bg-white">
                   <option value="" disabled selected>Tamil</option> {/* Updated placeholder */}
                   {/* Add more specific options as needed */}
                 </select>

              </div> {/* End of grid */}

              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="w-full bg-[#E05A9F] hover:bg-[#C74B6A] text-white font-bold py-3 px-8 rounded-md transition duration-300 shadow-md hover:shadow-lg" /* Keeping button style */
                >
                  Search
                </button>
              </div>
            </form>
          </div> {/* End of Search Form Card */}

          {/* Why Choose Us Section - Adapted from reference */}
          <div className="mt-16 md:mt-24"> {/* Removed text-center from the wrapper */}
             <h2 className="text-3xl font-bold text-center mb-12 text-gray-800"> {/* Added text-gray-800 */}
               Why Choose Us? {/* Changed title from reference */}
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 {
                   title: "Verified Profiles",
                   description: "Every profile is thoroughly verified to ensure a safe and genuine experience.",
                   icon: "✅",
                   bgColor: "bg-pink-100", // Using colors from reference
                 },
                 {
                   title: "AI Matchmaking",
                   description: "Our advanced AI algorithm finds your most compatible matches.",
                   icon: "🤖",
                   bgColor: "bg-purple-100", // Using colors from reference
                 },
                 {
                   title: "Privacy First",
                   description: "Your privacy is our top priority. Control what you share and with whom.",
                   icon: "🔒",
                   bgColor: "bg-blue-100", // Using colors from reference
                 },
               ].map((feature, index) => (
                 <div
                   key={index}
                   className={`${feature.bgColor} p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow`}
                 >
                   <div className="text-4xl mb-4">{feature.icon}</div>
                   <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3> {/* Adjusted text color */}
                   <p className="text-gray-600">{feature.description}</p>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </section>

      {/* Stats Section - Adapted from reference */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Success in Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-pink-600">50,000+</p>
              <p className="text-xl text-gray-600">Verified Profiles</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">20,000+</p>
              <p className="text-xl text-gray-600">Success Stories</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">100,000+</p>
              <p className="text-xl text-gray-600">Happy Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section - Adapted from reference */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Happy Customers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah & John",
                years: 2,
                story: "We found our perfect match on Ujwal Bandhan. The AI matchmaking was spot on!",
                image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Bwn0drwDYqKW4lh2GqZpXOp3Mr6xK8.png", // Updated image URL
              },
              {
                name: "Priya & Rahul",
                years: 1,
                story: "The privacy controls gave us the confidence to be ourselves. We're getting married next month!",
                image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M4cEzdZjjqzkgwTqZDDz3QU8QkOqRC.png", // Updated image URL
              },
              {
                name: "Michael & Emily",
                years: 3,
                story: "The video profiles feature helped us get to know each other before our first date. It was love at first sight!",
                image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LMR9bPNTkCU4DL63OmG5GMMaqbbZxA.png", // Updated image URL
              },
            ].map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center mb-4">
                  <div className="relative w-24 h-24 mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-lg">{review.name}</h4>
                    <p className="text-gray-600 text-sm">
                      Together for {review.years} year{review.years > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <svg
                    className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 h-8 w-8 text-gray-200"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-600 mt-4 italic relative z-10 pl-6">{review.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Adapted from reference */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {["Create Profile", "Discover Matches", "Connect", "Find Love"].map((step, index) => (
              <div key={step} className="text-center">
                <div className="bg-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-gray-600">{getStepDescription(step)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Adapted from reference */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Soulmate?</h2>
          <p className="text-xl mb-8">Join thousands of happy couples who found love on Ujwal Bandhan.</p>
          {/* Using standard button and replicating styles */}
          <button
             className="bg-white text-pink-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
             onClick={() => window.location.href='/signup'} // Simple navigation
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

// Helper function integrated into the component file
function getStepDescription(step) {
  switch (step) {
    case "Create Profile":
      return "Sign up and create your detailed profile.";
    case "Discover Matches":
      return "Browse through AI-recommended matches.";
    case "Connect":
      return "Start conversations with potential partners.";
    case "Find Love":
      return "Build meaningful relationships and find your soulmate.";
    default:
      return "";
  }
}

export default Home;

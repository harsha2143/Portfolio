import { useState } from 'react';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('experience');

  const positions = [
    {
      title: "Technical Lead",
      company: "SRKR Coding Club",
      date: "Feb 2025",
      description: [
        "Created clear and challenging problems for the IconCoderz-2K25 contest and organized the event on HackerRank, ensuring smooth execution and engaging over 200 participants.",
        "Led the technical team by assigning tasks, guiding members, and encouraging teamwork to successfully complete the contest."
      ]

    },
    {
      title: "Executive Body Representative",
      company: "SRKR Coding Club",
      date: "Present",
      description: [
        "Represented the coding club in the executive body, coordinating between members and leadership to support club activities and initiatives.",
        "Organized events and workshops to promote coding skills and foster active participation, while collaborating with team members to plan and execute technical sessions that encouraged learning and growth within the community."

      ]

    }
  ];

  const experiences = [
    {
      title: "Full Stack Development Intern",
      company: "IIDT BlackBucks",
      date: "May 2025 - Present",
      description: [
        "Updated the website design using Next.js and Tailwind CSS to make it faster, responsive, and easier to use on all devices.",
        "Built APIs with Node.js and Express, connected the React frontend with the backend, and managed data using MongoDB for smooth app performance."
      ]


    },
    {
      title: "AIMLDS Intern",
      company: "IIDT BlackBucks",
      date: "May 2024 - July 2024",
      description: [
        "Built an IPL Match Winner Prediction Model using Python and Scikit-learn, including data preprocessing and feature engineering.",
        "Implemented and optimized machine learning algorithms like Random Forest to achieve accurate and reliable predictions."
      ]

    }
  ];

  const currentData = activeTab === 'experience' ? experiences : positions;

  return (
    <div className="relative bg-black text-white py-16 px-4 min-h-screen mb-24 -mx-5" id="experience">
      {/* Background Elements - Fixed positioning */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* <div className="absolute top-1/4 left-4/4 w-64 h-64 bg-blue-800 rounded-full mix-blend-normal filter blur-3xl opacity-0 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-gray-500 rounded-full mix-blend-normal filter blur-3xl opacity-5 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom right w-64 h-64 bg-purple-500 rounded-full mix-blend-normal filter blur-3xl opacity-0 animate-pulse" style={{animationDelay: '4s'}}></div> */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Experience <span className="text-blue-500">& Position Of Responsibilities</span>
          </h1>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg mx-5">
            My professional journey and leadership roles.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-900 rounded-lg p-1 w-full max-w-md mx-10">
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex-1 py-3 px-4 sm:px-6 rounded-md font-medium transition-all duration-300 text-sm sm:text-base ${activeTab === 'experience'
                ? 'bg-gray-950 text-white shadow-lg'
                : 'text-gray-200 hover:text-white'
                }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab('positions')}
              className={`flex-1 py-3 px-4 sm:px-6 rounded-md font-medium transition-all duration-300 text-sm sm:text-base ${activeTab === 'positions'
                ? 'bg-gray-950 text-white shadow-lg'
                : 'text-gray-200 hover:text-white'
                }`}
            >
              Positions
            </button>
          </div>
        </div>

        {/* Content Cards */}
        <div className="space-y-5">
          {currentData.map((item, index) => (
            <div key={index} className="group">
              {/* Card with Gradient Border */}
              <div className="relative bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 p-[1px] rounded-xl hover:shadow-2xl transition-all duration-300 mx-6">
                <div className="bg-gray-950 rounded-xl p-6 sm:p-6 h-full">
                  {/* Card Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 gap-4 ">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-lxl font-bold text-white mb-1 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-base sm:text-md">
                        {item.company}
                      </p>
                    </div>
                    <div className="lg:flex-shrink-0">
                      <span className="inline-block px-3 py-2 bg-blue-700 text-gray-100 rounded-lg text-sm font-medium">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  {/* Description Points */}
                  <div className="space-y-2">
                    {item.description.map((desc, descIndex) => (
                      <div key={descIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
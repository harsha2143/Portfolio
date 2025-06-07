import React from 'react';
import { Award, Star, Brain, Rocket, ExternalLink, Code, Trophy } from 'lucide-react';

const codingProfiles = {
  LeetCode: "https://leetcode.com/u/Harshavardhan_Saripalli/",
  HackerRank: "https://www.hackerrank.com/profile/harshavardhans23",
  CodeChef: "https://www.codechef.com/users/harsha2143",
  GitHub: "https://github.com/harsha2143" // add your GitHub URL here
};


const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "Smart India Hackathon 2024",
      description: "Shortlisted for the main edition, among 64 teams selected nationwide from internal college-level rounds, representing SRKR Engineering College.",
      badge: "Shortlisted",
      icon: <Rocket className="w-6 h-6" />,
      year: "2024",
      stats: { teams: "64", scope: "Nationwide" }
    },
    {
      id: 2,
      title: "Smart India Hackathon 2023",
      description: "Shortlisted for the main edition, among 55 teams nationally, showcasing innovation and teamwork.",
      badge: "Shortlisted",
      icon: <Rocket className="w-6 h-6" />,
      year: "2023",
      stats: { teams: "55", scope: "National" }
    },
    {
      id: 3,
      title: "Data Structures & Algorithms Mastery",
      description: "Solved 150+ Data Structures & Algorithms problems across LeetCode (peak rating: 1411) and GeeksforGeeks, building a solid foundation in problem-solving and DSA.",
      badge: "150+ Problems",
      icon: <Code className="w-6 h-6" />,
      platforms: [
        { name: "LeetCode", rating: "1411", link: "https://leetcode.com/u/Harshavardhan_Saripalli/" },
        { name: "GeeksforGeeks", link: "https://www.geeksforgeeks.org/user/harshavardhan04fz/" }
      ]
    },
    {
      id: 4,
      title: "HackerRank Golden Star - C++",
      description: "Earned a Golden Star badge in C++ on HackerRank, reflecting proficiency in language fundamentals and application.",
      badge: "Golden Star",
      icon: <Star className="w-6 h-6" />,
      platforms: [
        { name: "HackerRank", badge: "⭐ Golden Star", link: "https://www.hackerrank.com/profile/harshavardhans23" }
      ]
    },
    {
      id: 5,
      title: "CodeChef C++ Skill Test Excellence",
      description: "Scored 90% in the C++ Skill Test on CodeChef, validating strong understanding of syntax, STL, and core concepts.",
      badge: "90% Score",
      icon: <Brain className="w-6 h-6" />,
      platforms: [
        { name: "CodeChef", score: "90%", link: "https://www.codechef.com/users/harsha2143" }
      ]
    },
  ];

  const platformStats = [
    { platform: "LeetCode", value: "1411", label: "Peak Rating", color: "text-orange-500" },
    { platform: "SIH", value: "2x", label: "Shortlisted", color: "text-purple-500" },
    { platform: "Problems", value: "150+", label: "DSA Solved", color: "text-blue-500" },
    { platform: "C++ Test", value: "90%", label: "CodeChef Score", color: "text-green-500" },
  ];

  return (
    <div className="bg-black min-h-screen py-20 px-4 -mx-5" id="achievements">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-center mb-12" id="skills">
            <h1 className="text-4xl font-bold mb-4">
              My <span className="text-blue-500" >Achievements</span>
            </h1>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-2"></div>
            <p className="text-gray-300 max-w-2xl mx-5">
              Recognition and milestones earned through consistent learning and problem-solving.
            </p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="space-y-6 mb-16 mx-5">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="relative bg-gray-950/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-3 transition-all duration-300 hover:transform hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 group"
            >
              {/* Gradient Border Top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r  from-[rgb(16,101,238)] to-[rgb(65,107,173)] rounded-t-2xl transition-all duration-300 group-hover:h-1.5"></div>

              {/* Badge */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <span className="bg-[rgb(0,98,255)] text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  {achievement.badge}
                </span>
              </div>

              {/* Content */}
              <div className="flex items-start gap-4 mt-8 md:mt-2 md:pr-24">
                {/* <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors">
                  {achievement.icon}
                </div> */}

                <div className="flex-1">
                  <h3 className="text-lg md:text-lg font-semibold text-white mb-3 leading-tight">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-base md:text-sm mb-4">
                    {achievement.description}
                  </p>

                  {/* Platform Links */}
                  {achievement.platforms && (
                    <div className="flex flex-wrap gap-3 mb-4">
                      {achievement.platforms.map((platform, idx) => (
                        <a
                          key={idx}
                          href={platform.link}
                          className="inline-flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-all duration-200 border border-gray-700 hover:border-gray-600"
                        >
                          <span className="font-medium">{platform.name}</span>
                          {platform.rating && <span className="text-blue-400">({platform.rating})</span>}
                          {platform.score && <span className="text-green-400">({platform.score})</span>}
                          {platform.badge && <span>{platform.badge}</span>}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Stats for SIH */}
                  {achievement.stats && (
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Teams Selected:</span>
                        <span className="text-blue-400 font-semibold">{achievement.stats.teams}</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Scope:</span>
                        <span className="text-purple-400 font-semibold">{achievement.stats.scope}</span>
                      </div>
                      {achievement.year && (
                        <>
                          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                          <span className="text-gray-400">{achievement.year}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Platform Stats */}
        <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 mx-5 rounded-2xl p-3 md:p-3 ">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Performance Highlights</h3>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {platformStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {stat.platform}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Want to see my coding profiles?</p>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(codingProfiles).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-white px-4 py-2 rounded-lg transition-all duration-200 border border-blue-500/30 hover:border-blue-400/50"
              >
                <span>{platform}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Achievements;
"use client"

import React, { useState } from "react"
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { motion } from "framer-motion"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const platforms = [
    {
      name: "GitHub",
      icon: <Github size={20} />,
      url: "https://github.com/harsha2143"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      url: "https://www.linkedin.com/in/harshavardhansaripalli/"
    },

    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      url: "https://instagram.com/har_sha2143"
    }
  ];

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: <Mail className="text-[rgb(0,98,255)]" size={24} />,
      title: "Email",
      value: "harshavardhansaripalli21@gmail.com",
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=harshavardhansaripalli21@gmail.com",
    },
    {
      icon: <Phone className="text-[rgb(0,98,255)]" size={24} />,
      title: "Phone",
      value: "+91 9703663860",
      link: "tel:+919703663860",
    },
    {
      icon: <MapPin className="text-[rgb(0,98,255)]" size={24} />,
      title: "Location",
      value: "Bhimavaram, Andhra Pradesh",
      link: "https://www.google.com/maps/@16.5430852,81.4937469,17z?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3D",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 z-0">
      </div>

      <div className="w-full px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-blue-500">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out to me using the
            contact form below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative ml-12 mr-8 sm:ml-8 lg:ml-52 mr-6"
          >
            {/* Curved Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950 to-gray-800 rounded-3xl backdrop-blur-sm border border-gray-700/30 shadow-2xl shadow-gray-900/20 -z-10"></div>

            {/* Content Container */}
            <div className="relative p-4 sm:p-4 lg:p-6">
              {/* Contact Information Section */}
              <div className="mb-8 ml-12 sm:mb-5 ml-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-6 text-transparent bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text">
                  Contact Information
                </h3>

                <div className="space-y-5 sm:space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.15,
                        ease: [0.21, 0.47, 0.32, 0.98]
                      }}
                      className="group flex items-start gap-2 sm:gap-2 sm:p-1 rounded-xl transition-all duration-300"
                    >
                      <div className="flex-shrink-0 p-3 sm:p-4  rounded-xl group-hover:border-blue-400 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                        <div className="text-blue-100 group-hover:text-blue-700 transition-colors duration-300">
                          {info.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base sm:text-md text-gray-500 mb-1 group-hover:text-white transition-colors duration-300">
                          {info.title}
                        </h4>
                        <a
                          href={info.link}
                          className="text-white font-semibold hover:text-blue-800 transition-colors duration-300 text-sm sm:text-base break-words group-hover:text-blue-300"
                        >
                          {info.value}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Media Section */}
              <div>
                <h3 className="text-lg sm:text-lg lg:text-lg font-bold mb-6 sm:mb-2 text-transparent bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text">
                  Connect with me
                </h3>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {platforms.map((platform, index) => (
                    <motion.a
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 + (index * 0.1), ease: [0.21, 0.47, 0.32, 0.98] }}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-black/60 rounded-full border border-gray-700/50 text-white hover:text-[rgb(0,94,255)] hover:border-blue-500/100 hover:scale-210 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:rotate-3"
                      aria-label={platform.name}
                    >
                      <div className="transform group-hover:scale-110 transition-transform duration-300 ">
                        {platform.icon}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            {/* <div className="absolute top-4 right-4 w-20 h-20 bg-blue-700/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-700/10 rounded-full blur-xl"></div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative ml-8 mr-8 sm:mr-16 lg:mr-28"
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-500">Send Me a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#111111] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#111111] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
              >
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#111111] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  placeholder="Project Inquiry"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.4,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[#111111] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white resize-none"
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-center"
                >
                  Your message has been sent successfully!
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
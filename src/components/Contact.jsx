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
      url: "https://github.com/Chakri2759" 
    },
    { 
      name: "LinkedIn", 
      icon: <Linkedin size={20} />,
      url: "https://linkedin.com/in/chakri555" 
    },
    
    { 
      name: "Instagram", 
      icon: <Instagram size={20} />,
      url: "https://instagram.com/chakri__ramisetti" 
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
      icon: <Mail className="text-blue-500" size={24} />,
      title: "Email",
      value: "chakriramisetti555@gmail.com",
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=chakriramisetti555@gmail.com",
    },
    {
      icon: <Phone className="text-blue-500" size={24} />,
      title: "Phone",
      value: "+91 7981297137",
      link: "tel:+917981297137",
    },
    {
      icon: <MapPin className="text-blue-500" size={24} />,
      title: "Location",
      value: "Bhimavaram, Andhra Pradesh",
      link: "https://www.google.com/maps/@16.5430852,81.4937469,17z?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3D",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
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
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-500">Contact Information</h3>

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
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
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <div className="p-2 sm:p-3 bg-[#111111] rounded-lg border border-gray-800">{info.icon}</div>
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-white">{info.title}</h4>
                    <a
                      href={info.link}
                      className="text-gray-400 hover:text-blue-500 transition-colors duration-300 text-sm sm:text-base"
                    >
                      {info.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-500">Follow Me</h3>
            <div className="flex flex-wrap gap-2 sm:gap-4">
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
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-full border border-gray-800 text-gray-300 hover:text-blue-500 hover:border-blue-500/30 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                  aria-label={platform.name}
                >
                  {platform.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-500">Send Me a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
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
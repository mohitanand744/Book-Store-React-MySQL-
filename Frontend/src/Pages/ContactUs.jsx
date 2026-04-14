import { motion } from "framer-motion";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import Banners from "./../components/Banners/Banners";
import Input from "../components/Inputs/Input";

const ContactUs = () => {
  const [subject, setSubject] = useState("");

  const subjectOptions = [
    { label: "Order Inquiry", value: "order" },
    { label: "Book Recommendation", value: "recommendation" },
    { label: "Author Partnership", value: "partnership" },
    { label: "Other", value: "other" }
  ];
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: "Our Store",
      detail: "Connaught Place, New Delhi, 110001",
      description: "Come visit our physical store!"
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: "Email Us",
      detail: "hello@nextchapter.in",
      description: "We typically reply within 24 hours."
    },
    {
      icon: <FaPhoneAlt className="text-3xl" />,
      title: "Call Us",
      detail: "+91 98765 43210",
      description: "Mon-Sat from 9am to 7pm."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F2EB] to-[#F6F2EB]">
      {/* Hero Section */}
      <Banners titleFirst={"Get in"} titleSecond={"Touch"} />

      {/* Main Content Area */}
      <div className="max-w-6xl px-4 py-20 mx-auto">
        <div className="flex flex-col gap-16 lg:flex-row">

          {/* Contact Information (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3"
          >
            <h2 className="mb-8 text-3xl font-bold text-[#5E4C37]">Contact <span className="text-[#b1946a]">Information</span></h2>
            <p className="mb-10 text-gray-600 leading-relaxed">
              Whether you have a question about a specific book, need help with your order, or just want to share your latest literary discovery, our team is always ready to hear from you.
            </p>

            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-4 transition-colors duration-300 bg-white shadow-sm rounded-xl hover:bg-[#F6F2EB]"
                  key={index}
                >
                  <div className="p-3 text-[#b1946a] bg-[#b1946a]/10 rounded-full">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{info.title}</h4>
                    <p className="font-medium text-[#b1946a]">{info.detail}</p>
                    <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3"
          >
            <div className="p-8 bg-white md:p-12 shadow-2xl rounded-3xl">
              <h3 className="mb-6 text-2xl font-bold text-gray-800">Send us a Message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="First Name"
                    placeholder="Enter your first name"
                    className="bg-gray-50 hover:bg-white transition-colors duration-300"
                  />
                  <Input
                    label="Last Name"
                    placeholder="Enter your last name"
                    className="bg-gray-50 hover:bg-white transition-colors duration-300"
                  />
                </div>

                <Input
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email address"
                  className="bg-gray-50 hover:bg-white transition-colors duration-300"
                />

                <Input
                  as="select"
                  label="Subject"
                  placeholder="How can we help you?"
                  options={subjectOptions}
                  selectedValue={subject}
                  onChange={setSubject}
                  className="bg-gray-50 hover:bg-white transition-colors duration-300"
                />

                <Input
                  as="textarea"
                  label="Message"
                  placeholder="Write your message here..."
                  className="bg-gray-50 hover:bg-white transition-colors duration-300 resize-none h-32"
                />

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px #b1946a" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center w-full gap-2 px-8 py-4 font-bold text-white transition-colors duration-300 bg-gradient-to-r from-[#5E4C37] to-[#b1946a] rounded-xl text-lg hover:from-[#4a3d2c] hover:to-[#9a805a]"
                >
                  <FaPaperPlane />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full h-96 relative pb-10"
      >
        <div className="absolute inset-0 max-w-6xl mx-auto px-4 overflow-hidden rounded-3xl shadow-xl h-[90%]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.839233663!2d77.0688975!3d28.5272803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1714528193495!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;

import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaHeart,
  FaAward,
  FaUsers,
  FaShippingFast,
  FaHeadset,
  FaRecycle,
  FaQuoteLeft,
} from "react-icons/fa";
import { GiBookPile } from "react-icons/gi";
import Banners from "./../components/Banners/Banners";

const AboutUs = () => {
  // Team Data
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Former librarian who turned his passion for books into this venture. Believes every book has a reader waiting.",
      img: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
      favoriteGenre: "Historical Fiction",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Head of Operations",
      bio: "Organized over 200 book clubs before joining NextChapter. Loves connecting readers with perfect matches.",
      img: "https://fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_11368.png",
      favoriteGenre: "Literary Fiction",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Tech Lead",
      bio: "Built our AI recommendation system. When not coding, he's reviewing sci-fi novels.",
      img: "https://img.freepik.com/free-photo/front-view-young-businessman-office-clothing_23-2148763859.jpg?semt=ais_hybrid&w=740",
      favoriteGenre: "Science Fiction",
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      role: "Head Curator",
      bio: "Former editor at major publishing house. Has an uncanny ability to predict bestsellers.",
      img: "https://www.belindaburtonphotography.com/wp-content/uploads/2024/02/best-pictures-on-linkedin-woman-female-professional-headshot-black-shoulder-length-hair-2.jpg",
      favoriteGenre: "Contemporary",
    },
  ];

  // Stats Data
  const stats = [
    {
      icon: <FaBookOpen className="text-3xl" />,
      value: "10,000+",
      label: "Books Available",
    },
    {
      icon: <FaHeart className="text-3xl" />,
      value: "50,000+",
      label: "Happy Readers",
    },
    {
      icon: <FaAward className="text-3xl" />,
      value: "100+",
      label: "Award-Winning Titles",
    },
    {
      icon: <FaUsers className="text-3xl" />,
      value: "500+",
      label: "Authors Partnered",
    },
  ];

  // Timeline Data
  const timeline = [
    {
      year: "2018",
      title: "Founded in a Garage",
      description:
        "Started as a weekend project between three book-loving friends.",
    },
    {
      year: "2019",
      title: "First 1,000 Customers",
      description: "Reached our first major milestone thanks to word-of-mouth.",
    },
    {
      year: "2020",
      title: "AI Recommendations Launched",
      description: "Implemented our mood-based book suggestion system.",
    },
    {
      year: "2022",
      title: "Physical Store Opened",
      description:
        "Expanded to our first brick-and-mortar location in Seattle.",
    },
    {
      year: "2023",
      title: "Reader's Choice Awards",
      description: "Voted 'Best Online Bookstore' by Book Lovers Magazine.",
    },
  ];

  // Values Data
  const values = [
    {
      icon: <GiBookPile className="text-4xl" />,
      title: "Curated Selection",
      description:
        "Every book in our store is hand-picked by our team of bibliophiles.",
    },
    {
      icon: <FaShippingFast className="text-4xl" />,
      title: "Fast & Eco Shipping",
      description: "Carbon-neutral deliveries in 100% recycled packaging.",
    },
    {
      icon: <FaHeadset className="text-4xl" />,
      title: "Reader Support",
      description: "Real book experts available 24/7 to help you choose.",
    },
    {
      icon: <FaRecycle className="text-4xl" />,
      title: "Book Recycling",
      description: "We'll take back your old books for store credit.",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote:
        "NextChapter's AI recommendation found me three new favorite authors I'd never have discovered otherwise!",
      author: "Jamie L., Book Club Leader",
    },
    {
      quote:
        "As an indie author, their platform has given me more visibility than any other retailer.",
      author: "Marcus T., Author",
    },
    {
      quote:
        "Their eco-friendly packaging and carbon offsets make me feel good about every purchase.",
      author: "Priya K., Environmentalist",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F2EB] to-[#F6F2EB]">
      {/* Hero Section */}
      <Banners titleFirst={"Our"} titleSecond={"Story"} />

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid max-w-6xl grid-cols-2 gap-6 px-4 mx-auto md:grid-cols-4 my-28"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="p-6 text-center transition-all duration-300 bg-white border-b-4 border-[#b1946a] shadow-lg rounded-xl hover:shadow-xl"
          >
            <div className="flex justify-center mb-3 text-[#b1946a]">
              {stat.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Our Story Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl px-4 mx-auto mb-28"
      >
        <h2 className="mb-12 text-3xl font-bold text-center text-[#5E4C37]">
          Our <span className="text-[#b1946a]">Journey</span>
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute hidden w-1 h-[94%] top-2 transform -translate-x-1/2 bg-[#f5d7ad] md:block left-1/2"></div>

          {/* Timeline Section - Responsive */}
          <div className="relative">
            {/* Timeline line - only visible on md+ screens */}
            <div className="absolute left-1/2 hidden h-full w-0.5 bg-gray-200 md:block transform -translate-x-1/2"></div>

            {/* Timeline items */}
            <div className="space-y-16 md:space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative"
                >
                  {/* Mobile layout (single column) */}
                  <div className="flex flex-col md:hidden">
                    {/* Year - mobile version */}
                    <div className="flex items-center mb-4">
                      <div className="w-4 h-4 rounded-full bg-[#b1946a]"></div>
                      <div className="ml-4 px-4 py-2 bg-[#b1946a] bg-opacity-10 rounded-lg">
                        <span className="font-bold text-[#b1946a]">
                          {item.year}
                        </span>
                      </div>
                    </div>

                    {/* Content - mobile */}
                    <div className="ml-8 pl-6 border-l-2 border-[#b1946a] border-opacity-30">
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  {/* Desktop layout (alternating) */}
                  <div className="hidden space-y-12 md:block">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className={`relative flex ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      } items-center`}
                    >
                      {/* Year */}
                      <div className="z-10 flex items-center justify-center w-20 h-20 font-bold text-white transform -translate-x-1/2 bg-[#b1946a] rounded-full md:absolute left-1/2">
                        {item.year}
                      </div>

                      {/* Content */}
                      <div
                        className={`md:w-5/12 mt-10 md:mt-0 ${
                          index % 2 === 0 ? "md:pr-6 md:text-right" : "md:pl-6"
                        }`}
                      >
                        <h3 className="text-xl font-bold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-4 py-20 text-white bg-[#5E4C37] mb-28"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 text-3xl font-bold text-center">
            Our <span className="text-[#c7a77a]">Values</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 bg-white border border-white bg-opacity-10 rounded-xl backdrop-blur-sm border-opacity-20"
              >
                <div className="mb-4 text-purple-300">{value.icon}</div>
                <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                <p className="text-indigo-100">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl px-4 mx-auto mb-28"
      >
        <h2 className="mb-4 text-3xl font-bold text-center text-[#5E4C37]">
          The <span className="text-[#b1946a]">People</span> Behind the Pages
        </h2>
        <p className="max-w-2xl mx-auto mb-12 text-center text-gray-600">
          Meet the passionate book lovers who make <b>NextChapter</b> possible
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-purple-300">{member.role}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-4 text-gray-600">{member.bio}</p>
                <div className="text-sm text-[#b1946a]">
                  <span className="font-semibold">Favorite Genre:</span>{" "}
                  {member.favoriteGenre}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-4 py-20 bg-gradient-to-r from-[#5E4C37] to-[#b1946a] mb-28"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-[#ffdeb9]">
            What Our <span className="text-[#f7cb8d]">Community</span> Says
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="p-8 bg-white shadow-md rounded-xl"
              >
                <FaQuoteLeft className="mb-4 text-3xl text-[#b1946a]" />
                <p className="mb-6 italic text-gray-700">
                  "{testimonial.quote}"
                </p>
                <p className="font-semibold text-[#b1946a]">
                  — {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-4 py-20 text-center text-white bg-gradient-to-r from-[#5E4C37] to-[#b1946a]"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6 text-[#ffdeb9] text-3xl font-bold md:text-4xl">
            Ready for Your <span className="text-[#f7cb8d]">Next Chapter?</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl">
            Join our community of passionate readers today
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px #b1946a",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 font-medium border-2 border-white text-white rounded-full shadow-md bg-gradient-to-r from-[#806642] to-[#b1946a]"
            >
              Start Reading Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 font-bold text-white transition-all duration-300 bg-transparent border-2 border-white rounded-full hover:bg-[#b1946a] hover:text-[#5E4C37]"
            >
              Join Our Book Club
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Footer Note */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative px-6 py-16 overflow-hidden text-center"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating book icons */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute text-[#b1946a] left-1/4 top-1/3 opacity-20"
            style={{ fontSize: "3rem" }}
          >
            <GiBookPile />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute text-[#b1946a] right-1/4 bottom-1/4 opacity-20"
            style={{ fontSize: "4rem" }}
          >
            <GiBookPile />
          </motion.div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <motion.p
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-2xl font-light leading-relaxed text-gray-700 md:text-3xl"
          >
            "Every book you read writes a new chapter in{" "}
            <span className="font-bold text-[#b1946a]">your</span> story."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
            className="pt-8 mt-12 border-t border-gray-200"
          >
            <div className="flex justify-center mb-6 space-x-6">
              {["Facebook", "Twitter", "Instagram", "Goodreads"].map(
                (social) => (
                  <motion.a
                    key={social}
                    whileHover={{ y: -3, color: "#5e4c37" }}
                    className="text-gray-500 transition-colors hover:text-purple-600"
                    href="#"
                  >
                    {social}
                  </motion.a>
                )
              )}
            </div>

            <motion.div
              whileHover={{ rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="inline-block mb-4"
            >
              <GiBookPile className="mx-auto text-5xl text-[#b1946a]" />
            </motion.div>

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} NextChapter. All stories welcome.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default AboutUs;

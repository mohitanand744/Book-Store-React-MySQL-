import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import {
  FaHeart,
  FaHistory,
  FaRegAddressCard,
  FaRegHeart,
  FaShoppingBag,
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { mockBooks } from "./../../Data/mockData";
import ScrollBooks from "../components/ScrollingContainer/ScrollBooks";
import toast from "react-hot-toast";
import Button from "../components/Buttons/Button";
import { CopyIcon } from "../components/SVGs/SVGs";

// Mock user data with additional details
const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar:
    "https://media.istockphoto.com/id/1322973325/photo/black-girl-standing-with-tablet-at-yellow-studio.jpg?s=612x612&w=0&k=20&c=wZapeoTwD4wICqSnACYEp7VZdOkVtVfBhzBg-1dueJU=",
  joinDate: "January 2023",
  address: "123 Book Street, Novel City, 10001",
  phone: "(555) 123-4567",
  orders: 12,
  wishlist: 8,
  favoriteGenres: ["Fantasy", "Mystery", "Science Fiction"],
  readingPreferences: {
    format: "Paperback",
    language: "English",
    notification: "Weekly",
  },
  recentOrders: [
    {
      id: "#BK-2023-0456",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      date: "Today",
      status: "Delivered",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ1Skl5TTerlDFbWVmCW_cL9BBXAtdS-_AdVJdlbE7KPs7DExRiblBJswAfFgPmFj3wqteiD0MbfVnfeTJoBtaZwORgEV0qO9mItMDNsqmD_tnkAf758DwL",
    },
    {
      id: "#BK-2023-0455",
      title: "Project Hail Mary",
      author: "Andy Weir",
      date: "Yesterday",
      status: "Shipped",
      imageUrl:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRLnAxDvjZWtSOIV-5pZ62oZQht34TYOe33DUGFjfYJP1iGUZSQpuIgLb-qWRum_2j4ZHpIR-S558mjlmGHJWSjrott3i2EI6ZSO5fsKuadTtLTYP8Itk3qg-Vc",
    },
    {
      id: "#BK-2023-0454",
      title: "Dune",
      author: "Frank Herbert",
      date: "2 days ago",
      status: "Processing",
      imageUrl:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTOa349umZfJoT8jxIwwlhddByC8XioB8yqGuUsD-74HVhIuq2MSlX7tv9M0p-xLCvH1NUanvF4Gu-ztIzjHXZw-_NpLLB9ofG8DzoHxYBCBqHJfJkVK-HwZg",
    },
  ],
  wishlistItems: [
    {
      id: "WL-001",
      title: "The Midnight Library",
      author: "Matt Haig",
      price: "$14.99",
      image:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcST2_1i1NyxMqbY6vjq7CgFKocgroiiu9zg770ja3V7fj72rv10n9i_N64_2XQLEHWnnMUSs3Zcss5In9xlJmgHCjEpsLSi3t2FRx8bM7PEa6QCv0SWnMZq2Q",
    },
    {
      id: "WL-002",
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      price: "$13.50",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTOa349umZfJoT8jxIwwlhddByC8XioB8yqGuUsD-74HVhIuq2MSlX7tv9M0p-xLCvH1NUanvF4Gu-ztIzjHXZw-_NpLLB9ofG8DzoHxYBCBqHJfJkVK-HwZg",
    },
  ],
};

const UserProfile = () => {
  const [user, setUser] = useState(mockUser);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({ ...mockUser });
  const [activeTab, setActiveTab] = useState("activity");
  const navigate = useNavigate();

  const handleEdit = () => {
    setEditData({ ...user });
    setIsEditOpen(true);
  };

  const handleSave = () => {
    setUser(editData);
    setIsEditOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const navigateToOrders = () => {
    navigate("/bookstore/orders");
  };

  const navigateToWishlist = () => {
    navigate("/bookstore/wishlist");
  };

  return (
    <div className="min-h-screen bg-[#F5F1ED] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 py-3 mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
          <motion.h1
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-3xl font-bold text-[#5C4C49] mb-4 md:mb-0"
          >
            My Profile
          </motion.h1>
          <div className="flex flex-wrap justify-center gap-3 sm:justify-start md:space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={navigateToOrders}
            >
              <Button className="flex items-center text-nowrap px-4 py-2 bg-[#5C4C49] text-[#E8D9C5] rounded-lg shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
                My Orders
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={navigateToWishlist}
            >
              <Button className="flex items-center text-nowrap px-4 py-2 bg-[#D3BD9D] text-[#5C4C49] rounded-lg shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                Wishlist
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
            >
              <Button
                className="flex items-center px-4 text-nowrap py-2 bg-[#5C4C49] text-[#E8D9C5] rounded-lg shadow-md"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/3 bg-gradient-to-br from-[#E8D9C5] to-[#D3BD9D] rounded-2xl shadow-xl overflow-hidden h-fit border border-[#5C4C49]/10"
          >
            {/* Profile Header with Decorative Elements */}
            <div className="relative h-28 bg-[#5C4C49] rounded-t-2xl overflow-hidden">
              {/* Subtle SVG Pattern Background */}
              <svg
                className="absolute inset-0 w-full h-full opacity-10"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <pattern
                  id="pattern-circles"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="10" cy="10" r="1.5" fill="#E8D9C5" />
                </pattern>
                <rect
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  fill="url(#pattern-circles)"
                />
              </svg>

              {/* Wavy SVG Divider */}
              <svg
                className="absolute bottom-0 w-full"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  opacity=".25"
                  fill="#E8D9C5"
                />
                <path
                  d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                  opacity=".5"
                  fill="#E8D9C5"
                />
                <path
                  d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                  fill="#E8D9C5"
                />
              </svg>

              {/* Decorative Corner Elements */}
              <svg
                className="absolute top-2 left-2 w-8 h-8 text-[#E8D9C5]/20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <svg
                className="absolute top-2 right-2 w-8 h-8 text-[#E8D9C5]/20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>

              {/* Floating Book Icons */}
              <svg
                className="absolute top-1/4 left-1/4 w-6 h-6 text-[#E8D9C5]/30 animate-float"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <svg
                className="absolute top-1/3 right-1/4 w-5 h-5 text-[#E8D9C5]/40 animate-float animation-delay-100"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex justify-center mt-[-4.8rem] ">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="object-cover w-32 h-32 border-4 border-white rounded-full shadow-lg"
                />
              </motion.div>
            </div>
            {/* Profile Content */}
            <div className="px-6 pt-6 pb-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 text-center"
              >
                <h2 className="text-2xl font-bold text-[#5C4C49]">
                  {user.name}
                </h2>
                <p className="text-[#5C4C49]/80 flex items-center justify-center gap-1 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Member since {user.joinDate}
                </p>
              </motion.div>

              {/* Profile Details */}
              <div className="space-y-5">
                <ModernProfileDetail
                  icon={<MdOutlineMail className="text-[#5C4C49] text-xl" />}
                  label="Email"
                  value={user.email}
                  delay={0.4}
                  isCopyable
                />
                <ModernProfileDetail
                  icon={<FiPhone className="text-[#5C4C49] text-lg" />}
                  label="Phone"
                  value={user.phone}
                  delay={0.5}
                />
                <ModernProfileDetail
                  icon={<FaRegAddressCard className="text-[#5C4C49] text-lg" />}
                  label="Address"
                  value={user.address}
                  delay={0.6}
                />
                <ModernProfileDetail
                  icon={<FaRegHeart className="text-[#5C4C49] text-lg" />}
                  label="Favorite Genres"
                  value={user.favoriteGenres.join(", ")}
                  delay={0.7}
                />
              </div>

              {/* Social/Stats */}
              {/*   <div className="mt-8 pt-5 border-t border-[#5C4C49]/20">
                <div className="flex justify-around">
                  <StatPill
                    count={user.orders}
                    label="Orders"
                    icon="🛒"
                    color="text-[#5C4C49]"
                  />
                  <StatPill
                    count={user.wishlist}
                    label="Wishlist"
                    icon="❤️"
                    color="text-[#D3BD9D]"
                  />
                  <StatPill
                    count={user.favoriteGenres.length}
                    label="Genres"
                    icon="📖"
                    color="text-[#5C4C49]"
                  />
                </div>
              </div> */}

              {/* Edit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={handleEdit}
              >
                <Button
                  className="flex items-center w-full mt-5 justify-center px-4 text-nowrap py-2 bg-[#5C4C49] text-[#E8D9C5] rounded-lg shadow-md"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit Profile
                </Button>
              </motion.div>
            </div>
          </motion.div>
          {/* Right Column */}
          <div className="flex-1 space-y-6">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <StatCard
                title="Orders"
                value={user.orders}
                color="bg-[#5C4C49]"
                text="#E8D9C5"
                delay={0.9}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                }
                onClick={navigateToOrders}
              />
              <StatCard
                title="Wishlist"
                value={user.wishlist}
                color="bg-[#D3BD9D]"
                text="#5C4C49"
                delay={1.0}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                }
                onClick={navigateToWishlist}
              />
            </motion.div>

            {/* Desktop Tabs Navigation */}
            <div className="hidden md:flex border-b border-[#D3BD9D]">
              <motion.button
                onClick={() => setActiveTab("activity")}
                className={`px-4 py-2 font-medium text-nowrap text-[16px] relative ${
                  activeTab === "activity"
                    ? "text-[#5C4C49]"
                    : "text-[#5C4C49] opacity-70"
                }`}
                whileHover={{ opacity: 1 }}
              >
                Recent Activity
                {activeTab === "activity" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5C4C49]"
                    layoutId="underline"
                  />
                )}
              </motion.button>

              <motion.button
                onClick={() => setActiveTab("orders")}
                className={`px-4 py-2 font-medium text-nowrap text-[16px] relative ${
                  activeTab === "orders"
                    ? "text-[#5C4C49]"
                    : "text-[#5C4C49] opacity-70"
                }`}
                whileHover={{ opacity: 1 }}
              >
                Recent Orders
                {activeTab === "orders" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5C4C49]"
                    layoutId="underline"
                  />
                )}
              </motion.button>

              <motion.button
                onClick={() => setActiveTab("wishlist")}
                className={`px-4 py-2 font-medium text-nowrap text-[16px] relative ${
                  activeTab === "wishlist"
                    ? "text-[#5C4C49]"
                    : "text-[#5C4C49] opacity-70"
                }`}
                whileHover={{ opacity: 1 }}
              >
                Wishlist Preview
                {activeTab === "wishlist" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5C4C49]"
                    layoutId="underline"
                  />
                )}
              </motion.button>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="bg-white border-t border-[#D3BD9D] md:hidden flex justify-around py-2 z-50">
              <motion.button
                onClick={() => setActiveTab("activity")}
                className={`flex flex-col items-center p-2 w-full relative ${
                  activeTab === "activity"
                    ? "text-[#5C4C49]"
                    : "text-[#5C4C49] opacity-70"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <FaHistory className="w-5 h-5" />
                <span className="mt-1 text-xs">Activity</span>
                {activeTab === "activity" && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-0.5 bg-[#5C4C49]"
                    layoutId="mobileUnderline"
                  />
                )}
              </motion.button>

              <motion.button
                onClick={() => setActiveTab("orders")}
                className={`flex flex-col items-center p-2 w-full relative ${
                  activeTab === "orders"
                    ? "text-[#5C4C49]"
                    : "text-[#5C4C49] opacity-70"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <FaShoppingBag className="w-5 h-5" />
                <span className="mt-1 text-xs">Orders</span>
                {activeTab === "orders" && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-0.5 bg-[#5C4C49]"
                    layoutId="mobileUnderline"
                  />
                )}
              </motion.button>

              <motion.button
                onClick={() => setActiveTab("wishlist")}
                className={`flex flex-col items-center p-2 w-full relative ${
                  activeTab === "wishlist"
                    ? "text-[#5C4C49]"
                    : "text-[#5C4C49] opacity-70"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <FaHeart className="w-5 h-5" />
                <span className="mt-1 text-xs">Wishlist</span>
                {activeTab === "wishlist" && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-0.5 bg-[#5C4C49]"
                    layoutId="mobileUnderline"
                  />
                )}
              </motion.button>
            </div>

            {/* Tab Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="p-6 bg-white rounded-2xl"
            >
              {activeTab === "activity" && (
                <div className="space-y-4">
                  {user.recentOrders.slice(0, 3).map((order, index) => (
                    <ActivityItem
                      key={order.id}
                      title={`Order ${order.status}`}
                      date={order.date}
                      description={`${order.title} by ${order.author}`}
                      status={order.status}
                      delay={0.1 * index}
                      imageUrl={order.imageUrl}
                    />
                  ))}
                </div>
              )}

              {activeTab === "orders" && (
                <div className="space-y-4">
                  {user.recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300,
                      }}
                      whileHover={{ y: -3 }}
                      className="bg-white rounded-xl shadow-sm border border-[#E8D9C5] overflow-hidden transition-all duration-200 hover:shadow-md"
                      onClick={() => navigate(`/bookstore/order/${order.id}`)}
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Book Cover */}
                        <div className="flex items-center justify-center w-full p-8 border-r rounded-2xl md:w-36">
                          <img
                            src={
                              order.imageUrl ||
                              "https://via.placeholder.com/100x150?text=Book+Cover"
                            }
                            alt={order.title}
                            className="object-contain h-[7rem]"
                          />
                        </div>

                        {/* Order Details */}
                        <div className="flex-1 p-4">
                          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                            <div>
                              <h3 className="text-lg font-semibold text-[#5C4C49]">
                                {order.title}
                              </h3>
                              <p className="text-sm text-[#5C4C49] opacity-80">
                                by {order.author}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-[#5C4C49] opacity-70">
                                {order.date}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Shipped"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-4 text-sm md:grid-cols-4">
                            <div>
                              <p className="text-[#5C4C49] opacity-70">
                                Order ID
                              </p>
                              <p className="font-medium text-[#5C4C49]">
                                {order.id}
                              </p>
                            </div>
                            <div>
                              <p className="text-[#5C4C49] opacity-70">Price</p>
                              <p className="font-medium text-[#5C4C49]">
                                {order.price || "$19.99"}
                              </p>
                            </div>
                            <div>
                              <p className="text-[#5C4C49] opacity-70">
                                Quantity
                              </p>
                              <p className="font-medium text-[#5C4C49]">
                                {order.quantity || 1}
                              </p>
                            </div>
                            <div>
                              <p className="text-[#5C4C49] opacity-70">Total</p>
                              <p className="font-medium text-[#5C4C49]">
                                {order.total || "$19.99"}
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-end mt-4">
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center gap-1 px-4 py-2 bg-[#5C4C49] text-[#E8D9C5] rounded-lg text-sm font-medium"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/bookstore/order/${order.id}`);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              View Details
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === "wishlist" && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {user.wishlistItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="flex items-center p-3 border border-[#D3BD9D] rounded-lg cursor-pointer"
                      onClick={() => navigate(`/bookstore/book/${item.id}`)}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-20 h-24 mr-4 rounded-md">
                        <img
                          src={item.image}
                          className="object-contain w-full h-full"
                          alt=""
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#5C4C49]">
                          {item.title}
                        </h4>
                        <p className="text-sm text-[#5C4C49] opacity-80">
                          {item.author}
                        </p>
                        <p className="text-[#5C4C49] font-semibold mt-1">
                          {item.price}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Related Books Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="container mt-16"
      >
        <h2 className="text-2xl font-bold text-[#5C4C49] mb-6">
          {/*  More by {book.author.author_name} */}
          Related Books
        </h2>
        <div className="">
          <ScrollBooks autoScroll={false} books={mockBooks?.slice(5, 11)} />
        </div>
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#E8D9C5] rounded-xl shadow-xl w-full max-w-md p-6"
            >
              <h2 className="text-2xl font-bold text-[#5C4C49] mb-4">
                Edit Profile
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#5C4C49] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-[#D3BD9D] rounded bg-white focus:ring-2 focus:ring-[#5C4C49] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5C4C49] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-[#D3BD9D] rounded bg-white focus:ring-2 focus:ring-[#5C4C49] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5C4C49] mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-[#D3BD9D] rounded bg-white focus:ring-2 focus:ring-[#5C4C49] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5C4C49] mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={editData.address}
                    onChange={handleChange}
                    className="w-full p-2 border border-[#D3BD9D] rounded bg-white focus:ring-2 focus:ring-[#5C4C49] focus:border-transparent"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5C4C49] mb-1">
                    Favorite Genres
                  </label>
                  <input
                    type="text"
                    name="favoriteGenres"
                    value={editData.favoriteGenres.join(", ")}
                    onChange={(e) => {
                      const genres = e.target.value
                        .split(",")
                        .map((g) => g.trim());
                      setEditData((prev) => ({
                        ...prev,
                        favoriteGenres: genres,
                      }));
                    }}
                    className="w-full p-2 border border-[#D3BD9D] rounded bg-white focus:ring-2 focus:ring-[#5C4C49] focus:border-transparent"
                  />
                  <p className="text-xs text-[#5C4C49] opacity-70 mt-1">
                    Separate genres with commas
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border border-[#5C4C49] text-[#5C4C49] rounded-lg"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#5C4C49] text-[#E8D9C5] rounded-lg"
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reusable components
const ProfileDetail = ({ label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
  >
    <p className="text-sm font-medium text-[#5C4C49] opacity-80">{label}</p>
    <p className="text-lg text-[#5C4C49] font-semibold">{value}</p>
  </motion.div>
);

const StatCard = ({ title, value, color, delay, icon, text, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    onClick={onClick}
    className={`${color} text-[${text}] rounded-xl shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-lg font-medium">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className="p-2 bg-white rounded-full bg-opacity-30">{icon}</div>
    </div>
  </motion.div>
);

const ActivityItem = ({
  title,
  date,
  description,
  status,
  delay,
  imageUrl,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: "spring", stiffness: 300 }}
    whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E8D9C5] transition-all duration-200 hover:shadow-lg"
  >
    <div className="flex flex-col sm:flex-row">
      {/* Product Image */}
      <div className="relative flex items-center justify-center h-40 border-r rounded-r-2xl sm:w-1/4 sm:h-auto">
        <img
          src={
            imageUrl ||
            "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQwm3sKSSsqSSqtZNE_Funcouaw8XHA885zkmvnK3MUH8RxvbPpyN72hQuAMbkzP-0Dm9xpJu9JVODLh4I8p9bWbAYlDoZZWscNXeRf58yOO0jV6qffaEtq8g"
          }
          alt={title}
          className="object-contain w-full h-[9rem] p-4"
        />
        {status && (
          <span
            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
              status === "Delivered"
                ? "bg-green-100 text-green-800"
                : status === "Shipped"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {status}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 sm:w-3/4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-lg font-semibold text-[#5C4C49]">{title}</h4>
          <span className="text-sm text-[#5C4C49] opacity-70">{date}</span>
        </div>

        <p className="text-[#5C4C49] opacity-90 mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <div className="bg-[#5C4C49] text-[#E8D9C5] rounded-full w-8 h-8 flex items-center justify-center mr-2">
              {title.charAt(0)}
            </div>
            <span className="text-sm text-[#5C4C49] opacity-80">Activity</span>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=""
          >
            <Button
              type="button"
              className="px-4 py-2 bg-[#5C4C49] text-[#E8D9C5] rounded-lg text-sm font-medium flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              View Details
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);
export default UserProfile;

const StatPill = ({ count, label, icon, color }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="text-center">
    <div className={`text-2xl ${color}`}>{icon}</div>
    <p className="text-lg font-bold text-[#5C4C49]">{count}</p>
    <p className="text-xs text-[#5C4C49]/70">{label}</p>
  </motion.div>
);

const ModernProfileDetail = ({ icon, label, value, delay, isCopyable }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-start gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm border border-[#5C4C49]/10"
  >
    <span className="text-xl mt-0.5">{icon}</span>
    <div className="flex-1">
      <p className="text-xs font-medium text-[#5C4C49]/70 uppercase tracking-wider">
        {label}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-[#5C4C49] text-xs sm:text-sm md:text-md font-medium">
          {value}
        </p>
        {isCopyable && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              navigator.clipboard
                .writeText(value)
                .then(() => {
                  toast.success("Copied to clipboard!");
                })
                .catch((error) => {
                  console.error("Failed to copy to clipboard:", error);
                });
            }}
            className="text-[#5C4C49]/50 hover:text-[#5C4C49] transition-colors"
            title="Copy to clipboard"
          >
            <CopyIcon />
          </motion.button>
        )}
      </div>
    </div>
  </motion.div>
);

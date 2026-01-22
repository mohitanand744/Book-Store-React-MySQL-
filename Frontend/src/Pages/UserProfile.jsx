import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
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
import { toast } from "sonner";
import Button from "../components/Buttons/Button";
import {
  BagSvg,
  CalendarSvg,
  CopyIcon,
  DecorativeHeader,
  EyesSvg,
  HearthSvg,
  PencilSvg,
} from "../components/SVGs/SVGs";
import useAuth from "../Hooks/useAuth";
import NoData from "../components/EmptyData/noData";
import AddressModal from "../components/Modal/AddressModal";

// Mock user data with additional details
const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  profilePic:
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

import { uploadProfilePic as uploadProfilePicApi } from "../utils/apis/authApi";
import { useUser } from "../store/Context/UserContext";
import Spinner from "../components/Loaders/Spinner";
import { useImagePreview } from "../store/Context/ImagePreviewContext";

const UserProfile = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({ ...mockUser });
  const [activeTab, setActiveTab] = useState("activity");
  const navigate = useNavigate();
  const { logoutStatusSuccess, userData, setUpdateUserData } = useAuth();
  const [user, setUser] = useState(userData);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const { openPreview } = useImagePreview();
  const fileInputRef = useRef(null);
  const { preview, setPreview, isUploading, setIsUploading } = useUser();

  const uploadProfilePic = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("profilePic", file);
    try {
      const response = await uploadProfilePicApi(formData);
      if (response.success) {
        toast.success(response.message || "Profile picture uploaded");
        setUser((prev) => ({ ...prev, profilePic: response.profilePic }));
        setUpdateUserData({ ...userData, profilePic: response.profilePic });
        setPreview(response.data.profilePic);
        setIsUploading(false);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error.response?.data?.message || "Failed to upload profile picture"
      );
      setPreview(user.profilePic);
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be under 2MB");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    uploadProfilePic(file);
  };

  console.log(userData);

  useEffect(() => {
    if (userData) {
      setUser(userData);

      if (userData.profilePic) {
        setPreview(userData.profilePic);
      }
    }
  }, [userData]);

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
    navigate("/nextChapter/orders");
  };

  const navigateToWishlist = () => {
    navigate("/nextChapter/wishlist");
  };

  const handleLogout = async () => {
    navigate("/nextChapter");

    setTimeout(() => {
      logoutStatusSuccess();
    }, 200);
  };

  return (
    <div className="min-h-screen relative bg-[#F5F1ED] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
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
          <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={navigateToOrders}
            >
              <Button className="flex items-center gap-1 text-nowrap px-4 py-2 bg-[#5C4C49] text-[#E8D9C5] rounded-lg shadow-md">
                <BagSvg />
                My Orders
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={navigateToWishlist}
            >
              <Button className="flex items-center gap-1 text-nowrap px-4 py-2 bg-[#D3BD9D] text-[#5C4C49] rounded-lg shadow-md">
                <HearthSvg />
                My Wishlist
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
            transition={{ duration: 0.2 }}
            className="w-full lg:w-1/3 bg-gradient-to-br from-[#E8D9C5] to-[#D3BD9D] rounded-2xl shadow-xl overflow-hidden h-fit border border-[#5C4C49]/10"
          >
            {/* Profile Header with Decorative Elements */}
            <DecorativeHeader />

            <div className="flex relative justify-center mt-[-4.8rem] ">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative w-32 h-32 rounded-full bg-[#5C4C49]"
              >
                <img
                  src={preview}
                  alt="Profile"
                  className="w-full cursor-pointer h-full border-4 border-orange-500 rounded-full shadow-lg"
                  onClick={() => openPreview(preview, "Profile Image")}
                />

                <img
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 bg-[#FFE6C1] border-2 border-[#5C4C49] p-[0.7px] z-30 w-8 h-8 rounded-full cursor-pointer duration-200 active:scale-75 top-[5rem]  -right-[0.5px]"
                  src="/images/camera.png"
                  alt="Upload"
                />

                {isUploading ? (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                    <Spinner size={36} />
                  </div>
                ) : (
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleFileChange(e)}
                  />
                )}
              </motion.div>
            </div>
            {/* Profile Content */}
            <div className="px-6 pt-2 pb-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 text-center"
              >
                <h2 className="text-2xl font-bold text-[#5C4C49]">
                  {user?.name}
                </h2>
                <p className="text-[#5C4C49]/80 flex items-center justify-center gap-1 mt-1">
                  <CalendarSvg />
                  <b>Member since</b> {user?.joinDate}
                </p>
              </motion.div>

              {/* Profile Details */}
              <div className="space-y-5">
                <ModernProfileDetail
                  icon={<MdOutlineMail className="text-[#5C4C49] text-xl" />}
                  label="Email"
                  value={user?.email}
                  delay={0.4}
                  isCopyable
                />
                <ModernProfileDetail
                  icon={<FiPhone className="text-[#5C4C49] text-lg" />}
                  label="Phone"
                  value={user?.phone}
                  delay={0.5}
                />
                <ModernProfileDetail
                  icon={<FaRegAddressCard className="text-[#5C4C49] text-lg" />}
                  label="Address"
                  //value={user?.address}
                  value={"None"}
                  setShowAddressModal={setShowAddressModal}
                  delay={0.6}
                />
                <ModernProfileDetail
                  icon={<FaRegHeart className="text-[#5C4C49] text-lg" />}
                  label="Favorite Genres"
                  value={user?.favoriteGenres?.join(", ")}
                  delay={0.7}
                />
              </div>

              <div className="flex items-center w-full gap-4 mt-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleEdit}
                  className="flex-1"
                >
                  {/* Edit Button */}
                  <Button
                    className="flex items-center w-full justify-center px-4 text-nowrap py-2 bg-[#5C4C49] text-[#E8D9C5] rounded-lg shadow-md"
                    type="button"
                  >
                    <PencilSvg />
                    Edit Profile
                  </Button>
                </motion.div>

                {/* Logout Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1"
                >
                  <Button
                    onClick={handleLogout}
                    className="flex items-center gap-1 w-full justify-center px-4 text-nowrap py-2 hover:bg-[#7e362a]/90 bg-[#7e362a] text-[#E8D9C5] rounded-lg shadow-md"
                    type="button"
                  >
                    <RiLogoutCircleLine />
                    Logout
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
          {/* Right Column */}
          <div className="flex-1 space-y-6">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <StatCard
                title="Orders"
                value={user?.orders}
                color="bg-[#5C4C49]"
                text="#E8D9C5"
                delay={0.2}
                icon={<BagSvg />}
                onClick={navigateToOrders}
              />
              <StatCard
                title="Wishlist"
                value={user?.wishlist}
                color="bg-[#D3BD9D]"
                text="#5C4C49"
                delay={0.2}
                icon={<HearthSvg />}
                onClick={navigateToWishlist}
              />
            </motion.div>

            {/* Desktop Tabs Navigation */}
            <div className="hidden md:flex border-b border-[#D3BD9D]">
              <motion.button
                onClick={() => setActiveTab("activity")}
                className={`px-4 py-2 text-nowrap text-[16px] relative ${activeTab === "activity"
                  ? "text-[#5C4C49] opacity-100 font-bold"
                  : "text-[#5C4C49] opacity-70 font-medium"
                  }`}
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
                className={`px-4 py-2 text-nowrap text-[16px] relative ${activeTab === "orders"
                  ? "text-[#5C4C49] opacity-100 font-bold"
                  : "text-[#5C4C49] opacity-70 font-medium"
                  }`}
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
                className={`px-4 py-2 text-nowrap text-[16px] relative ${activeTab === "wishlist"
                  ? "text-[#5C4C49] opacity-100 font-bold"
                  : "text-[#5C4C49] opacity-70 font-medium"
                  }`}
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
            <div className="bg-white rounded-3xl border-t border-[#D3BD9D] md:hidden flex justify-around py-2 z-50">
              <motion.button
                onClick={() => setActiveTab("activity")}
                className={`flex flex-col items-center p-2 w-full relative ${activeTab === "activity"
                  ? "text-[#5C4C49]"
                  : "text-[#5C4C49] opacity-70"
                  }`}
                whileTap={{ scale: 0.95 }}
              >
                <FaHistory className="w-5 h-5" />
                <span className="mt-1 text-xs">Activity</span>
                {activeTab === "activity" && (
                  <motion.div
                    className="absolute top-0 left-6 right-6 h-0.5 bg-[#5C4C49]"
                    layoutId="mobileUnderline"
                  />
                )}
              </motion.button>

              <motion.button
                onClick={() => setActiveTab("orders")}
                className={`flex flex-col items-center p-2 w-full relative ${activeTab === "orders"
                  ? "text-[#5C4C49]"
                  : "text-[#5C4C49] opacity-70"
                  }`}
                whileTap={{ scale: 0.95 }}
              >
                <FaShoppingBag className="w-5 h-5" />
                <span className="mt-1 text-xs">Orders</span>
                {activeTab === "orders" && (
                  <motion.div
                    className="absolute top-0 left-6 right-6 h-0.5 bg-[#5C4C49]"
                    layoutId="mobileUnderline"
                  />
                )}
              </motion.button>

              <motion.button
                onClick={() => setActiveTab("wishlist")}
                className={`flex flex-col items-center p-2 w-full relative ${activeTab === "wishlist"
                  ? "text-[#5C4C49]"
                  : "text-[#5C4C49] opacity-70"
                  }`}
                whileTap={{ scale: 0.95 }}
              >
                <FaHeart className="w-5 h-5" />
                <span className="mt-1 text-xs">Wishlist</span>
                {activeTab === "wishlist" && (
                  <motion.div
                    className="absolute top-0 left-6 right-6 h-0.5 bg-[#5C4C49]"
                    layoutId="mobileUnderline"
                  />
                )}
              </motion.button>
            </div>

            {/* Tab Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-white rounded-2xl"
            >
              {activeTab === "activity" && (
                <>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {mockUser?.recentOrders?.slice(0, 3).map((order, index) => (
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

                  {mockUser?.recentOrders?.length === 0 && (
                    <NoData
                      title="No Activity"
                      message="You have not made any recent activity."
                      icon="search"
                      showAction={true}
                      actionText="Browse Books"
                      actionLink="/nextChapter/books"
                    //onActionClick={toggleCart}
                    />
                  )}
                </>
              )}

              {activeTab === "orders" && (
                <>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {mockUser?.recentOrders.map((order, index) => (
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

                  {mockUser?.recentOrders?.length === 0 && (
                    <div className="">
                      <NoData
                        title="No Orders Found"
                        message="You have not placed any orders yet."
                        icon="cart"
                        showAction={true}
                        actionText="Explore More"
                        actionLink="/nextChapter/books"
                      //onActionClick={toggleCart}
                      />
                    </div>
                  )}
                </>
              )}

              {activeTab === "wishlist" && (
                <>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {mockUser?.wishlistItems?.map((item, index) => (
                      <ActivityItem
                        key={item.id}
                        title={`${item.title}`}
                        date={""}
                        description={`${item.title} by ${item.author}`}
                        status={""}
                        delay={""}
                        imageUrl={item.image}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-center">
                    {user?.wishlistItems?.length === 0 && (
                      <NoData
                        title="No favorites yet"
                        message="Start adding books to your favorites collection"
                        icon="heart"
                        showAction={true}
                        actionText="Browse Books"
                        actionLink="/nextChapter/books"
                      />
                    )}
                  </div>
                </>
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

      <AddressModal
        showAddress={showAddressModal}
        setShowAddress={setShowAddressModal}
      />
    </div>
  );
};

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
      <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full bg-opacity-30">
        {icon}
      </div>
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
            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${status === "Delivered"
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

        <div className="flex items-center justify-end mt-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=""
          >
            <div
              type="button"
              className=" bg-[#5C4C49] w-10 h-10 text-[#E8D9C5] rounded-[4rem] font-medium flex justify-center items-center"
            >
              <EyesSvg />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);
export default UserProfile;

const ModernProfileDetail = ({
  icon,
  label,
  value,
  setShowAddressModal,
  delay,
  isCopyable,
}) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-start gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm border border-[#5C4C49]/10"
  >
    <span className="text-xl text-[#5C4C49]">{icon}</span>
    <div className="flex-1">
      <p className="text-xs font-medium text-[#5C4C49]/70 uppercase tracking-wider">
        {label}
      </p>
      <div className="z-20 flex items-center justify-between w-full mt-1">
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
        {label === "Address" && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-[#5C4C49]/50 hover:text-[#5C4C49] transition-colors"
            title="Copy to clipboard"
          >
            <Button
              type="button"
              onClick={() => setShowAddressModal(true)}
              className="bg-[#5C4C49] h-7 text-[#E8D9C5] rounded-[7px] text-xs font-medium flex items-center"
            >
              Select Address
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  </motion.div>
);

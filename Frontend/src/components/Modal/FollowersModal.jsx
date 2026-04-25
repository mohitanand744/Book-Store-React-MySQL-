import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaTimes } from 'react-icons/fa';
import Button from '../Buttons/Button';
import ModalContainer from './ModalContainer';

const FollowersModal = ({ isOpen, onClose, followers }) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} loading={false}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full mx-auto"
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-coffee/20">
          <h3 className="text-xl font-bold text-coffee flex items-center gap-2">
            <FaUsers /> Followers
          </h3>
          <Button
            variant="ghost"
            onClick={onClose}
            className="!px-2 !py-2 text-coffee hover:bg-coffee/10 rounded-full transition-colors"
          >
            <FaTimes />
          </Button>
        </div>
        <div className="p-2 max-h-[300px] overflow-y-auto">
          {followers.map((follower) => (
            <div key={follower.id} className="flex items-center gap-3 p-3 hover:bg-coffee/10 rounded-2xl transition-colors cursor-pointer">
              <img src={follower.avatar} alt={follower.name} className="w-10 h-10 rounded-full object-cover border border-coffee/20" />
              <span className="font-semibold text-coffee text-sm">{follower.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </ModalContainer>
  );
};

export default FollowersModal;



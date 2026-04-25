import React from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import Button from '../Buttons/Button';
import Input from '../Inputs/Input';
import ModalContainer from './ModalContainer';

const MobileSubscribeModal = ({ isOpen, onClose, subscribeEmail, setSubscribeEmail, handleSubscribe }) => {
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
            <FaPaperPlane /> Subscribe
          </h3>
          <Button
            variant="ghost"
            onClick={onClose}
            className="!px-2 !py-2 text-coffee hover:bg-coffee/10 rounded-full transition-colors"
          >
            <FaTimes />
          </Button>
        </div>
        <div className="text-center text-coffee">
          <FaPaperPlane className="mx-auto mb-3 opacity-80" size={24} />
          <h3 className="font-bold text-lg mb-2">Subscribe to Blog</h3>
          <p className="text-xs opacity-80 mb-5 leading-relaxed">
            Get notified when new articles are published!
          </p>
          <div className="flex flex-col gap-3 text-left">
            <Input
              type="email"
              placeholder="Your email address"
              label="Email"
              labelClassName="text-tan"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              className="!rounded-full !text-coffee bg-tan/60 focus:bg-tan text-sepia border-coffee/30"
            />
            <Button
              onClick={() => {
                handleSubscribe();
                if (subscribeEmail) {
                  onClose();
                }
              }}
              variant="primary"
              className="w-full bg-gradient-to-r from-coffee  !text-tan font-bold text-sm !py-2.5 !rounded-full flex gap-3 justify-center items-center hover:opacity-90 transition-opacity shadow-sm"
            >
              Subscribe <FaPaperPlane className="text-tan/80" size={16} />
            </Button>
          </div>
        </div>
      </motion.div>
    </ModalContainer>
  );
};

export default MobileSubscribeModal;



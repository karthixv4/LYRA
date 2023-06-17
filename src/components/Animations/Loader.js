import React from 'react';
import { motion } from 'framer-motion';

const backDropVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
};

const loaderVariants = {
  visible: {
    x: [-20, 20],
    y: [0, -20],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1
      },
      y: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }
};

const Loader = ({ showLoader }) => {
    
  return (
    <>
    {showLoader && 
    <motion.div
    className="backdrop"
    variants={backDropVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.div className="loader" variants={loaderVariants} animate="visible" />
  </motion.div>
    }
      
    </>
  );
};

export default Loader;

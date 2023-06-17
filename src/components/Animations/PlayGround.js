import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
    y: [0, -30],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: 'easeOut'
      }
    }
  }
};

const buttonVariants={
    hover:{
      scale:1.2,
      textShadow:"0px 0px 8px rgb(255,255,255)",
      boxShadow:"0px 0px 8px rgb(255,255,255)",
      transition:{
        duration: 0.4,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }
  
  const containerVariants = {
    hidden:{
      opacity:0
    },
    visible:{
      opacity:1.0
    },
    exit:{
      x: '-100vw',
      transition:{ ease: 'easeInOut'}
    }
  }

const PlayGround = () => {
  return (
   
       <motion.div className="home container"
    variants={containerVariants}
    initial={"hidden"}
    animate={"visible"}
    exit={"exit"}
    >
      <h2>
        Welcome to Pizza Joint
      </h2>
      <Link to="/base">
        <motion.button
        variants={buttonVariants}
         whileHover={"hover"}
         >
          Create Your Pizza
        </motion.button>
      </Link>
    </motion.div>
   
  );
};

export default PlayGround;

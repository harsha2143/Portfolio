import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedSection = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up" // "up", "left", "right", "fade"
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Define different animation variants based on direction
  const getVariants = () => {
    switch (direction) {
      case "left":
        return {
          hidden: {
            opacity: 0,
            x: -100,
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.8,
              delay: delay,
              ease: [0.21, 0.47, 0.32, 0.98],
            },
          },
        };
      case "right":
        return {
          hidden: {
            opacity: 0,
            x: 100,
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.8,
              delay: delay,
              ease: [0.21, 0.47, 0.32, 0.98],
            },
          },
        };
      case "fade":
        return {
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.8,
              delay: delay,
              ease: [0.21, 0.47, 0.32, 0.98],
            },
          },
        };
      case "up":
      default:
        return {
          hidden: {
            opacity: 0,
            y: 50,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              delay: delay,
              ease: [0.21, 0.47, 0.32, 0.98],
            },
          },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Petal = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100;
  const randomRotate = Math.random() * 360;
  const randomDuration = 10 + Math.random() * 20;

  return (
    <motion.div
      initial={{ y: -100, x: `${randomX}vw`, rotate: 0, opacity: 0 }}
      animate={{
        y: '110vh',
        x: [`${randomX}vw`, `${randomX + (Math.random() * 20 - 10)}vw`, `${randomX}vw`],
        rotate: [0, randomRotate, randomRotate * 2],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear',
      }}
      className="fixed z-50 pointer-events-none"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-pink-200/40 fill-current"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </motion.div>
  );
};

export const FlowerPetals = () => {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    // Generate 15 petals with random delays
    const newPetals = Array.from({ length: 15 }, (_, i) => i * 2);
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden h-full w-full">
      {petals.map((delay, index) => (
        <Petal key={index} delay={delay} />
      ))}
    </div>
  );
};

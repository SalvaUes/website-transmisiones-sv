// src/components/FadeIn.tsx
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const FadeIn = ({ children }: Props) => {
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5, ease: "easeOut" }}
      // --- REFACTORIZACIÓN CLAVE ---
      // Le decimos que active la animación cuando el 20% del elemento sea visible.
      // Esto soluciona problemas en móviles.
      viewport={{ amount: 0.2 }} 
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
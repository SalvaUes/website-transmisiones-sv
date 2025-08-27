// src/components/FadeIn.tsx
import { motion } from "framer-motion";

// Definimos los tipos para las propiedades del componente
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
      // HEMOS QUITADO LA LÍNEA "viewport={{ once: true }}"
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
// import { motion } from "framer-motion";

// const Carousel = ({ images }) => {
//   return (
//     <motion.div
//       className="carousel"
//       drag="x"
//       dragConstraints={{ left: 0, right: 0 }}
//       initial={{ x: 0 }}
//       animate={{ x: `-${(images.length - 1) * 100}%` }}
//       transition={{
//         x: { repeat: Infinity, duration: 10, ease: "linear" },
//       }}
//     >
//       {images.map((image, i) => (
//         <img key={i} src={image} alt={`Image ${i}`} />
//       ))}
//     </motion.div>
//   );
// };

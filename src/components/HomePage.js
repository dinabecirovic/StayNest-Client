import React from "react";
import { motion } from "framer-motion";
import "./styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero sekcija */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Dobrodošli u Stay Nest</h1>
        <p>Pronađite savršen bungalov za vaše putovanje.</p>
        <motion.button
          className="hero-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Rezerviši sada
        </motion.button>
      </motion.div>

      {/* Sekcija kategorija */}
      <div className="categories">
        <h2>Istražite naše bungalove</h2>
        <div className="category-grid">
          <motion.div className="category-card" whileHover={{ scale: 1.05 }}>
            <img src="/images/1.jpg" alt="Luxury Bungalow" />
            <h3>Luxury Bungalovi</h3>
          </motion.div>
          <motion.div className="category-card" whileHover={{ scale: 1.05 }}>
            <img src="/images/2.jpg" alt="Beach Bungalow" />
            <h3>Beach Bungalovi</h3>
          </motion.div>
          <motion.div className="category-card" whileHover={{ scale: 1.05 }}>
            <img src="/images/1.jpg" alt="Mountain Bungalow" />
            <h3>Planinski Bungalovi</h3>
          </motion.div>
        </div>
      </div>

      {/* Sekcija sa recenzijama */}
      <div className="testimonials">
        <h2>Šta naši korisnici kažu?</h2>
        <motion.div
          className="testimonial-card"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p>"Savršeno mesto za odmor! Preporučujem svima."</p>
          <span>- Ana J.</span>
        </motion.div>
        <motion.div
          className="testimonial-card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p>"Bungalov na plaži je bio neverovatan! Definitivno se vraćam."</p>
          <span>- Marko B.</span>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>© 2025 Stay Nest. Sva prava zadržana.</p>
      </div>
    </div>
  );
};

export default HomePage;

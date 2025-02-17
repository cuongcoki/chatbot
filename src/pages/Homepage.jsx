import React from "react";
import styles from "../style";
import Chat from "../components/Chat";
import Chathistory from "../components/Chathistory";
import Inforexam from "../components/Inforexam";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Homepage = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />

          <div className="flex flex-col md:flex-row items-start justify-between border-orange-300 py-2 border-r-4 border-l-4">
            <div className="w-full md:w-[25%] mb-4 md:mb-0">
              <Chathistory />
            </div>

            <div className="w-full md:w-[50%]">
              <Chat />
            </div>

            <div className="w-full md:w-[25%] mt-4 md:mt-0">
              <Inforexam />
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Homepage;

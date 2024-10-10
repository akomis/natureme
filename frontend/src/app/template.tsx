"use client";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackgroundFlowers from "../components/BackgroundFlowers";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-jasmine">
      <BackgroundFlowers />
      <div>{children}</div>

      <ToastContainer
        position="bottom-center"
        autoClose={3500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
        transition={Bounce}
        limit={1}
      />
    </div>
  );
}

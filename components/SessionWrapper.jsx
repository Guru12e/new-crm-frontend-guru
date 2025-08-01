"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const SessionWrapper = ({ children }) => {
  return (
    <SessionProvider>
      {children}
      <ToastContainer />
    </SessionProvider>
  );
};

export default SessionWrapper;

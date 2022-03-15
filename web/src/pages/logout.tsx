import { useRouter } from "next/router";
import React, { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/api/auth/logout");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
};

export default LogoutPage;

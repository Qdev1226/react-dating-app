import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { createMail } from "../redux/actions/mailActions";
import { logout } from "../redux/actions/userActions";
import SubmitLoader from "../layout/loading/SubmitLoader";

// eslint-disable-next-line react/prop-types
const Profile = ({ user }) => {
  const [browserInfo, setBrowserInfo] = useState(null);
  const [ipInfo, setIpInfo] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { logoutLoading, isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  const url = import.meta.env.VITE_BASE_URL;

  const fetchIpApi = async () => {
    await axios
      .get(`${url}/api/ip/api`)
      .then((response) => {
        setIpInfo(response.data.info);
      })
      .catch((error) => {
        console.error("Error fetching IP info:", error);
      });
  };

  const getBrowserName = (userAgent) => {
    if (/opera|opr/i.test(userAgent)) return "Opera";
    if (/chrome|crios/i.test(userAgent)) return "Chrome";
    if (/firefox|fxios/i.test(userAgent)) return "Firefox";
    if (/safari/i.test(userAgent)) return "Safari";
    if (/edge|edg|edgi/i.test(userAgent)) return "Edge";
    if (/ie|trident/i.test(userAgent)) return "Internet Explorer";
    return "Unknown";
  };

  const getOSName = (userAgent) => {
    if (/windows|win/i.test(userAgent)) return "Windows";
    if (/iphone/i.test(userAgent)) return "iOS";
    if (/ipad/i.test(userAgent)) return "iOS";
    if (/mac/i.test(userAgent)) return "macOS";
    if (/android/i.test(userAgent)) return "Android";
    if (/linux/i.test(userAgent)) return "Linux";
    return "Unknown";
  };

  function getReferralURL() {
    return document.referrer;
  }

  useEffect(() => {
    if (!ipInfo?.ip) {
      fetchIpApi();
    }

    if (!isAuthenticated) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("hello2");
    console.log(ipInfo);
    const userAgent = window.navigator.userAgent;
    const browserName = getBrowserName(userAgent);
    const osName = getOSName(userAgent);
    const referralURL = getReferralURL();
    setBrowserInfo({ browserName, osName, referralURL });
    if (ipInfo) {
      console.log("hello");
      console.log(ipInfo);
      // dispatch(
      //   createMail({
      //     // eslint-disable-next-line react/prop-types
      //     name: user.displayName || user.email,
      //     // eslint-disable-next-line react/prop-types
      //     email: user.email,
      //     subject: `New visitor from ${ipInfo?.country_name}`,
      //     message: `Location: ${ipInfo?.city}, ${ipInfo?.region}, ${ipInfo?.country_name}, Operating System: ${browserInfo?.osName}, Browser: ${browserInfo?.browserName}, Address: ${ipInfo?.ip}, Referral URL: ${browserInfo?.referralURL}`,
      //     receiverEmail: "iamshiv20032003@gmail.com",
      //   })
      // );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipInfo]);

  return (
    <>
      {logoutLoading && <SubmitLoader />}
      <div>
        {/* eslint-disable-next-line react/prop-types */}
        <p>Name: {user?.fullName}</p>
        <p>Your IP Address: {ipInfo?.ip}</p>
        <p>
          Your Location: {ipInfo?.city}, {ipInfo?.region},{" "}
          {ipInfo?.country_name}
        </p>
        <p>Browser: {browserInfo?.browserName}</p>
        <p>Operating System: {browserInfo?.osName}</p>
        <p>Referral URL: {browserInfo?.referralURL}</p>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Profile;

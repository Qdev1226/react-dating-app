// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBrowserName, getOSName } from "../../utils/IpInfo";
import { createMail } from "../../redux/actions/mailActions";
import axios from "axios";

const NewVisitor = () => {
  const [browserInfo, setBrowserInfo] = useState(null);
  const [ipInfo, setIpInfo] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

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

  function getReferralURL() {
    return document.referrer;
  }

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
    }

    if (!ipInfo?.ip) {
      fetchIpApi();
    }

    const userAgent = window.navigator.userAgent;
    let browserName;
    let osName;
    let referralURL;
    if (!browserInfo?.browserName) browserName = getBrowserName(userAgent);
    if (!browserInfo?.osName) osName = getOSName(userAgent);
    if (!browserInfo?.referralURL) referralURL = getReferralURL() || "none";
    console.log(browserName, osName, referralURL);
    if (!browserName || !osName || !referralURL) {
      setBrowserInfo({ browserName, osName, referralURL });
    }

    console.log("hello2");
    console.log(ipInfo);
    if (ipInfo) {
      dispatch(
        createMail({
          name: user.fullName,
          subject: `New visitor from ${ipInfo?.country_name}`,
          message: `Location: ${ipInfo?.city}, ${ipInfo?.region}, ${ipInfo?.country_name}, Operating System: ${browserInfo?.osName}, Browser: ${browserInfo?.browserName}, Address: ${ipInfo?.ip}, Referral URL: ${browserInfo?.referralURL}`,
        })
      );
    }
  }, [isAuthenticated, navigate, ipInfo, browserInfo, user, dispatch]);
};

export default NewVisitor;

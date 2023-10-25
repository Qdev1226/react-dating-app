import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/loading/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/actions/userActions";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ Component }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userLoading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    // Use a separate useEffect to handle navigation after rendering.
    if (!userLoading && isAuthenticated) {
      navigate("/");
    }
  }, [userLoading, isAuthenticated, navigate]);

  return userLoading || isAuthenticated ? <Loader /> : <Component />;
};

export default AuthRoute;

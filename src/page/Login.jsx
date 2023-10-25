import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import { login } from "../redux/actions/userActions";
import SubmitLoader from "../layout/loading/SubmitLoader";
import LeftContainer from "../components/authComponents/LeftContainer";
import InputElement from "../components/formElements/InputElement";

const Login = () => {
  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  // Handle Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((previous) => ({ ...previous, [name]: value }));
  };

  // Submit form
  const onLogin = (e) => {
    e.preventDefault();

    const { userName, password } = loginData;
    if (!userName || !password) {
      return alert("Please fill all required fields");
    }

    dispatch(login({ userName, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {/* Submit Loader */}
      {loading && <SubmitLoader />}
      <Container>
        <LeftContainer />
        <RightContainer>
          <LeftBg
            className=''
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
            }}
          >
            <LeftBgShadow />
          </LeftBg>
          <div className='w-full py-6 z-20'>
            <h1 className='text-4xl font-bold'>React Dating App</h1>

            <Form onSubmit={onLogin}>
              {/* User Name */}
              <InputElement
                handleChange={handleChange}
                type='text'
                name='userName'
                id='userName'
                placeholder='User Name'
                required={true}
              />
              {/* Password */}
              <InputElement
                handleChange={handleChange}
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                required={true}
              />
              {/* Signup link */}
              <div className='my-2 flex justify-between'>
                <p className='text-gray-400'>Don&apos;t have an account?</p>
                <NavLink
                  className='hover:underline text-blue-50 hover:text-blue-100'
                  to='/signup'
                >
                  Create Account
                </NavLink>
              </div>
              {/* Login button */}
              <div className='px-4 pb-2 pt-4'>
                <LoginButton disabled={loading} type='submit'>
                  {loading ? "Sending..." : "log in"}
                </LoginButton>
              </div>
            </Form>
          </div>
        </RightContainer>
      </Container>
    </>
  );
};

const Container = tw.div`
    min-h-screen
    flex 
    items-stretch 
    text-white
`;

const RightContainer = tw.div`
    lg:w-1/2
    w-full flex
    items-center
    justify-center
    text-center
    md:px-16
    px-0
    z-0
    bg-[#161616]
`;

const LeftBg = tw.div`
    absolute
    lg:hidden
    z-10
    inset-0
    bg-gray-500
    bg-no-repeat
    bg-cover
    items-center
`;

const LeftBgShadow = tw.div`
    absolute 
    bg-black 
    opacity-60 
    inset-0 z-0
`;

const Form = tw.form`
    sm:w-2/3 
    w-full 
    px-4 
    lg:px-0 
    mx-auto
`;

const LoginButton = tw.button`
    uppercase 
    block 
    w-full 
    p-4 
    text-lg 
    rounded-full 
    bg-indigo-500 
    hover:bg-indigo-600 
    focus:outline-none
`;

export default Login;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
   //instead of making multiple states of names, password, email, we have created formData as a object and later we are getting values from that
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

   const navigate = useNavigate();
   const dispatch = useDispatch();

   //Destructuring fields from formData
   const { email, password } = formData;

   const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
   );

   useEffect(() => {
      if (isError) {
         toast.error(message);
      }

      //Redirect when logged in
      if (isSuccess || user) {
         navigate("/");
      }

      dispatch(reset);
   }, [isError, isSuccess, user, message, navigate, dispatchEvent]);

   const onChange = (e) => {
      setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
   };

   const onSubmit = (e) => {
      e.preventDefault();

      const userData = {
         email,
         password,
      };

      dispatch(login(userData));
   };

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <>
         <section className='heading'>
            <h1>
               <FaSignInAlt /> Login
            </h1>
            <p>Please Login to get Support</p>
         </section>

         <section className='form'>
            <form onSubmit={onSubmit}>
               <div className='form-group'>
                  <input
                     type='email'
                     className='form-control'
                     id='email'
                     name='email'
                     value={email}
                     onChange={onChange}
                     placeholder='Enter Your Email'
                     required
                  />
               </div>
               <div className='form-group'>
                  <input
                     type='password'
                     className='form-control'
                     id='password'
                     name='password'
                     value={password}
                     onChange={onChange}
                     placeholder='Enter Your Password'
                     required
                  />
               </div>
               <div className='form-group'>
                  <button className='btn btn-block'>Submit</button>
               </div>
            </form>
         </section>
      </>
   );
}
export default Login;

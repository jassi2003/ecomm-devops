import React from 'react';
import { useState, useContext } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import summaryApi from '../common/Index.jsx';
import Context from '../context/index.js';



const Login = () => {
  const navigate = useNavigate();
  const { fetchUserDetails, fetchCountProductsInCart } = useContext(Context)

  // console.log("generalContext",generalContext.fetch)

  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  console.log("data login", data)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(summaryApi.login.url, {
      method: summaryApi.login.method,
      credentials: 'include',

      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    console.log("datares", dataResponse);

    const dataApi = await dataResponse.json()
    console.log("dataapi", dataApi);


    // if(dataApi.success){
    //   toast.success(dataApi.message)
    //   navigate("/")
    // }
    // or you can also use below snippet
    if (dataResponse.status == 200) {
      toast.success(dataApi.message)
      navigate("/")
      fetchUserDetails()
      fetchCountProductsInCart()
    }

    if (dataApi.error) {
      toast.error(dataApi.message)
    }
  }

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white rounded-md flex flex-col items-center justify-center p-2 py-5 w-full max-w-md mx-auto'>
          <div className='flex items-center justify-center h-40 w-40 rounded-md overflow-hidden  bg-gray-100 '>
            <img
              className='h-full w-full object-cover'
              src="https://cdn-icons-gif.flaticon.com/8717/8717908.gif"
              alt=""
            />
          </div>
          <form action="" onSubmit={handleSubmit} className='flex flex-col items-center'>
            <div className="grid">
              <label htmlFor="">Email:</label>
              <div className='bg-slate-200'>
                <input className='outline-none bg-transparent py-2 px-8'
                  type="email"
                  placeholder="enter email"
                  name='email'
                  required

                  value={data.email}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="grid mt-4">
              <label htmlFor="">Password:</label>
              <div className='flex relative'>
                <input className='outline-none bg-slate-200 py-2 px-8'
                  type={showPassword ? "password" : "text"}
                  placeholder="enter password"
                  name='password'
                  required
                  value={data.password}
                  onChange={handleOnChange}
                />
                <div className="cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? (
                    <FaEyeSlash className='absolute right-2 top-3' />
                  ) :
                    (
                      <FaEye className='absolute right-2 top-3' />

                    )
                  }
                </div>
              </div>
              <div className='ml-auto text-s hover:underline hover:text-red-600'>
                <Link to={'/forgot-password'}>forgot password</Link>
              </div>
            </div>
            <div className='mt-4'>
              <button type="submit" className='bg-green-600 text-white px-4 py-2 rounded-full  hover:scale-110 transition-all mt-5'>Login</button>
            </div>
          </form>
          <p className="">Don't have a account?<Link to={"/signup"} className='hover:text-red-600'>Signup</Link></p>
        </div>
      </div>
    </section>
  );
}

export default Login;

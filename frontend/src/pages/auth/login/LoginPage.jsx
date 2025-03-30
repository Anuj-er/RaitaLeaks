import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';
import Xsvg from '../../../components/svgs/X';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { fetchApi } from '../../../utils/apiConfig';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginMutation, isError, isPending, error } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetchApi("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password })
        });

        // Try to safely parse the JSON response
        let data;
        try {
          data = await res.json();
        } catch (jsonError) {
          console.error("JSON parse error:", jsonError);
          throw new Error("Server returned invalid response. Please try again.");
        }

        if (!res.ok) {
          throw new Error(data.error || "Invalid username or password");
        }

        // Return the data so it's available in onSuccess
        return data;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      // Show success message
      toast.success("Logged in successfully!");

      // Update auth state
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      // Redirect to home or dashboard
      navigate("/");
    },
    retry: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.password) {
      toast.error("Please enter both username and password");
      return;
    }

    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='loginContainer'>
      <div className='loginContainer__illustration'>
        <Xsvg
          className='illustration-icon'
          style={{ width: '500px', height: '500px' }}
        />
      </div>
      <div className='loginContainer__form-container'>
        <form className='loginContainer__form-container__form' onSubmit={handleSubmit}>
          <h1 className='loginContainer__form-container__form__header'>Let's go.</h1>
          <div className='loginContainer__form-container__form__inputs'>
            <label>
              <FaUser className='icon' />
              <input
                type="text"
                placeholder='Username'
                name='username'
                onChange={handleInputChange}
                value={formData.username}
              />
            </label>
            <label>
              <MdPassword className='icon' />
              <input
                type="password"
                placeholder='Password'
                name='password'
                onChange={handleInputChange}
                value={formData.password}
              />
            </label>
            <button type="submit" disabled={isPending}>
              {isPending ? "Loading..." : "Login"}
            </button>
            {isError && <p className='error'>{error.message}</p>}
          </div>
        </form>
        <div className='loginContainer__form-container__login'>
          <p className='loginContainer__form-container__login__login-text'>Don't have an account?</p>
          <Link to='/signup'>
            <button>Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage
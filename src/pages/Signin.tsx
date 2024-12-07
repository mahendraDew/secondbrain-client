import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ApiRoutes } from '@/utils/routeAPI';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  // Add other fields as needed
}

interface SignInProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}


export default function SignIn({ setUser }: SignInProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  async function onSubmit(e:  React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    let newErrors: { [key: string]: string } = {};
    // Basic validation.
    if (!username || !password) {
      newErrors.form = 'Please fill in both email and password.';
      return;
    }

    // Form validation
    if (!username.trim()) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }



    try {
      // Replace with your API endpoint for login.
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }

      const body = JSON.stringify({ username, password });
      const res = await axios.post(ApiRoutes.signin, body, config);
      // console.log(res);
      // console.log("debugginggggg")
      if(res.status == 400){
        newErrors.form = 'Invalid email or password.';
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }
      const data = await res.data;
      // console.log(data);
      if (res.status == 200) {
        // Handle successful sign-in, e.g., store tokens and redirect.
        // You might want to store a token or user data in localStorage or context.
        localStorage.setItem('token', data.token); // Example: storing JWT token.
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user); // Update the user state in App
        navigate('/home'); // Adjust the redirect as needed.
      } else {
        console.log("else in signin")
        newErrors.form = data.message || 'Invalid email or password.';
        setErrors(newErrors);
        setIsLoading(false);
        return;
        
      }

    } catch (error) {
      console.log("error in signin")
      setIsLoading(false);
      newErrors.username = 'Oops! seems like your email or password is incorrect. Please try it again.';
      setErrors(newErrors);
    }
  }

  return (
    <div className="container min-h-screen flex flex-col justify-center items-center  lg:max-w-none lg:px-0">

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-tr  from-purple-300/80 to-white/90 bg-clip-text text-transparent">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">username</Label>
                  <Input
                    id="email"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}

                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}
                <Button type='submit' className="bg-[#5E43EC] hover:bg-[#4930c9] text-gray-100" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In
                </Button>
              </div>
            </form>
           
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By signing-in, you are agreeing to our{" "}
            <a href="/tos" className="hover:text-brand hover:text-gray-200 underline underline-offset-4">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="hover:text-brand hover:text-gray-200 underline underline-offset-4">
              Privacy Policy
            </a>
            .
          </p>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <a
              href="/signup"
              className="hover:text-brand hover:text-gray-200 underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
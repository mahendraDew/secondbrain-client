import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ApiRoutes } from '../utils/routeAPI';
import axios from 'axios';


export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    console.log({username, email, password});

     // Form validation
     let newErrors: {[key: string]: string} = {};
     if (!username.trim()) newErrors.username = "Username is required";
     if (!email.trim()) newErrors.email = "Email is required";
     if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
     if (!password) newErrors.password = "Password is required";
     if (password.length < 8) newErrors.password = "Password must be at least 8 characters";

     if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // console.log("signup form data: ", username, email, password)

    try {
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      const body = JSON.stringify({username, email, password});
      const res = await axios.post(ApiRoutes.signup, body, config);
      console.log(res);
      if(res.status == 200){
        // todo: add otpverification route here
        navigate('/signin')
      }else {
        newErrors.email = 'Email Already exists try login in.';
      }
      
      
    } catch (error) {
      newErrors.email = "Email already exists try loggin in with this email. Or use different email!";
      console.log(errors);
    }
  }

  return (
    <div className="container min-h-screen flex flex-col justify-center items-center  lg:max-w-none lg:px-0">
     
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-tr  from-purple-300/80 to-white/90 bg-clip-text text-transparent">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Username</Label>
                  <Input
                    id="username"
                    placeholder="user123"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
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
                <Button className="bg-[#5E43EC] hover:bg-[#4930c9] text-gray-100" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign Up
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>              
              <IconBrandGoogleFilled className=" h-4 w-4" />
              Google
            </Button>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a href="/tos" className="hover:text-brand underline underline-offset-4">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="hover:text-brand underline underline-offset-4">
              Privacy Policy
            </a>
            .
          </p>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <a
              href="/signin"
              className="hover:text-brand underline underline-offset-4"
            >
              Already have an account? Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
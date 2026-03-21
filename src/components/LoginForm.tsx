import Spinner from "./Spinner";
import { useLogin } from "@/app/hooks/useLogin";
import GoogleLogo from '@/assets/b-google.png'
import Image from "next/image";

const LoginForm = () => {
  
  const { dispatch, identifier, password, loading, error, handleLogin, signIn, setIdentifier, setPassword } = useLogin();
  
  return (
     <form onSubmit={handleLogin} className="flex flex-col gap-8 flex-1">
      <div className="flex flex-col gap-2">
        <label className="text-stone-600 tracking-[1px] text-sm">
          username / email
        </label>
        <input
          type="text"
          required
          value={identifier}
          disabled={loading}
          onChange={(e) => dispatch(setIdentifier(e.target.value))}
          className="border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-stone-600 tracking-[1px] text-sm">
          password
        </label>
        <input
          type="password"
          required
          value={password}
          disabled={loading}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          className="border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      <p className="text-red-500 h-2 text-center">{error}</p>
      {!loading ? 
        <>
          <button
            type="submit"
            disabled={loading}
            className="py-5 rounded-full text-center text-stone-100 text-xl tracking-[2px] shadow-xl/20 w-[60%] mx-auto bg-sky-600 hover:bg-sky-500 cursor-pointer"
          >
            sign in
          </button>
          <div className="w-full h-px bg-stone-300"></div>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/account" })}
            disabled={loading}
            className="py-5 rounded-full flex items-center justify-center gap-3 text-center text-stone-100 text-xl tracking-[2px] shadow-xl/20 w-[60%] mx-auto bg-stone-700 hover:bg-stone-600 cursor-pointer"
          >
            {loading ? 
              "loading..." 
            :
            (<>
              <Image src={GoogleLogo} alt="Google" width={24} height={24} />
              <span>sign in / sign up</span>
            </>)}
          </button>
        </>
        :
        <Spinner />
      }
    </form>
  )
};

export default LoginForm;
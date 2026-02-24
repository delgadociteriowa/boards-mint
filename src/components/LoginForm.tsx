import Spinner from "./Spinner";
import { useLogin } from "@/app/hooks/useLogin";

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
            login
          </button>
          <div className="w-full h-px bg-stone-300"></div>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/account" })}
            disabled={loading}
            className="py-5 rounded-full text-center text-stone-100 text-xl tracking-[2px] shadow-xl/20 w-[60%] mx-auto bg-sky-600 hover:bg-sky-500 cursor-pointer"
          >
            {loading ? "loading..." : "sign up with Google"}
          </button>
        </>
        :
        <Spinner />
      }
    </form>
  )
};

export default LoginForm;
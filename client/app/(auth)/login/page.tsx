"use client"
import { Input } from "@/components/input/input"

const Page = () => {
    // TODO: ajouter des espaces entre les inputs, le bouton, les liens et le titre
    return (
        <div className="w-full max-w-[400px]">

            <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Enter you credentials to connect to your account.

                </p>
            </div>

            <div className="mt-5">

                {/* <!-- Form --> */}
                <form autoComplete="off">
                    <div className="grid gap-y-4">

                        <Input type="email" placeholder="Enter your email" />
                        <Input type="password" placeholder="Enter your password" />

                        <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Sign in</button>
                    </div>
                </form>
                {/* <!-- End Form --> */}
                <div className="text-center">

                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account yet?
                        <a className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="../examples/html/signup.html">
                            Sign up here
                        </a>
                    </p>
                </div>
            </div>
        </div>


    )
}

export default Page
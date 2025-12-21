import { SignUp as ClerkSignUp } from "@clerk/clerk-react";

function SignUp() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                        Start Your Journey
                    </h2>
                    <p className="text-gray-600">
                        Create an account to discover your ideal career path
                    </p>
                </div>
                <div className="flex justify-center">
                    <ClerkSignUp
                        routing="path"
                        path="/sign-up"
                        signInUrl="/sign-in"
                        afterSignUpUrl="/profile"
                    />
                </div>
            </div>
        </div>
    );
}

export default SignUp;

'use server'
import { signIn } from "@/auth";

export async function doCredentialLogin(formData:{email: string, password: string}) {
  console.log("formData", formData);

  try {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
      console.log("response", response);

    return response;
  } catch (err: unknown) { // Change type from any to unknown
        if (err instanceof Error) { // Check if err is an instance of Error
            console.error(`Error during sign-in: ${err.message}`); // Log the error with a custom message
        } else {
            console.error('An unknown error occurred'); // Handle unexpected error types
        }
    // throw err;
  }
}

import RegisterScreen from "@/src/modules/auth/presentation/view/screens/register-screen"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Register - ServisLah Admin',
    description: 'Create a new account',
};

export default function RegisterPage() {
    return <RegisterScreen />
}
import { useAuthActions } from '@convex-dev/auth/react'
import { Authenticated, Unauthenticated, useQuery } from 'convex/react'
import React from 'react'
import { api } from "../convex/_generated/api";

export default function Test() {
    const { signIn } = useAuthActions();
    const currentTeacher = useQuery(api.teachers.queries.getCurrentTeacher)

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await signIn("password", formData);
    }
    return (
        <>
            <Unauthenticated>
                <div>Inicia Sesion</div>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='username' placeholder='Usuario...' />
                    <input type='text' name='password' placeholder='Contraseña...' />
                    <input type='hidden' name='flow' value='signIn' />
                    <button
                        type="submit"
                        className="w-full group relative flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-300 shadow-lg shadow-red-900/20"
                    >
                        Ingresar
                    </button>
                </form>
            </Unauthenticated>

            <Authenticated>
                {currentTeacher && <p>{currentTeacher.name}</p>}
            </Authenticated>

        </>
    )
}

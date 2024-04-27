import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";

function RegisterPage() {
    const { register, handleSubmit } = useForm()
    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            <form onSubmit={handleSubmit(async (values) => {
                console.log(values);
                const res = await registerRequest(values)
                console.log(res)
            })}>
                <input
                    type="text"
                    {...register('name', { required: true, trim: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Nombre Completo" />

                <input type="email"
                    {...register('email', { required: true, trim: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Correo Electrónico" />

                <input
                    type="password"
                    {...register('password', { required: true, trim: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Contraseña" />

                <button type="submit"
                    className="text-white">
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterPage;
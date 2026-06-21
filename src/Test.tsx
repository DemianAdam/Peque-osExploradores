import { useOutletContext } from "react-router"
import { Teacher } from "../convex/teachers/types";

export default function Test() {
    const teacher = useOutletContext<Teacher>();

    return (
        <>
            <p>{teacher.name}</p>
        </>
    )
}

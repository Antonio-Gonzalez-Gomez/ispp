import { LoginForm } from "../../components/LoginForm"
import { Card } from "../../components/Card"
export function Login() {
    return (

        <>
            <Card title="Iniciar Sesión" component={<LoginForm />}>
            </Card>
        </>
    )
}
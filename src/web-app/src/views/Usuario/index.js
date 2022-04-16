import { UserDetails } from '../../components/UserDetails';
import { Nombre } from '../../components/Nombre';
import fotoPerfil from '../../static/Foto-Perfil.jpg'
import { Header } from "../../components/Header"

export function Usuario() {
    const name = sessionStorage.getItem("userName")
    const email = sessionStorage.getItem("userEmail")
    const phone = sessionStorage.getItem("userPhone")
    return (
        <>
            <Header />
            <Nombre className="font-josefin-sans" name={name} ></Nombre>
            <UserDetails className="font-josefin-sans" image={fotoPerfil} email={email} phone={phone}  ></UserDetails>

        </>



    )
}
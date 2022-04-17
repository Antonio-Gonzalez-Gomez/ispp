import * as React from 'react';
import { useState, useEffect } from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link, useLocation } from 'wouter'
import { postData } from '../../services/common/common';


export function UserDetails({ image, email, phone }) {
  const [locationPath, locationPush] = useLocation()

  async function handleClick() {

    const url = "https://nailingtest.herokuapp.com/logout"

    const body = {
      "id": sessionStorage.getItem("userId"),
      "usuario": sessionStorage.getItem("userName"),
      "contrasenya": sessionStorage.getItem("userPassword"),
      "email": sessionStorage.getItem("userEmail"),
      "telefono": sessionStorage.getItem("userPhone"),
      "rol": sessionStorage.getItem("userRole")
    }

    console.log(body)

    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa(sessionStorage.getItem("userName") + ":" + sessionStorage.getItem("userPassword"))
    }


    await postData(url, body, headers)
      .then(function (data) {


      }
        //Tiene que ir al catch porque devuelve 204 y lo pilla como error
      ).catch((error) => {
        sessionStorage.setItem("userId", "")
        sessionStorage.setItem("userName", "")
        sessionStorage.setItem("userPassword", "")
        sessionStorage.setItem("userEmail", "")
        sessionStorage.setItem("userRole", "")
        sessionStorage.setItem("userPhone", "")
        sessionStorage.setItem("isLogged", false)
        sessionStorage.setItem("userCenter", "")

        locationPush('/')
      }
      );
  }
  const centro = sessionStorage.getItem("userCenter")
  const isAdmin = sessionStorage.getItem("userRole") === 'ADMIN'
  let pagado = null
  let restantesPositivo = null
  const [resObj, setObj] = useState([])
  const url = "https://nailingtest.herokuapp.com/centros/show/"+centro;
  const xhr = new XMLHttpRequest()
  useEffect(() => {
    xhr.open('get', url)
    xhr.send()
    xhr.onload = function () {
      if (this.status === 200) {
        try {
          setObj(JSON.parse(this.responseText))
          console.log('Petición Rest exitosa')
        } catch (e) {
          console.warn('Excepción capturada en la petición REST')
          sessionStorage.setItem(e)
          locationPush('/error')
        }
      } else {
        console.warn('Error en la petición REST')
        sessionStorage.setItem("La API Rest (" + url + ") ha devuelto el error " + this.status)
        locationPush('/error')
      }
    }
  }, [])
  if (centro != ""){
    restantesPositivo = resObj.creditosrestantes>=0
    pagado = resObj.pagado
  }

  return (
    <Card style={{ backgroundColor: 'rgb(248, 225, 228)' }} sx={{ minWidth: 275 }}>
      <CardContent>
        <div className="flex items-center">
          <img src={image} alt="img" className="w-52 aspect-square rounded-md shadow-md max-w-full float-left bg-white" />
          <div className="ml-5 items-center">
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Teléfono:</strong> {phone}</p>
            <div className='text-xl text-left hover:underline'>
              <Link className="text-xl text-pink-400" to='/usuario/edit'>Editar mis datos</Link>
            </div>

          </div>
        </div>
      </CardContent>
      <CardActions>
        <button onClick={() => locationPush('/miscitas')} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Mis reservas</button>
      </CardActions>
      {centro === "" && !isAdmin ?
      <CardActions>
      <button onClick={() => locationPush('/centroadd')} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Añadir centro</button>
      </CardActions>
      :
      <></>
      }
      
      <CardActions>
        <button onClick={handleClick} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Cerrar Sesión</button>
      </CardActions>
      {centro !== "" ?
      <CardActions>
        <button onClick={() => locationPush('/servicios')} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Servicios de centro</button>
      </CardActions>
      :
      <></>
      }
      {restantesPositivo==false ?
      <CardActions>
        <button onClick={() => locationPush('/servicios')} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Pagar créditos atrasados</button>
      </CardActions>
      :
      <></>
      }{pagado==false && restantesPositivo==true ?
      <CardActions>
        <button onClick={() => locationPush('/servicios')} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Pagar suscripción</button>
      </CardActions>
      :
      <></>
      }
    </Card>

  );
}
import React, { useState, useEffect } from 'react';
import { CenterDetails } from '../../components/CenterDetails';
import { Nombre } from '../../components/Nombre';
import { Header } from "../../components/Header"
import { useLocation } from 'wouter'

export function Centro({ params }) {

    const { id } = params
    const url = "https://nailingtest.herokuapp.com/centros/details/"+id;
    const xhr = new XMLHttpRequest()
    const [resObj, setObj] = useState([])
    const [locationPath, locationPush] = useLocation()
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

    return (
        <>
            <Header />
            <Nombre name={resObj.nombre} ></Nombre>
            <CenterDetails name={resObj.nombre} image={resObj.imagen} provincia={resObj.provincia} rating={'3'}  ></CenterDetails>

        </>
    )
}
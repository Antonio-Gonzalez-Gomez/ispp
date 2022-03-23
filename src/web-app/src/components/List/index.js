import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'wouter'

// Images será al fin y al cabo lo que consumamos de la api, para eso usaremos Axios, ver componente ApiConsum
// npm install @mui/material @emotion/react @emotion/styled
export function List ({ provincia }) {
  // const url = 'https://my.api.mockaroo.com/centros.json?key=64324960'
  const url = 'https://my.api.mockaroo.com/centros.json?key=86580d70'
  const xhr = new XMLHttpRequest()
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15
      },
      '& .MuiImageMarked-root': {
        opacity: 0
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor'
      }
    }
  }))

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  })

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  }))

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  }))

  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }))

  const [resObj, setObj] = useState([])

  useEffect(() => {
    xhr.open('get', url)
    xhr.send()
    xhr.onload = function () {
      if (this.status === 200) {
        try {
          setObj(JSON.parse(this.responseText))
          console.log('LLAMADA A LA API EXITOSA')
        } catch (e) {
          console.warn('No se pudo parsear Manin. Hit.')
        }
      } else {
        console.warn('No se recive un 200 Manin. Hit.')
      }
    }
  }, [])
  // NO meter xhr en el array de dependencias

  let filtrado
  if (!provincia || provincia === 'ninguna') {
    filtrado = resObj
  } else {
    filtrado = resObj.filter(c => c.provincia === provincia)
  }
  console.log(resObj)
  const enlace = Link({ className: 'block w-64 h-20', to: '/' })
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '111.1%' }}>
      {filtrado.map((image) => (
        <ImageButton
          focusRipple
          LinkComponent={enlace}
          key={image.nombre}
          style={{
            width: '30%'
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.imagen})` }} />
          <ImageBackdrop className='MuiImageBackdrop-root' />
          <Image>
            <Typography
              component='span'
              variant='subtitle1'
              color='inherit'
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`
              }}
            >
              <Link to='/'> {/* TODO: METER LOS ENLACES DE LOS CENTROS (ruta/{image.id}) */}
                {image.nombre}
              </Link>
              <ImageMarked className='MuiImageMarked-root' />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  )
}

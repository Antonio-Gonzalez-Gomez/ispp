import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box } from '@mui/material'

export function Servicio ({ personalizaciones, deleteFunc }) {

    const nombres = personalizaciones.map(function(obj) {
        return obj.nombre
    }).join(", ").replace(/_/g, " ")

    const coste = personalizaciones[0].coste
    const tiempo = personalizaciones[0].tiempo

    return (
        <Box sx={{flexDirection: 'row', my:1, display: 'grid', gridAutoColumns: '1fr', gap: 1}}>
            <Box sx={{ gridRow: '1', gridColumn: 'span 8', ml:1 }}>
                <p className="break-words">{nombres}</p>
            </Box>
            <Box sx={{ gridRow: '1', gridColumn: 'span 3', mr:0.5 }}
                className="flex">
                <p className="m-auto">{coste} €</p>
            </Box>
            <Box sx={{ gridRow: '1', gridColumn: 'span 5', mx:0.5 }}
                className="flex">
                <p className="m-auto">{tiempo} mins</p>
            </Box>
            <Box sx={{ gridRow: '1', gridColumn: 'span 2'}}
                className="flex">
                <button className="m-auto" onClick={deleteFunc}>
                    <DeleteIcon />
                </button>
            </Box>
            
        </Box>
    )
}
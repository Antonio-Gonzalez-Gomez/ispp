/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.forma;

import static com.nailing.app.usuario.AuthoritiesConstants.*;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;

/**
 *
 * @author jaime
 */

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE })
@RequestMapping("/formas")
public class FormaController {
    @Autowired
    FormaService formaService;
	
//	mostrar todas las formas existentes en la base de datos
    @Operation(summary = "Lista todas las Formas")
    @PreAuthorize("hasAuthority('"+ ADMIN +"')")
    @GetMapping("/list")
    public ResponseEntity<List<Forma>> listFormas(){
    	List<Forma> formas = formaService.findAll();
	return new ResponseEntity<>(formas, HttpStatus.OK);
    }
	
//	borrar una forma por su ID
    @Operation(summary = "Borra una Forma")
    @PreAuthorize("hasAuthority('"+ ADMIN +"') or hasAuthority('"+ OWNER +"')")
    @DeleteMapping("/delete/{id}")
    public void deleteForma(@PathVariable Long id) {
	formaService.removeForma(id);
    }
	
//	encontrar una forma por su ID
    @Operation(summary = "Muestra una Forma")
    @PreAuthorize("hasAuthority('"+ ADMIN +"') or hasAuthority('"+ OWNER +"')")
    @GetMapping("/show/{id}")
    public ResponseEntity<Forma> showBase(@PathVariable Long id){
	return new ResponseEntity<>(formaService.findById(id), HttpStatus.OK);
    }
	
    @Operation(summary = "Muestra Formas en función de Centro y Base")
    @PreAuthorize("hasAuthority('"+ ADMIN +"') or hasAuthority('"+ USER +"')")
    @GetMapping("/{baseId}/centro/{centroId}")
    public  ResponseEntity<List<Forma>> basesByCentroTipo( @PathVariable Long centroId){
    	List<Forma> formas = formaService.findFormasByCentroBase(centroId);
	return new ResponseEntity<>(formas, HttpStatus.OK);
    }
    
    @Operation(summary = "Muestra todas las posibles Formas")
    @PreAuthorize("hasAuthority('"+ ADMIN +"') or hasAuthority('"+ OWNER +"')")
    @GetMapping("/all")
    public ResponseEntity<List<String>> listPosibleForma(){
        List<String> formas = formaService.listPosibleForma();
        return new ResponseEntity<>(formas,HttpStatus.OK);
    }

    @Operation(summary = "Lista todas las Formas de un Centro")
    @PreAuthorize("hasAuthority('"+ ADMIN +"') or hasAuthority('"+ OWNER +"')")
    @GetMapping("/centro/{centroId}/list")
    public ResponseEntity<List<Forma>> listByCentro(@PathVariable Long centroId){
        List<Forma> formas = formaService.findFormasByCentroBase(centroId);
        return new ResponseEntity<>(formas,HttpStatus.OK);
    }
    
    @Operation(summary = "Añade una Forma a un Centro")
    @PreAuthorize("hasAuthority('"+ OWNER +"')")
    @PostMapping("/add/centro")
    public ResponseEntity<List<Forma>> addFormaCentro(@RequestBody Map<String,List<String>> forids){
        try{
            List<Forma> formas = formaService.addFormaCentro(forids);
            return new ResponseEntity<>(formas, HttpStatus.CREATED);
        }catch(IllegalArgumentException e){
            List<Forma> formas = formaService.addFormaCentro(forids);
            return new ResponseEntity<>(formas, HttpStatus.BAD_REQUEST);
        }
    }
}

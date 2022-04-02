/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.decoracion;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Usuario
 */
@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE })
@RequestMapping("/decoraciones")
public class DecoracionController {
    
    @Autowired
    DecoracionService decoracionService;
    
    @PostMapping("/add")
    public ResponseEntity<Decoracion> addDecoracion(@RequestBody Decoracion decoracion){
        Decoracion deco = decoracionService.addDecoracion(decoracion);
        if(deco == null)
            return new ResponseEntity<>(deco, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(deco, HttpStatus.CREATED);
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteDecoracion(@PathVariable Long id){
        decoracionService.removeDecoracion(id);
    }
    
    @GetMapping("/show/{id}")
    public ResponseEntity<Decoracion> showDecoracion(@PathVariable Long id){
        try{
            Decoracion deco = decoracionService.findById(id);
            return new ResponseEntity<>(deco,HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<>(decoracionService.findById(id),HttpStatus.BAD_REQUEST);
        }       
    }
    
    @GetMapping("/list")
    public ResponseEntity<List<Decoracion>> listDecoraciones(){
        List<Decoracion> decos = StreamSupport.stream(decoracionService.findAll()
                .spliterator(), false).collect(Collectors.toList());
        return new ResponseEntity<>(decos,HttpStatus.OK);
    }
    
    @GetMapping("{disenyoId}/centro/{centroId}")
    public ResponseEntity<List<Decoracion>> decoracionesByCentroDisenyo(@PathVariable Long disenyoId, @PathVariable Long centroId){
        List<Decoracion> decoraciones = decoracionService.findDecoracionByCentroDisenyo(disenyoId, centroId);
        return new ResponseEntity<>(decoraciones, HttpStatus.OK);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<String>> listPosibleDecoracion(){
        List<String> decoraciones = decoracionService.listPosibleDecoracion();
        return new ResponseEntity<>(decoraciones,HttpStatus.OK);
    }
    
    @PostMapping("/add/centro")
    public ResponseEntity<List<Decoracion>> addDecoracionCentro(@RequestBody Map<String,List<String>> decids){
        try{
            List<Decoracion> decoraciones = decoracionService.addDecoracionCentro(decids);
            return new ResponseEntity<>(decoraciones, HttpStatus.CREATED);
        }catch(IllegalArgumentException e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}

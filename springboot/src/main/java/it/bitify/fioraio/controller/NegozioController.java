/**************************************************************************
*
* Copyright 2022 (C) Bitify s.r.l.
*
* Created on  : 2022-05-03
* Author      : E. Nappi
* Project Name: fioraio 
* Package     : controller
* File Name   : NegozioController.java
*
*-----------------------------------------------------------------------------
* Revision History (Release )
*-----------------------------------------------------------------------------
* VERSION     DESCRIPTION OF CHANGE
*-----------------------------------------------------------------------------
** --/1.0  |  Initial Create.
**---------|------------------------------------------------------------------
***************************************************************************/
package it.bitify.fioraio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.security.access.prepost.PreAuthorize;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import it.bitify.fioraio.service.NegozioService;
import it.bitify.fioraio.model.Negozio;
import it.bitify.fioraio.dto.PagedResponse;
import it.bitify.fioraio.dto.ApiResponse;
import it.bitify.fioraio.util.AppConstants;


/*******************************************************************************************
 * Created by E. Nappi 
 * The Negozio
 ******************************************************************************************/
@RestController
@RequestMapping("/api/negozio")
public class NegozioController {
	
   Logger logger = LoggerFactory.getLogger(NegozioController.class);
	
   @Autowired
   NegozioService negozioService;

   //@PreAuthorize("hasAuthority('negozio_list_all')")
   @GetMapping("/all")
   public ResponseEntity<Object> getAllNegozios() {
      return new ResponseEntity<>(negozioService.getAll(), HttpStatus.OK);
   }
   
   //@PreAuthorize("hasAuthority('negozio_list_paged')")
   @GetMapping
   public PagedResponse<Negozio> getNegozios( @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                               				  @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
														      @RequestParam(value = "sortdir", defaultValue = "1") int sortdir,
														      @RequestParam(value = "sortfield", defaultValue = "id") String sortfield,
   															  @RequestParam(value = "searchstring", defaultValue = "") String searchstring) {
   																  
       return negozioService.getAllPaged(page, size, sortdir,sortfield,searchstring);
   }
   
   //@PreAuthorize("hasAuthority('negozio_by_id')")
   @GetMapping("/{id}")
   public Negozio getNegozioById(@PathVariable Long id) {
       return negozioService.findById(id).get();
   }
   
   //@PreAuthorize("hasAuthority('negozio_update')")
   @PutMapping
   public ResponseEntity<Object> 
      updateNegozio(@RequestBody Negozio negozio) {
      
	   negozioService.updateNegozio(negozio);
      return ResponseEntity.ok(new ApiResponse(true, "Negozio is updated successsfully"));
   }
   
   //@PreAuthorize("hasAuthority('negozio_delete')")
   @DeleteMapping("/{id}")
   public ResponseEntity<Object> delete(@PathVariable("id") Long id) {
	   negozioService.deleteNegozio(id);
      return ResponseEntity.ok(new ApiResponse(true, "Negozio is deleted successsfully"));
   }
   
   //@PreAuthorize("hasAuthority('negozio_delete_all')")
   @PutMapping("/deleteAll")
   public ResponseEntity<Object> 
      deleteNegozios(@RequestBody Negozio[] negozios) {
      
	   negozioService.deleteNegozios(negozios);
      return ResponseEntity.ok(new ApiResponse(true, "Negozios are deleted successsfully"));
   }
   
   //@PreAuthorize("hasAuthority('negozio_create')")
   @PostMapping
   public ResponseEntity<Object> createNegozio(@RequestBody Negozio negozio) {
	   negozioService.createNegozio(negozio);
      return ResponseEntity.ok(new ApiResponse(true, "Negozio is created successsfully"));
   }
   	
        //@PreAuthorize("hasAuthority('negozio_report_pdf')")
	@GetMapping("/report/pdf")
	public void generateReportPdf(HttpServletResponse response) {
		negozioService.generateReportPdf(response);
	}
        //@PreAuthorize("hasAuthority('negozio_report_xls')")
	@GetMapping("/report/xls")
	public void generateReportXls(HttpServletResponse response) {
		negozioService.generateReportXls(response);
	}
        //@PreAuthorize("hasAuthority('negozio_report_csv')")
	@GetMapping("/report/csv")
	public void generateReportCsv(HttpServletResponse response) {
		negozioService.generateReportCsv(response);
	}
   
}

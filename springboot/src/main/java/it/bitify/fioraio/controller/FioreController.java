/**************************************************************************
*
* Copyright 2022 (C) Bitify s.r.l.
*
* Created on  : 2022-05-03
* Author      : E. Nappi
* Project Name: fioraio 
* Package     : controller
* File Name   : FioreController.java
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

import it.bitify.fioraio.service.FioreService;
import it.bitify.fioraio.model.Fiore;
import it.bitify.fioraio.dto.PagedResponse;
import it.bitify.fioraio.dto.ApiResponse;
import it.bitify.fioraio.util.AppConstants;


/*******************************************************************************************
 * Created by E. Nappi 
 * The Fiore
 ******************************************************************************************/
@RestController
@RequestMapping("/api/fiore")
public class FioreController {
	
   Logger logger = LoggerFactory.getLogger(FioreController.class);
	
   @Autowired
   FioreService fioreService;

   //@PreAuthorize("hasAuthority('fiore_list_all')")
   @GetMapping("/all")
   public ResponseEntity<Object> getAllFiores() {
      return new ResponseEntity<>(fioreService.getAll(), HttpStatus.OK);
   }
   
   //@PreAuthorize("hasAuthority('fiore_list_paged')")
   @GetMapping
   public PagedResponse<Fiore> getFiores( @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                               				  @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
														      @RequestParam(value = "sortdir", defaultValue = "1") int sortdir,
														      @RequestParam(value = "sortfield", defaultValue = "fioreId") String sortfield,
   															  @RequestParam(value = "searchstring", defaultValue = "") String searchstring) {
   																  
       return fioreService.getAllPaged(page, size, sortdir,sortfield,searchstring);
   }
   
   //@PreAuthorize("hasAuthority('fiore_by_id')")
   @GetMapping("/{id}")
   public Fiore getFioreById(@PathVariable Long id) {
       return fioreService.findById(id).get();
   }
   
   //@PreAuthorize("hasAuthority('fiore_update')")
   @PutMapping
   public ResponseEntity<Object> 
      updateFiore(@RequestBody Fiore fiore) {
      
	   fioreService.updateFiore(fiore);
      return ResponseEntity.ok(new ApiResponse(true, "Fiore is updated successsfully"));
   }
   
   //@PreAuthorize("hasAuthority('fiore_delete')")
   @DeleteMapping("/{id}")
   public ResponseEntity<Object> delete(@PathVariable("id") Long id) {
	   fioreService.deleteFiore(id);
      return ResponseEntity.ok(new ApiResponse(true, "Fiore is deleted successsfully"));
   }
   
   //@PreAuthorize("hasAuthority('fiore_delete_all')")
   @PutMapping("/deleteAll")
   public ResponseEntity<Object> 
      deleteFiores(@RequestBody Fiore[] fiores) {
      
	   fioreService.deleteFiores(fiores);
      return ResponseEntity.ok(new ApiResponse(true, "Fiores are deleted successsfully"));
   }
   
   //@PreAuthorize("hasAuthority('fiore_create')")
   @PostMapping
   public ResponseEntity<Object> createFiore(@RequestBody Fiore fiore) {
	   fioreService.createFiore(fiore);
      return ResponseEntity.ok(new ApiResponse(true, "Fiore is created successsfully"));
   }
   	
        //@PreAuthorize("hasAuthority('fiore_report_pdf')")
	@GetMapping("/report/pdf")
	public void generateReportPdf(HttpServletResponse response) {
		fioreService.generateReportPdf(response);
	}
        //@PreAuthorize("hasAuthority('fiore_report_xls')")
	@GetMapping("/report/xls")
	public void generateReportXls(HttpServletResponse response) {
		fioreService.generateReportXls(response);
	}
        //@PreAuthorize("hasAuthority('fiore_report_csv')")
	@GetMapping("/report/csv")
	public void generateReportCsv(HttpServletResponse response) {
		fioreService.generateReportCsv(response);
	}
   
}

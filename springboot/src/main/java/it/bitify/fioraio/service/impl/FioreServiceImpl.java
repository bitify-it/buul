/**************************************************************************
*
* Copyright 2022 (C) Bitify s.r.l.
*
* Created on  : 2022-05-03
* Author      : E. Nappi
* Project Name: fioraio 
* Package     : service.impl
* File Name   : FioreServiceImpl.java
*
*-----------------------------------------------------------------------------
* Revision History (Release )
*-----------------------------------------------------------------------------
* VERSION     DESCRIPTION OF CHANGE
*-----------------------------------------------------------------------------
** --/1.0  |  Initial Create.
**---------|------------------------------------------------------------------
***************************************************************************/
package it.bitify.fioraio.service.impl;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRCsvExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.engine.util.JRSaver;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleWriterExporterOutput;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import it.bitify.fioraio.dto.PagedResponse;
import it.bitify.fioraio.util.PageUtils;
import it.bitify.fioraio.model.Fiore;
import it.bitify.fioraio.service.FioreService;
import it.bitify.fioraio.repository.FioreRepository;

/**
 * Created by E. Nappi 
 * The Fiore Service Impl
 */
@Service
public class FioreServiceImpl implements FioreService {
	
   Logger logger = LoggerFactory.getLogger(FioreServiceImpl.class);
   
   @Autowired
   private FioreRepository fioreRepo;
   
   JasperReport jasperReport;
   
   public FioreServiceImpl() {
		try {
			// Compile the Jasper report from .jrxml to .japser
			InputStream fioreStream= getClass().getResourceAsStream("/report/jrxml/FioreReport.jrxml");
			jasperReport= JasperCompileManager.compileReport(fioreStream);
			new File("report").mkdirs();
			JRSaver.saveObject(jasperReport, "report/fioreReport.jasper");
			logger.debug("fioreReport.jasper saved");

		} catch (JRException e) {
			e.printStackTrace();
			logger.error("Error--> check the console log");
		}
   }
	
   @Override
   public void createFiore(Fiore fiore) {
	   fioreRepo.save(fiore);
	   logger.debug("Fiore created");
   }
   @Override
   public void updateFiore(Fiore fiore) {
	   
	   fioreRepo.save(fiore);
	   logger.debug("Fiore updated");
   }
   @Override
   public void deleteFiore(Long  id) {
	   fioreRepo.delete(fioreRepo.getById(id));
	   logger.debug("Fiore deleted");
   }
   @Override
	public void deleteFiores(Fiore[] fiores) {
		for (int i = 0; i < fiores.length; i++) {
			deleteFiore(fiores[i].getFioreId());
			logger.debug("Fiore deleted");
		}
	}
   @Override
   public Optional<Fiore> findById(Long id) {
	   logger.debug("Fiore findById execution ID:"+id);
   	   return fioreRepo.findById(id);
   }
   @Override
   public Collection<Fiore> getAll() {
	   logger.debug("Fiore getAll");
       return fioreRepo.findAll();
   }
   @Override
   public PagedResponse<Fiore> getAllPaged(int page, int size, int sortDirection,String sortField,String searchString) {
	   logger.debug("Fiore getAllPaged");
       PageUtils.validatePageNumberAndSize(page, size);

       Direction dir = Sort.Direction.DESC;
       if(sortDirection==-1) {
    	   dir= Sort.Direction.ASC;
       }
       Pageable pageable = PageRequest.of(page, size, dir, sortField);
       Page<Fiore> fiores;
		if(searchString!=null && !searchString.isEmpty()) {
			//TODO global search
			fiores = fioreRepo.findAll(pageable);
		}
		else {
			fiores = fioreRepo.findAll(pageable);
		}

       if(fiores.getNumberOfElements() == 0) {
           return new PagedResponse<>(Collections.emptyList(), fiores.getNumber(),
        		   fiores.getSize(), fiores.getTotalElements(), fiores.getTotalPages(), fiores.isLast());
       }

       return new PagedResponse<>(fiores.toList(), fiores.getNumber(),
    		   fiores.getSize(), fiores.getTotalElements(), fiores.getTotalPages(), fiores.isLast());
   }
   
   @Override
   public void generateReportPdf(HttpServletResponse response) {
	   logger.debug("Fiore generateReportPdf");
		try {

			List<Fiore> fiores = fioreRepo.findAll();
			JRBeanCollectionDataSource jrBeanCollectionDataSource = new JRBeanCollectionDataSource(fiores);
			Map<String, Object> parameters = new HashMap<>();
			parameters.put("title", "Fiore");
			parameters.put("title_sub", "Relazioni");
			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters,
					jrBeanCollectionDataSource);
			JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
			response.setContentType("application/pdf");
			response.addHeader("Content-Disposition", "inline; filename=Fiore.pdf;");
			logger.debug("Done");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Error--> check the console log"); 
		}
	}

	@Override
	public void generateReportXls(HttpServletResponse response) {
		try {
			JRXlsxExporter exporter = new JRXlsxExporter();
			List<Fiore> fiores = fioreRepo.findAll();
			JRBeanCollectionDataSource jrBeanCollectionDataSource = new JRBeanCollectionDataSource(fiores);
			Map<String, Object> parameters = new HashMap<>();
			parameters.put("title", "Fiore");
			parameters.put("title_sub", "Relazioni");
			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters,
					jrBeanCollectionDataSource);
			exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
			SimpleXlsxReportConfiguration reportConfig = new SimpleXlsxReportConfiguration();
			reportConfig.setSheetNames(new String[] { "Fiore" });
			exporter.setConfiguration(reportConfig);
			exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(response.getOutputStream()));
			response.setHeader("Content-Disposition", "attachment;filename=Fiore.xlsx");
	        response.setContentType("application/octet-stream");

			exporter.exportReport();
		} catch (JRException ex) {
			logger.error(ex.getMessage());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@Override
	public void generateReportCsv(HttpServletResponse response) {
		try {
			JRCsvExporter exporter = new JRCsvExporter();
			List<Fiore> fiores = fioreRepo.findAll();
			JRBeanCollectionDataSource jrBeanCollectionDataSource = new JRBeanCollectionDataSource(fiores);
			Map<String, Object> parameters = new HashMap<>();
			parameters.put("title", "Fiore");
			parameters.put("title_sub", "Relazioni");
			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters,
					jrBeanCollectionDataSource);
			exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
			exporter.setExporterOutput(new SimpleWriterExporterOutput(response.getOutputStream()));
			response.setHeader("Content-Disposition", "attachment;filename=Fiore.csv");
	        response.setContentType("application/octet-stream");
	        exporter.exportReport();
		} catch (JRException ex) {
			logger.error(ex.getMessage());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}

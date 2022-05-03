/**************************************************************************
*
* Copyright 2022 (C) Bitify s.r.l.
*
* Created on  : 2022-05-03
* Author      : E. Nappi
* Project Name: fioraio 
* Package     : service.impl
* File Name   : NegozioServiceImpl.java
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
import it.bitify.fioraio.model.Negozio;
import it.bitify.fioraio.service.NegozioService;
import it.bitify.fioraio.repository.NegozioRepository;

/**
 * Created by E. Nappi 
 * The Negozio Service Impl
 */
@Service
public class NegozioServiceImpl implements NegozioService {
	
   Logger logger = LoggerFactory.getLogger(NegozioServiceImpl.class);
   
   @Autowired
   private NegozioRepository negozioRepo;
   
   JasperReport jasperReport;
   
   public NegozioServiceImpl() {
		try {
			// Compile the Jasper report from .jrxml to .japser
			InputStream negozioStream= getClass().getResourceAsStream("/report/jrxml/NegozioReport.jrxml");
			jasperReport= JasperCompileManager.compileReport(negozioStream);
			new File("report").mkdirs();
			JRSaver.saveObject(jasperReport, "report/negozioReport.jasper");
			logger.debug("negozioReport.jasper saved");

		} catch (JRException e) {
			e.printStackTrace();
			logger.error("Error--> check the console log");
		}
   }
	
   @Override
   public void createNegozio(Negozio negozio) {
	   negozioRepo.save(negozio);
	   logger.debug("Negozio created");
   }
   @Override
   public void updateNegozio(Negozio negozio) {
	   
	   negozioRepo.save(negozio);
	   logger.debug("Negozio updated");
   }
   @Override
   public void deleteNegozio(Long  id) {
	   negozioRepo.delete(negozioRepo.getById(id));
	   logger.debug("Negozio deleted");
   }
   @Override
	public void deleteNegozios(Negozio[] negozios) {
		for (int i = 0; i < negozios.length; i++) {
			deleteNegozio(negozios[i].getId());
			logger.debug("Negozio deleted");
		}
	}
   @Override
   public Optional<Negozio> findById(Long id) {
	   logger.debug("Negozio findById execution ID:"+id);
   	   return negozioRepo.findById(id);
   }
   @Override
   public Collection<Negozio> getAll() {
	   logger.debug("Negozio getAll");
       return negozioRepo.findAll();
   }
   @Override
   public PagedResponse<Negozio> getAllPaged(int page, int size, int sortDirection,String sortField,String searchString) {
	   logger.debug("Negozio getAllPaged");
       PageUtils.validatePageNumberAndSize(page, size);

       Direction dir = Sort.Direction.DESC;
       if(sortDirection==-1) {
    	   dir= Sort.Direction.ASC;
       }
       Pageable pageable = PageRequest.of(page, size, dir, sortField);
       Page<Negozio> negozios;
		if(searchString!=null && !searchString.isEmpty()) {
			//TODO global search
			negozios = negozioRepo.findAll(pageable);
		}
		else {
			negozios = negozioRepo.findAll(pageable);
		}

       if(negozios.getNumberOfElements() == 0) {
           return new PagedResponse<>(Collections.emptyList(), negozios.getNumber(),
        		   negozios.getSize(), negozios.getTotalElements(), negozios.getTotalPages(), negozios.isLast());
       }

       return new PagedResponse<>(negozios.toList(), negozios.getNumber(),
    		   negozios.getSize(), negozios.getTotalElements(), negozios.getTotalPages(), negozios.isLast());
   }
   
   @Override
   public void generateReportPdf(HttpServletResponse response) {
	   logger.debug("Negozio generateReportPdf");
		try {

			List<Negozio> negozios = negozioRepo.findAll();
			JRBeanCollectionDataSource jrBeanCollectionDataSource = new JRBeanCollectionDataSource(negozios);
			Map<String, Object> parameters = new HashMap<>();
			parameters.put("title", "Negozio");
			parameters.put("title_sub", "Relazioni");
			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters,
					jrBeanCollectionDataSource);
			JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
			response.setContentType("application/pdf");
			response.addHeader("Content-Disposition", "inline; filename=Negozio.pdf;");
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
			List<Negozio> negozios = negozioRepo.findAll();
			JRBeanCollectionDataSource jrBeanCollectionDataSource = new JRBeanCollectionDataSource(negozios);
			Map<String, Object> parameters = new HashMap<>();
			parameters.put("title", "Negozio");
			parameters.put("title_sub", "Relazioni");
			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters,
					jrBeanCollectionDataSource);
			exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
			SimpleXlsxReportConfiguration reportConfig = new SimpleXlsxReportConfiguration();
			reportConfig.setSheetNames(new String[] { "Negozio" });
			exporter.setConfiguration(reportConfig);
			exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(response.getOutputStream()));
			response.setHeader("Content-Disposition", "attachment;filename=Negozio.xlsx");
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
			List<Negozio> negozios = negozioRepo.findAll();
			JRBeanCollectionDataSource jrBeanCollectionDataSource = new JRBeanCollectionDataSource(negozios);
			Map<String, Object> parameters = new HashMap<>();
			parameters.put("title", "Negozio");
			parameters.put("title_sub", "Relazioni");
			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters,
					jrBeanCollectionDataSource);
			exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
			exporter.setExporterOutput(new SimpleWriterExporterOutput(response.getOutputStream()));
			response.setHeader("Content-Disposition", "attachment;filename=Negozio.csv");
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

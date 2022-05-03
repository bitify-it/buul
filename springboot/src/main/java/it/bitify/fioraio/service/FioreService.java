/**************************************************************************
*
* Copyright 2022 (C) Bitify s.r.l.
*
* Created on  : 2022-05-03
* Author      : E. Nappi
* Project Name: fioraio 
* Package     : service
* File Name   : FioreService.java
*
*-----------------------------------------------------------------------------
* Revision History (Release )
*-----------------------------------------------------------------------------
* VERSION     DESCRIPTION OF CHANGE
*-----------------------------------------------------------------------------
** --/1.0  |  Initial Create.
**---------|------------------------------------------------------------------
***************************************************************************/
package it.bitify.fioraio.service;

import java.util.Collection;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import it.bitify.fioraio.model.Fiore;
import it.bitify.fioraio.dto.PagedResponse;

/**
 * Created by E. Nappi
 * The Fiore Service
 */
public interface FioreService {
   public abstract void createFiore(Fiore fiore);
   public abstract void updateFiore(Fiore fiore);
   public abstract void deleteFiore(Long  id);
   public abstract void deleteFiores(Fiore[] fiores);
   public abstract Optional<Fiore> findById(Long id);
   public abstract Collection<Fiore> getAll();
   public abstract PagedResponse<Fiore> getAllPaged(int page, int size, int sortDirection,String sortField,String searchString);
   public abstract void generateReportPdf(HttpServletResponse response);
   public abstract void generateReportXls(HttpServletResponse response);
   public abstract void generateReportCsv(HttpServletResponse response);
}

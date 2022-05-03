/**************************************************************************
*
* Copyright 2022 (C) Bitify s.r.l.
*
* Created on  : 2022-05-03
* Author      : E. Nappi
* Project Name: fioraio 
* Package     : service
* File Name   : NegozioService.java
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
import it.bitify.fioraio.model.Negozio;
import it.bitify.fioraio.dto.PagedResponse;

/**
 * Created by E. Nappi
 * The Negozio Service
 */
public interface NegozioService {
   public abstract void createNegozio(Negozio negozio);
   public abstract void updateNegozio(Negozio negozio);
   public abstract void deleteNegozio(Long  id);
   public abstract void deleteNegozios(Negozio[] negozios);
   public abstract Optional<Negozio> findById(Long id);
   public abstract Collection<Negozio> getAll();
   public abstract PagedResponse<Negozio> getAllPaged(int page, int size, int sortDirection,String sortField,String searchString);
   public abstract void generateReportPdf(HttpServletResponse response);
   public abstract void generateReportXls(HttpServletResponse response);
   public abstract void generateReportCsv(HttpServletResponse response);
}

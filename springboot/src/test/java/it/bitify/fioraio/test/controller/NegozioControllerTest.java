/**************************************************************************
*
* Copyright 2022 (C) Bitify s.r.l.
*
* Created on  : 2022-05-03
* Author      : E. Nappi
* Project Name: fioraio 
* Package     : test.controller
* File Name   : NegozioControllerTest.java
*
*-----------------------------------------------------------------------------
* Revision History (Release )
*-----------------------------------------------------------------------------
* VERSION     DESCRIPTION OF CHANGE
*-----------------------------------------------------------------------------
** --/1.0  |  Initial Create.
**---------|------------------------------------------------------------------
***************************************************************************/
package it.bitify.fioraio.test.controller;


import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
/*
import org.springframework.security.test.context.support.WithMockUser;
*/


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class NegozioControllerTest {
 
  @Autowired
  private MockMvc mvc;
  
  /*@WithMockUser(username = "admin", authorities = { "negozio_create" })*/
  @Test
  public void create() throws Exception 
  {
    String element="{}";
    
	  
    mvc.perform( MockMvcRequestBuilders
        .post("/api/negozio")
        .content(element)
        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk());
  }
  
  /*@WithMockUser(username = "admin", authorities = { "negozio_update" })*/
  @Test
  public void update() throws Exception 
  {
    String element="{\"id\":\"1\"}";
    
	  
    mvc.perform( MockMvcRequestBuilders
        .put("/api/negozio")
        .content(element)
        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk());
  }
  
  /*@WithMockUser(username = "admin", authorities = { "negozio_list_paged" })*/
  @Test
  public void getAllPaginated() throws Exception 
  {
    mvc.perform( MockMvcRequestBuilders
        .get("/api/negozio")
        .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk());
        //.andExpect(MockMvcResultMatchers.jsonPath("$.content").exists())
        //.andExpect(MockMvcResultMatchers.jsonPath("$.content[*].id").isNotEmpty());
  }
  
  /*@WithMockUser(username = "admin", authorities = { "negozio_list_all" })*/
  @Test
  public void getAll() throws Exception 
  {
    mvc.perform( MockMvcRequestBuilders
        .get("/api/negozio/all")
        .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk());
        //.andExpect(MockMvcResultMatchers.jsonPath("$").exists())
        //.andExpect(MockMvcResultMatchers.jsonPath("$[*].id").isNotEmpty());
  }
  
  /*@WithMockUser(username = "admin", authorities = { "negozio_delete" })*/
  @Test
  public void delete() throws Exception 
  {
    mvc.perform( MockMvcRequestBuilders
        .delete("/api/negozio/11")
        .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk());
  }
 
}

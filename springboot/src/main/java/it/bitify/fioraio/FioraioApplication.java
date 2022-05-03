/**************************************************************************
*
* Copyright 2022 (C) Bitify s.r.l.
*
* Created on  : 2022-05-03
* Author      : E. Nappi
* Project Name: fioraio 
* Package     : fioraio
* File Name   : FioraioApplication.java
*
*-----------------------------------------------------------------------------
* Revision History (Release )
*-----------------------------------------------------------------------------
* VERSION     DESCRIPTION OF CHANGE
*-----------------------------------------------------------------------------
** --/1.0  |  Initial Create.
**---------|------------------------------------------------------------------
***************************************************************************/
package it.bitify.fioraio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import java.util.Date;
import java.util.TimeZone;
import javax.annotation.PostConstruct;

/*******************************************************************************************
 * Created by E. Nappi
 * The main Application FioraioApplication
 ******************************************************************************************/
@SpringBootApplication
public class FioraioApplication {
	
	Logger logger = LoggerFactory.getLogger(FioraioApplication.class);
	
	@Autowired
	public Environment environment;

	public static void main(String[] args) {
		SpringApplication.run(FioraioApplication.class, args);
	}
	
	@PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("Europe/Rome"));
		logger.info("Spring boot application running in UTC timezone :"+new Date());
		for (int i = 0; i < this.environment.getActiveProfiles().length; i++) {
			logger.info(i+" ACTIVE PROFILE: *** "+this.environment.getActiveProfiles()[i]+" ***");
		}
	}
	

}

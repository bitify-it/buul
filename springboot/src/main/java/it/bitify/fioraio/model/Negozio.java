/**************************************************************************
*
* Copyright 2022 (C) Bitify s.r.l.
*
* Created on  : 2022-05-03
* Author      : E. Nappi
* Project Name: fioraio 
* Package     : model
* File Name   : Negozio.java
*
*-----------------------------------------------------------------------------
* Revision History (Release )
*-----------------------------------------------------------------------------
* VERSION     DESCRIPTION OF CHANGE
*-----------------------------------------------------------------------------
** --/1.0  |  Initial Create.
**---------|------------------------------------------------------------------
***************************************************************************/
package it.bitify.fioraio.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.CascadeType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonIgnore;

//optional
import javax.persistence.OneToOne;
import javax.persistence.OneToMany;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;
import java.util.Date;
import java.util.List;
import java.math.BigDecimal;

import it.bitify.fioraio.model.audit.UserDateAudit;
//import it.bitify.fioraio.security.model.SecUser;


/**
 * Created by E. Nappi 
 * Negozio: Entità
 */
@Entity
@Table(name = "NEGOZIO")
public class Negozio extends UserDateAudit {
	    
/** id: add comment...  */
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="id")
private long id;

/** Fiore Relation:  */
@ManyToMany(mappedBy="negozios")
@JsonIgnore
private List<Fiore> fiores;


public long getId(){
	return id;
}

public void setId(long id){
	this.id=id;
}


public List<Fiore> getFiores(){
	return fiores;
}

public void setFiores(List<Fiore> fiores){
	this.fiores=fiores;
}


}

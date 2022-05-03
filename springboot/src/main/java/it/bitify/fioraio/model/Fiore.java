/**************************************************************************
*
* Copyright 2022 (C) Bitify s.r.l.
*
* Created on  : 2022-05-03
* Author      : E. Nappi
* Project Name: fioraio 
* Package     : model
* File Name   : Fiore.java
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
 * Fiore: Entità
 */
@Entity
@Table(name = "FIORE")
public class Fiore extends UserDateAudit {
	    
/** fioreId: add comment...  */
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="fiore_id")
private long fioreId;

/** nome: add comment...  */
@Column(name="nome")
private String nome;

/** prezzo: add comment...  */
@Column(name="prezzo")
private BigDecimal prezzo;

/** Negozio Relation:  */
@ManyToMany
@JoinTable(name = "negozio_fiore", joinColumns = @JoinColumn(name =  "fiore_id",
referencedColumnName = "fiore_id"),inverseJoinColumns = @JoinColumn(name = "negozio_id",referencedColumnName = "id"))
private List<Negozio> negozios;


public long getFioreId(){
	return fioreId;
}

public void setFioreId(long fioreId){
	this.fioreId=fioreId;
}


public String getNome(){
	return nome;
}

public void setNome(String nome){
	this.nome=nome;
}


public BigDecimal getPrezzo(){
	return prezzo;
}

public void setPrezzo(BigDecimal prezzo){
	this.prezzo=prezzo;
}


public List<Negozio> getNegozios(){
	return negozios;
}

public void setNegozios(List<Negozio> negozios){
	this.negozios=negozios;
}


}

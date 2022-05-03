package it.bitify.fioraio.dto;

import javax.validation.constraints.NotBlank;



public class PwdResetRequest {
	
    @NotBlank
    private String email;

    @NotBlank
    private String pin;
    
    @NotBlank
    private String newPassword;
    
    


	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

  
}

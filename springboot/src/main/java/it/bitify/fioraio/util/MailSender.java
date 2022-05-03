package it.bitify.fioraio.util;

import java.io.File;
import java.io.IOException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

/*******************************************************************************************
 * Created by E. Nappi.
 ******************************************************************************************/
@Component("fioraioMailSender")
public class MailSender {
	
	@Autowired
    private JavaMailSender javaMailSender;
	
	String from = "test@test.it";
	public void sendEmail(String to, String subject, String text) {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(from);
        msg.setTo(to);

        msg.setSubject(subject);
        msg.setText(text);

        javaMailSender.send(msg);

    }
	
	/************************************************************************************************************
	 * 
	 * @param logo = Indirizzo web del logo
	 * @param to = Destinatario della mail
	 * @param subject = Oggetto della mail
	 * @param salutiIniziali = Saluto iniziale
	 * @param corpo1 = Prima parte del testo
	 * @param corpo2 = Seconda parte del testo (dopo eventuale bottone)
	 * @param etichettaBottone = Label visualizzata nel bottone (Se null o vuota il bottone non sarà aggiunto alla mail)
	 * @param linkBottone = link a cui è collegato il bottone (Se null o vuoto il bottone non sarà aggiunto alla mail)
	 * @param salutiFinali = Saluto finale
	 * @throws MessagingException
	 * @throws IOException
	 */
	public void sendHtmlEmail(String logo,String to, String subject, String salutiIniziali, String corpo1, String corpo2, String etichettaBottone, String linkBottone, String salutiFinali ) throws MessagingException, IOException {

        MimeMessage msg = javaMailSender.createMimeMessage();
        //msg.setFrom(from);
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject(subject);   
        String htmlMsg=getHeadAndStyle()+getBody(logo,salutiIniziali, corpo1, etichettaBottone, linkBottone, corpo2, salutiFinali);
        helper.setText(htmlMsg, true);

        javaMailSender.send(msg);

    }
	
	public void sendEmailWithAttachment(String to, String nomeFile, File file) throws MessagingException, IOException {

        MimeMessage msg = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.setTo(to);
        helper.setSubject("Testing from Spring Boot");
        helper.setText("<h1>Check attachment for image!</h1>", true);
        helper.addAttachment(nomeFile, file);

        javaMailSender.send(msg);

    }
	
	private String getHeadAndStyle() {
		String start = "<!doctype html>" + 
				"<html>" + 
				"  <head>" + 
				"    <meta name=\"viewport\" content=\"width=device-width\" />" + 
				"    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />" + 
				"    <title>Prenotazione Veloce</title>" + 
				"    <style>" + 
				"      /* -------------------------------------" + 
				"          GLOBAL RESETS" + 
				"      ------------------------------------- */" + 
				"      " + 
				"      /*All the styling goes here*/" + 
				"      " + 
				"      .logo{" + 
				"        margin-left: auto;" + 
				"        margin-right: auto;" + 
				"        display: block;" + 
				"        margin-top: 20px;" + 
				"          width: 200px;" + 
				"      }"+
				"      img {" + 
				"        border: none;" + 
				"        -ms-interpolation-mode: bicubic;" + 
				"        max-width: 100%; " + 
				"      }" + 
				"" + 
				"      body {" + 
				"        background-color: #f6f6f6;" + 
				"        font-family: sans-serif;" + 
				"        -webkit-font-smoothing: antialiased;" + 
				"        font-size: 14px;" + 
				"        line-height: 1.4;" + 
				"        margin: 0;" + 
				"        padding: 0;" + 
				"        -ms-text-size-adjust: 100%;" + 
				"        -webkit-text-size-adjust: 100%; " + 
				"      }" + 
				"" + 
				"      table {" + 
				"        border-collapse: separate;" + 
				"        mso-table-lspace: 0pt;" + 
				"        mso-table-rspace: 0pt;" + 
				"        width: 100%; }" + 
				"        table td {" + 
				"          font-family: sans-serif;" + 
				"          font-size: 14px;" + 
				"          vertical-align: top; " + 
				"      }" + 
				"" + 
				"      /* -------------------------------------" + 
				"          BODY & CONTAINER" + 
				"      ------------------------------------- */" + 
				"" + 
				"      .body {" + 
				"        background-color: #f6f6f6;" + 
				"        width: 100%; " + 
				"      }" + 
				"" + 
				"      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */" + 
				"      .container {" + 
				"        display: block;" + 
				"        margin: 0 auto !important;" + 
				"        /* makes it centered */" + 
				"        max-width: 580px;" + 
				"        padding: 10px;" + 
				"        width: 580px; " + 
				"      }" + 
				"" + 
				"      /* This should also be a block element, so that it will fill 100% of the .container */" + 
				"      .content {" + 
				"        box-sizing: border-box;" + 
				"        display: block;" + 
				"        margin: 0 auto;" + 
				"        max-width: 580px;" + 
				"        padding: 10px; " + 
				"      }" + 
				"" + 
				"      /* -------------------------------------" + 
				"          HEADER, FOOTER, MAIN" + 
				"      ------------------------------------- */" + 
				"      .main {" + 
				"        background: #ffffff;" + 
				"        border-radius: 3px;" + 
				"        width: 100%; " + 
				"      }" + 
				"" + 
				"      .wrapper {" + 
				"        box-sizing: border-box;" + 
				"        padding: 20px; " + 
				"      }" + 
				"" + 
				"      .content-block {" + 
				"        padding-bottom: 10px;" + 
				"        padding-top: 10px;" + 
				"      }" + 
				"" + 
				"      .footer {" + 
				"        clear: both;" + 
				"        margin-top: 10px;" + 
				"        text-align: center;" + 
				"        width: 100%; " + 
				"      }" + 
				"        .footer td," + 
				"        .footer p," + 
				"        .footer span," + 
				"        .footer a {" + 
				"          color: #999999;" + 
				"          font-size: 12px;" + 
				"          text-align: center; " + 
				"      }" + 
				"" + 
				"      /* -------------------------------------" + 
				"          TYPOGRAPHY" + 
				"      ------------------------------------- */" + 
				"      h1," + 
				"      h2," + 
				"      h3," + 
				"      h4 {" + 
				"        color: #000000;" + 
				"        font-family: sans-serif;" + 
				"        font-weight: 400;" + 
				"        line-height: 1.4;" + 
				"        margin: 0;" + 
				"        margin-bottom: 30px; " + 
				"      }" + 
				"" + 
				"      h1 {" + 
				"        font-size: 35px;" + 
				"        font-weight: 300;" + 
				"        text-align: center;" + 
				"        text-transform: capitalize; " + 
				"      }" + 
				"" + 
				"      p," + 
				"      ul," + 
				"      ol {" + 
				"        font-family: sans-serif;" + 
				"        font-size: 14px;" + 
				"        font-weight: normal;" + 
				"        margin: 0;" + 
				"        margin-bottom: 15px; " + 
				"      }" + 
				"        p li," + 
				"        ul li," + 
				"        ol li {" + 
				"          list-style-position: inside;" + 
				"          margin-left: 5px; " + 
				"      }" + 
				"" + 
				"      a {" + 
				"        color: #3498db;" + 
				"        text-decoration: underline; " + 
				"      }" + 
				"" + 
				"      /* -------------------------------------" + 
				"          BUTTONS" + 
				"      ------------------------------------- */" + 
				"      .btn {" + 
				"        box-sizing: border-box;" + 
				"        width: 100%; }" + 
				"        .btn > tbody > tr > td {" + 
				"          padding-bottom: 15px; }" + 
				"        .btn table {" + 
				"          width: auto; " + 
				"      }" + 
				"        .btn table td {" + 
				"          background-color: #ffffff;" + 
				"          border-radius: 5px;" + 
				"          text-align: center; " + 
				"      }" + 
				"        .btn a {" + 
				"          background-color: #ffffff;" + 
				"          border: solid 1px #3498db;" + 
				"          border-radius: 5px;" + 
				"          box-sizing: border-box;" + 
				"          color: #3498db;" + 
				"          cursor: pointer;" + 
				"          display: inline-block;" + 
				"          font-size: 14px;" + 
				"          font-weight: bold;" + 
				"          margin: 0;" + 
				"          padding: 12px 25px;" + 
				"          text-decoration: none;" + 
				"          text-transform: capitalize; " + 
				"      }" + 
				"" + 
				"      .btn-primary table td {" + 
				"        background-color: #3498db; " + 
				"      }" + 
				"" + 
				"      .btn-primary a {" + 
				"        background-color: #3498db;" + 
				"        border-color: #3498db;" + 
				"        color: #ffffff; " + 
				"      }" + 
				"" + 
				"      /* -------------------------------------" + 
				"          OTHER STYLES THAT MIGHT BE USEFUL" + 
				"      ------------------------------------- */" + 
				"      .last {" + 
				"        margin-bottom: 0; " + 
				"      }" + 
				"" + 
				"      .first {" + 
				"        margin-top: 0; " + 
				"      }" + 
				"" + 
				"      .align-center {" + 
				"        text-align: center; " + 
				"      }" + 
				"" + 
				"      .align-right {" + 
				"        text-align: right; " + 
				"      }" + 
				"" + 
				"      .align-left {" + 
				"        text-align: left; " + 
				"      }" + 
				"" + 
				"      .clear {" + 
				"        clear: both; " + 
				"      }" + 
				"" + 
				"      .mt0 {" + 
				"        margin-top: 0; " + 
				"      }" + 
				"" + 
				"      .mb0 {" + 
				"        margin-bottom: 0; " + 
				"      }" + 
				"" + 
				"      .preheader {" + 
				"        color: transparent;" + 
				"        display: none;" + 
				"        height: 0;" + 
				"        max-height: 0;" + 
				"        max-width: 0;" + 
				"        opacity: 0;" + 
				"        overflow: hidden;" + 
				"        mso-hide: all;" + 
				"        visibility: hidden;" + 
				"        width: 0; " + 
				"      }" + 
				"" + 
				"      .powered-by a {" + 
				"        text-decoration: none; " + 
				"      }" + 
				"" + 
				"      hr {" + 
				"        border: 0;" + 
				"        border-bottom: 1px solid #f6f6f6;" + 
				"        margin: 20px 0; " + 
				"      }" + 
				"" + 
				"      /* -------------------------------------" + 
				"          RESPONSIVE AND MOBILE FRIENDLY STYLES" + 
				"      ------------------------------------- */" + 
				"      @media only screen and (max-width: 620px) {" + 
				"        table[class=body] h1 {" + 
				"          font-size: 28px !important;" + 
				"          margin-bottom: 10px !important; " + 
				"        }" + 
				"        table[class=body] p," + 
				"        table[class=body] ul," + 
				"        table[class=body] ol," + 
				"        table[class=body] td," + 
				"        table[class=body] span," + 
				"        table[class=body] a {" + 
				"          font-size: 16px !important; " + 
				"        }" + 
				"        table[class=body] .wrapper," + 
				"        table[class=body] .article {" + 
				"          padding: 10px !important; " + 
				"        }" + 
				"        table[class=body] .content {" + 
				"          padding: 0 !important; " + 
				"        }" + 
				"        table[class=body] .container {" + 
				"          padding: 0 !important;" + 
				"          width: 100% !important; " + 
				"        }" + 
				"        table[class=body] .main {" + 
				"          border-left-width: 0 !important;" + 
				"          border-radius: 0 !important;" + 
				"          border-right-width: 0 !important; " + 
				"        }" + 
				"        table[class=body] .btn table {" + 
				"          width: 100% !important; " + 
				"        }" + 
				"        table[class=body] .btn a {" + 
				"          width: 100% !important; " + 
				"        }" + 
				"        table[class=body] .img-responsive {" + 
				"          height: auto !important;" + 
				"          max-width: 100% !important;" + 
				"          width: auto !important; " + 
				"        }" + 
				"      }" + 
				"" + 
				"      /* -------------------------------------" + 
				"          PRESERVE THESE STYLES IN THE HEAD" + 
				"      ------------------------------------- */" + 
				"      @media all {" + 
				"        .ExternalClass {" + 
				"          width: 100%; " + 
				"        }" + 
				"        .ExternalClass," + 
				"        .ExternalClass p," + 
				"        .ExternalClass span," + 
				"        .ExternalClass font," + 
				"        .ExternalClass td," + 
				"        .ExternalClass div {" + 
				"          line-height: 100%; " + 
				"        }" + 
				"        .apple-link a {" + 
				"          color: inherit !important;" + 
				"          font-family: inherit !important;" + 
				"          font-size: inherit !important;" + 
				"          font-weight: inherit !important;" + 
				"          line-height: inherit !important;" + 
				"          text-decoration: none !important; " + 
				"        }" + 
				"        #MessageViewBody a {" + 
				"          color: inherit;" + 
				"          text-decoration: none;" + 
				"          font-size: inherit;" + 
				"          font-family: inherit;" + 
				"          font-weight: inherit;" + 
				"          line-height: inherit;" + 
				"        }" + 
				"        .btn-primary table td:hover {" + 
				"          background-color: #34495e !important; " + 
				"        }" + 
				"        .btn-primary a:hover {" + 
				"          background-color: #34495e !important;" + 
				"          border-color: #34495e !important; " + 
				"        } " + 
				"      }" + 
				"" + 
				"    </style>" + 
				"  </head>";
		
		return start;
	}
	
	private String getBody(String logo,String salutoIniziale, String corpo1, String etichettaBottone, String linkBottone, String corpo2, String salutiFinali) {
		
		
		String  body ="<body class=\"\">" + 
				"    <span class=\"preheader\">Email da www.prenotazioneveloce.it.</span>" + 
				"    <div class=\"logo\"><img src=\""+logo+"\"/></div>" + 
				"    <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\">" + 
				"      <tr>" + 
				"        <td>&nbsp;</td>" + 
				"        <td class=\"container\">" + 
				"          <div class=\"content\">" + 
				"" + 
				"            <!-- START CENTERED WHITE CONTAINER -->" + 
				"            <table role=\"presentation\" class=\"main\">" + 
				"" + 
				"              <!-- START MAIN CONTENT AREA -->" + 
				"              <tr>" + 
				"                <td class=\"wrapper\">" + 
				"                  <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">" + 
				"                    <tr>" + 
				"                      <td>" + 
				"                        <p>" + salutoIniziale + "</p>" + 
				"                        <p>"+corpo1+"</p>" + getButton(etichettaBottone, linkBottone)+
				"                        <p>"+corpo2+"</p>" + 
				"                        <p>"+salutiFinali+"</p>" + 
				"                      </td>" + 
				"                    </tr>" + 
				"                  </table>" + 
				"                </td>" + 
				"              </tr>" + 
				"" + 
				"            <!-- END MAIN CONTENT AREA -->" + 
				"            </table>" + 
				"            <!-- END CENTERED WHITE CONTAINER -->" + 
				"" + 
				"            <!-- START FOOTER -->" + 
				"            <div class=\"footer\">" + 
				"              <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">" + 
				"                <tr>" + 
				"                  <td class=\"content-block\">" + 
				"                    <span class=\"apple-link\">fioraio - App Mail</span>" + 
				"                    <br> Non vuoi ricevere questa mail? <a href=\"#\">Unsubscribe</a>." + 
				"                  </td>" + 
				"                </tr>" + 
				"              </table>" + 
				"            </div>" + 
				"            <!-- END FOOTER -->" + 
				"" + 
				"          </div>" + 
				"        </td>" + 
				"        <td>&nbsp;</td>" + 
				"      </tr>" + 
				"    </table>" + 
				"  </body>" + 
				"</html>";
		return body;
	}
	
	private String getButton(String etichetta, String link) {
		String button="<table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\">" + 
				"                          <tbody>" + 
				"                            <tr>" + 
				"                              <td align=\"left\">" + 
				"                                <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">" + 
				"                                  <tbody>" + 
				"                                    <tr>" + 
				"                                      <td> <a href=\""+link+"\" target=\"_blank\">"+etichetta+"</a> </td>" + 
				"                                    </tr>" + 
				"                                  </tbody>" + 
				"                                </table>" + 
				"                              </td>" + 
				"                            </tr>" + 
				"                          </tbody>" + 
				"                        </table>";
		if(etichetta!=null && !etichetta.isEmpty() && link!=null && !link.isEmpty()) {
			return button;
		}
		return "";
	}

}

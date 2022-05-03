package it.bitify.fioraio.util;

import it.bitify.fioraio.exception.BadRequestException;
import it.bitify.fioraio.util.AppConstants;

/*******************************************************************************************
 * Created by E. Nappi.
 ******************************************************************************************/
public class PageUtils {

	public static void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
	
}

package hupiat.intranet.server.core.controllers;

import java.util.NoSuchElementException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ErrorController extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    protected ResponseEntity<Object> handleInternalError(RuntimeException ex, WebRequest request) {
	return handleExceptionInternal(ex, "Technical error", new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR,
		request);
    }

    @ExceptionHandler(value = { IllegalArgumentException.class, IllegalStateException.class })
    protected ResponseEntity<Object> handleBadRequest(RuntimeException ex, WebRequest request) {
	return handleExceptionInternal(ex, "Malformed query or internal corruption, see for details : ",
		new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = { NoSuchElementException.class })
    protected ResponseEntity<Object> handleNotFoundResource(RuntimeException ex, WebRequest request) {
	return handleExceptionInternal(ex, "Requested resource not found", new HttpHeaders(), HttpStatus.NOT_FOUND,
		request);
    }
}

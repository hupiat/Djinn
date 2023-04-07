package hupiat.intranet.server.core.errors;

import java.util.NoSuchElementException;

public interface CommonControllerExceptions {

    default void throwErrorNotFound(long id) {
	throw new NoSuchElementException("Could not found id : " + id);
    }
}

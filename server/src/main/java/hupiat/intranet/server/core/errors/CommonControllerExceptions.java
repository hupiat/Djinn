package hupiat.intranet.server.core.errors;

import java.util.NoSuchElementException;

public interface CommonControllerExceptions {

    default void throwErrorNotFound(int id) {
	throw new NoSuchElementException("Could not found id : " + id);
    }
}

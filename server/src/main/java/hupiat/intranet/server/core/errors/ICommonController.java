package hupiat.intranet.server.core.errors;

import java.util.NoSuchElementException;

public interface ICommonController {

    static final String API_PREFIX = "api";

    default void throwErrorNotFound(long id) {
	throw new NoSuchElementException("Could not found id : " + id);
    }
}

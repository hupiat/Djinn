package hupiat.intranet.server.core.controllers;

import java.util.NoSuchElementException;

public interface ICommonController {

    static final String API_PREFIX = "api";

    static final String PATH_METADATA = "metadata";

    static final String PATH_API_EQUIPMENTS = API_PREFIX + "/equipments";

    default void throwErrorNotFound(long id) {
	throw new NoSuchElementException("Could not found id : " + id);
    }
}

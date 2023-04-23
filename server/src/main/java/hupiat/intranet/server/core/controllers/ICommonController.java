package hupiat.intranet.server.core.controllers;

import java.util.NoSuchElementException;

public interface ICommonController {

    static final String PATH_ROOT = "/";
    static final String PATH_STATIC = PATH_ROOT + "static";
    static final String API_PREFIX = "api";

    static final String PATH_METADATA = "metadata";

    static final String PATH_API_LOGIN = API_PREFIX + "/login";
    static final String PATH_API_LOGOUT = API_PREFIX + "/logout";

    static final String PATH_API_ASSETS = API_PREFIX + "/assets";

    default void throwErrorNotFound(long id) {
	throw new NoSuchElementException("Could not found id : " + id);
    }
}

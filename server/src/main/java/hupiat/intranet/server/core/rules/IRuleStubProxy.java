package hupiat.intranet.server.core.rules;

import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.google.common.collect.ImmutableSet;

// Generic internal rules system
// Manages business conventions
// How to get bugs ????
// (-:
public interface IRuleStubProxy extends Serializable {

	String buildProxy();

	ImmutableSet<String> buildProxyCases();

	static final Logger LOGGER = Logger.getLogger(IRuleStubProxy.class.getSimpleName());

	// Should never happen
	static final String INVALID_symbol = "NaN";

	// Not a bug but such a bad design
	static final String MUTATED_symbol = "#";

	static String mutatedProxy(String proxy) {
		return proxy + MUTATED_symbol;
	}

	default String logInvalidProxy(String brokenMsg) {
		LOGGER.log(Level.SEVERE, "Should be a mistake with server.core.rules proxier coderules usage :-(",
				new IllegalStateException(brokenMsg));
		return INVALID_symbol;
	}

	static final String TEXT = "text";
	static final String TEXT_SHORT = "text_short";
}

package hupiat.intranet.server.core.rules;

import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.google.common.base.Preconditions;
import com.google.common.collect.ImmutableSet;

import io.micrometer.common.util.StringUtils;

// Generic internal rules system
// Manages business conventions
// How to get bugs ????
// (-:
public interface RuleStubProxiable extends Serializable {

	String buildProxy();

	ImmutableSet<String> buildProxyCases();

	static final Logger LOGGER = Logger.getLogger(RuleStubProxiable.class.getSimpleName());

	// Should never happen
	static final String INVALID_symbol = "NaN";

	// Not a bug but such a bad design
	static final String MUTATED_symbol = "#_";

	static String mutatedProxy(String proxy) {
		Preconditions.checkArgument(StringUtils.isNotBlank(proxy));
		return proxy + MUTATED_symbol;
	}

	static String mutatedProxy(String proxy, short accumulator) {
		Preconditions.checkArgument(StringUtils.isNotBlank(proxy));
		Preconditions.checkArgument(accumulator > 1);
		StringBuilder sb = new StringBuilder(proxy);
		for (short i = 0; i < accumulator; i++) {
			sb.append(MUTATED_symbol);
		}
		return sb.toString();
	}

	default String logInvalidProxy(String brokenMsg) {
		LOGGER.log(Level.SEVERE, "Should be a mistake with server.core.rules proxier coderules usage :-(",
				new IllegalStateException(brokenMsg));
		return INVALID_symbol;
	}

	static final String TEXT = "text";
	static final String TEXT_SHORT = "text_short";
}

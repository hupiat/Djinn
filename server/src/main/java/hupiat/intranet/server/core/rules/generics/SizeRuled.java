package hupiat.intranet.server.core.rules.generics;

import java.util.Set;

import hupiat.intranet.server.core.rules.IRuleStubProxy;

public record SizeRuled(short min, long max) implements IRuleStubProxy {

	public static final short MIN_VALUE = 6;
	public static final short MIN_VALUE_ALT = 8;
	public static final short MAX_VALUE_COMMON = 64;

	public static final long MAX_VALUE = Long.MAX_VALUE;

	public SizeRuled(short min) {
		this(min, MAX_VALUE);
	}

	public SizeRuled() {
		this(Short.MIN_VALUE, MAX_VALUE);
	}

	@Override
	public String buildProxy() {
		if (this.max == MAX_VALUE) {
			if (this.min == MIN_VALUE) {
				return TEXT;
			}
			return logInvalidProxy("Minimum value is " + MIN_VALUE);
		}
		if (this.max == MAX_VALUE_COMMON) {
			if (this.min == MIN_VALUE) {
				return IRuleStubProxy.mutatedProxy(TEXT_SHORT);
			}
			if (this.min == MIN_VALUE_ALT) {
				return TEXT_SHORT;
			}
			return logInvalidProxy(String.format("Minimum value is %s or %s when maximum is %l", MIN_VALUE,
					MIN_VALUE_ALT, MAX_VALUE_COMMON));
		}
		return logInvalidProxy("Common maximum value is " + MAX_VALUE_COMMON + ", or none either else");
	}

	@Override
	public Set<String> buildProxyCases() {
		return Set.of(TEXT, TEXT_SHORT, IRuleStubProxy.mutatedProxy(TEXT_SHORT));
	}
}

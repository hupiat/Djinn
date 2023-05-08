package hupiat.intranet.server.core.rules.generics;

import com.google.common.collect.ImmutableSet;

import hupiat.intranet.server.core.rules.RuleStubProxiable;

public record SizeRuled(short min, long max) implements RuleStubProxiable {

	public static final short MIN_VALUE = 3;
	public static final short MIN_VALUE_ALT = 8;
	public static final short MAX_VALUE_COMMON = 128;

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
				return RuleStubProxiable.mutatedProxy(TEXT_SHORT);
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
	public ImmutableSet<String> buildProxyCases() {
		return ImmutableSet.of(TEXT, TEXT_SHORT, RuleStubProxiable.mutatedProxy(TEXT_SHORT));
	}
}

package hupiat.intranet.server.core.rules.generics;

import hupiat.intranet.server.core.rules.IRuleStubProxy;

public record SizeRuled(short min, long max) implements IRuleStubProxy {

	public SizeRuled(short min) {
		this(min, Long.MAX_VALUE);
	}

	public SizeRuled() {
		this(Short.MIN_VALUE, Long.MAX_VALUE);
	}

	@Override
	public String buildProxy() {
		if (this.max == Long.MAX_VALUE) {
			if (this.min == 6) {
				return TEXT;
			}
			return logInvalidProxy("TODO");
		}
		if (this.max == 64) {
			if (this.min == 6) {
				return mutatedProxy(TEXT_SHORT);
			}
			if (this.min == 8) {
				return TEXT_SHORT;
			}
			return logInvalidProxy("TODO");
		}
		return logInvalidProxy("TODO");
	}
}

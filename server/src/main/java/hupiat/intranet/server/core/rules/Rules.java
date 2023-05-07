package hupiat.intranet.server.core.rules;

import java.util.Set;

import hupiat.intranet.server.core.rules.generics.SizeRuled;

public record Rules(Set<RuleStubBuilder<? extends IRuleStubProxy>> stubs) {

	public Rules() {
		this(Set.of(new RuleStubBuilder<SizeRuled>(SizeRuled.class)));
	}
}

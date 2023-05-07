package hupiat.intranet.server.core.rules;

import java.util.Set;

import hupiat.intranet.server.core.rules.generics.SizeRuled;

public record Rules(Set<RuleStub<SizeRuled>> stubs) {

//	public Rules() {
//		// this(new Size(6))
//	}
}

package hupiat.intranet.server.core.rules;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

import com.google.common.base.Predicates;
import com.google.common.collect.ImmutableMap;

import hupiat.intranet.server.core.rules.generics.SizeRuled;

public record RuleStubBuilder<T extends RuleStubProxiable>(Class<T> clazz) implements Serializable {

	private static final ImmutableMap<String, ? extends RuleStubProxiable> constraints = ImmutableMap.of(
			RuleStubProxiable.TEXT, new SizeRuled(SizeRuled.MIN_VALUE), RuleStubProxiable.TEXT_SHORT,
			new SizeRuled(SizeRuled.MIN_VALUE, SizeRuled.MAX_VALUE_COMMON),
			RuleStubProxiable.mutatedProxy(RuleStubProxiable.TEXT_SHORT),
			new SizeRuled(SizeRuled.MIN_VALUE_ALT, SizeRuled.MAX_VALUE_COMMON));

	public Map<String, T> build() {
		var res = new LinkedHashMap<String, T>();
		var predicate = Predicates.instanceOf(clazz);
		for (var entry : constraints.entrySet()) {
			if (predicate.apply(entry.getValue())) {
				res.put(entry.getKey(), clazz.cast(entry.getValue()));
			}
		}
		return res;
	}
}

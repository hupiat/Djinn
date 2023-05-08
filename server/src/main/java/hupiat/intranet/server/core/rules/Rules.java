package hupiat.intranet.server.core.rules;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.google.common.base.Preconditions;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMultiset;

import hupiat.intranet.server.core.rules.generics.SizeRuled;

// Cannot use ClassToInstanceMap due to genericity (would be verbose any case, at use)

// records are final but there is no mixining goal so it seems being the best choice

@Service
public record Rules(ImmutableMultiset<RuleStubBuilder<? extends RuleStubProxiable>> stubs) {

	private static final ImmutableList<Class<? extends RuleStubProxiable>> allRules = ImmutableList.of(SizeRuled.class);

	public Rules() {
		this(ImmutableMultiset.of(new RuleStubBuilder<SizeRuled>(SizeRuled.class)));
	}

	@SuppressWarnings("unchecked")
	private <T extends RuleStubProxiable> RuleStubBuilder<T> getInternal(Class<T> clazz) {
		int i = 0;
		for (; i < allRules.size(); i++) {
			if (clazz.equals(allRules.get(i))) {
				break;
			}
		}
		Preconditions.checkPositionIndex(i, allRules.size());
		var builder = (RuleStubBuilder<T>) stubs.asList().get(i);
		Preconditions.checkState(builder != null && builder instanceof RuleStubBuilder<T>);
		return builder;
	}

	public <T extends RuleStubProxiable> Map<String, T> get(Class<T> clazz) {
		return this.getInternal(clazz).build();
	}

	@SuppressWarnings("unchecked")
	public Map<String, ? extends RuleStubProxiable> getAll() {
		Map<String, ? extends RuleStubProxiable> res = new LinkedHashMap<>();
		for (var rule : allRules) {
			res.putAll(res.getClass().cast(this.get(rule)));
		}
		return res;
	}
}

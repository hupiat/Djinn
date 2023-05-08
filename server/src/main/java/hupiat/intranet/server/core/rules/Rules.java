package hupiat.intranet.server.core.rules;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.google.common.base.Preconditions;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMultiset;

import hupiat.intranet.server.core.rules.generics.SizeRuled;

// Cannot use ClassToInstanceMap due to genericity (would be verbose any case, at use)

@Service
public record Rules(ImmutableMultiset<RuleStubBuilder<? extends IRuleStubProxy>> stubs) {

	private static final ImmutableList<Class<? extends IRuleStubProxy>> allRules = ImmutableList.of(SizeRuled.class);

	public Rules() {
		this(ImmutableMultiset.of(new RuleStubBuilder<SizeRuled>(SizeRuled.class)));
	}

	@SuppressWarnings("unchecked")
	private <T extends IRuleStubProxy> RuleStubBuilder<T> getInternal(Class<T> clazz) {
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

	public <T extends IRuleStubProxy> Map<String, T> get(Class<T> clazz) {
		return this.getInternal(clazz).build();
	}

	@SuppressWarnings("unchecked")
	public Map<String, ? extends IRuleStubProxy> getAll() {
		Map<String, ? extends IRuleStubProxy> res = new LinkedHashMap<>();
		for (var rule : allRules) {
			res.putAll(res.getClass().cast(this.get(rule)));
		}
		return res;
	}
}

package hupiat.intranet.server.core.controllers;

import java.io.Serializable;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hupiat.intranet.server.core.rules.RuleStubProxiable;
import hupiat.intranet.server.core.rules.Rules;

@RestController
public class MetadataController implements ICommonController {

	private final Rules rules;

	public MetadataController(Rules rules) {
		super();
		this.rules = rules;
	}

	private record HandshakeInitDTO(String apiPrefix, Map<String, ? extends RuleStubProxiable> rules)
			implements Serializable {
	}

	@GetMapping(ICommonController.PATH_METADATA_HANDSHAKE)
	public HandshakeInitDTO getHandshakeInit() {
		return new HandshakeInitDTO(API_PREFIX, rules.getAll());
	}

}
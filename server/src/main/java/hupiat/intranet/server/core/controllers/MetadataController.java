package hupiat.intranet.server.core.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MetadataController implements ICommonController {

	private record HandshakeInitDTO(String apiPrefix) {
	}

	@GetMapping(ICommonController.PATH_METADATA_HANDSHAKE)
	public HandshakeInitDTO getHandshakeInit() {
		return new HandshakeInitDTO(API_PREFIX);
	}

}
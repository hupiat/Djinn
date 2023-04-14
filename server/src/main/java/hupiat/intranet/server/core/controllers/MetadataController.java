package hupiat.intranet.server.core.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ICommonController.PATH_METADATA)
public class MetadataController implements ICommonController {

    private record HandshakeInitDTO(String apiPrefix) {
    }

    @GetMapping("handshake")
    public HandshakeInitDTO getHandshakeInit() {
	return new HandshakeInitDTO(API_PREFIX);
    }

}
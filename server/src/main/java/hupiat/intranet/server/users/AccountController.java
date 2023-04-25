package hupiat.intranet.server.users;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

    private record AccountDTO(String login, String password) {
    }

    @PostMapping
    Account login(@RequestBody AccountDTO accountDTO) {
	// SecurityContext
	// SecurityContextHolder.getContext().setAuthentication(null);
    }
}

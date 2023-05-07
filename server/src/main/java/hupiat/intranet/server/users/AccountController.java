package hupiat.intranet.server.users;

import java.io.Serializable;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hupiat.intranet.server.core.annotations.NotBlankSized;
import hupiat.intranet.server.core.controllers.ICommonController;
import jakarta.validation.Valid;

@RestController
public class AccountController implements ICommonController {

	private final AuthenticationProvider accountAuthProvider;
	private final AccountRepository accountRepository;

	public AccountController(AuthenticationProvider accountAuthProvider, AccountRepository accountRepository) {
		super();
		this.accountAuthProvider = accountAuthProvider;
		this.accountRepository = accountRepository;
	}

	private record AccountTypingTokenDTO(@NotBlankSized(min = 6, max = 64) String login,
			@NotBlankSized(min = 8, max = 64) String password) implements Serializable {
	}

	@PostMapping(ICommonController.PATH_API_LOGIN)
	Account login(@RequestBody @Valid AccountTypingTokenDTO token) {
		Authentication auth = accountAuthProvider
				.authenticate(new UsernamePasswordAuthenticationToken(token.login, token.password));
		Account account = accountRepository.findByName(token.login).orElseThrow();
		SecurityContextHolder.getContext().setAuthentication(auth);
		account.setPassword(null);
		return account;
	}
}

package hupiat.intranet.server.users;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hupiat.intranet.server.core.controllers.ICommonController;

@RestController
public class AccountController {

	private final AuthenticationProvider accountAuthProvider;
	private final AccountRepository accountRepository;

	public AccountController(AuthenticationProvider accountAuthProvider, AccountRepository accountRepository) {
		super();
		this.accountAuthProvider = accountAuthProvider;
		this.accountRepository = accountRepository;
	}

	@PostMapping(ICommonController.PATH_API_LOGIN)
	Account login(@RequestBody UsernamePasswordAuthenticationToken token) {
		Authentication auth = accountAuthProvider.authenticate(token);
		Account account = accountRepository.findByName(token.getName()).orElseThrow();
		SecurityContextHolder.getContext().setAuthentication(auth);
		account.setPassword(null);
		return account;
	}
}

package hupiat.intranet.server.users;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

import java.io.Serializable;
import java.util.ArrayList;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import hupiat.intranet.server.core.annotations.NotBlankSized;
import hupiat.intranet.server.core.controllers.ICommonController;
import hupiat.intranet.server.core.rules.generics.SizeRuled;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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

	private record AccountTypingTokenDTO(
			@NotBlankSized(min = SizeRuled.MIN_VALUE, max = SizeRuled.MAX_VALUE_COMMON) String name,
			@NotBlankSized(min = SizeRuled.MIN_VALUE_ALT, max = SizeRuled.MAX_VALUE_COMMON) String password)
			implements Serializable {
	}

	@PostMapping(ICommonController.PATH_API_LOGIN)
	Account login(@ModelAttribute @Valid AccountTypingTokenDTO token, HttpServletRequest req) {
		Authentication auth = accountAuthProvider
				.authenticate(new UsernamePasswordAuthenticationToken(token.name, token.password, new ArrayList<>()));
		Account account = accountRepository.findByName(token.name).orElseThrow();
		SecurityContext sc = SecurityContextHolder.getContext();
		sc.setAuthentication(auth);
		HttpSession session = req.getSession(true);
		session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);
		account.setPassword(null);
		return account;
	}

	@DeleteMapping(ICommonController.PATH_API_LOGOUT)
	Account logout(HttpSession session) {
		SecurityContext context = SecurityContextHolder.getContext();
		Authentication token = context.getAuthentication();
		Account account = accountRepository.findByName(token.getName()).orElseThrow();
		session.removeAttribute(SPRING_SECURITY_CONTEXT_KEY);
		return account;
	}
}

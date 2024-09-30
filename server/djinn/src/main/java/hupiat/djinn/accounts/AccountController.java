package hupiat.djinn.accounts;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hupiat.djinn.core.controllers.ICommonController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping(ICommonController.API_PREFIX + "/" + ICommonController.API_ACCOUNTS)
public class AccountController implements ICommonController<AccountEntity> {

	private final AccountRepository accountRepository;
	private final AccountService accountService;
	private final AccountAuthProvider accountAuthProvider;

	public AccountController(AccountRepository accountRepository, AccountService accountService,
			AccountAuthProvider accountAuthProvider) {
		super();
		this.accountRepository = accountRepository;
		this.accountService = accountService;
		this.accountAuthProvider = accountAuthProvider;
	}

	@Override
	public List<AccountEntity> getAll() {
		return accountRepository.findAll();
	}

	@Override
	public AccountEntity getById(long id) {
		return accountRepository.findById(id).orElseThrow();
	}

	@Override
	public AccountEntity add(AccountEntity entity) {
		return accountService.insert(entity.getUsername(), entity.getEmail(), entity.getPassword());
	}

	@Override
	public AccountEntity update(AccountEntity entity) {
		return accountService.update(entity, true);
	}

	@Override
	public void delete(long id) {
		accountRepository.deleteById(id);
	}

	@PostMapping("login")
	public AccountEntity login(AccountEntity account, HttpServletRequest req) {
		Authentication auth = accountAuthProvider.authenticate(
				new UsernamePasswordAuthenticationToken(account.getEmail(), account.getPassword(), new ArrayList<>()));
		SecurityContext sc = SecurityContextHolder.getContext();
		sc.setAuthentication(auth);
		HttpSession session = req.getSession(true);
		session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);
		return accountRepository.findByEmail(account.getEmail()).orElseThrow();
	}

	@DeleteMapping("logout")
	public AccountEntity logout(HttpSession session) {
		SecurityContext context = SecurityContextHolder.getContext();
		Authentication token = context.getAuthentication();
		AccountEntity account = accountRepository.findByEmail(token.getName()).orElseThrow();
		session.removeAttribute(SPRING_SECURITY_CONTEXT_KEY);
		return account;
	}
}

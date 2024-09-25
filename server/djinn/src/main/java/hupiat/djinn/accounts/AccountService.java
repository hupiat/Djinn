package hupiat.djinn.accounts;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class AccountService implements UserDetailsService {

	private final AccountRepository accountRepository;
	private final BCryptPasswordEncoder passwordEncoder;

	public AccountService(AccountRepository repository, BCryptPasswordEncoder passwordEncoder) {
		super();
		this.accountRepository = repository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return accountRepository.findByUsername(username).orElseThrow();
	}

	public AccountEntity insert(String username, String email, String password) {
		AccountEntity entity = new AccountEntity();
		entity.setEmail(email);
		entity.setUsername(username);
		entity.setPassword(password);
		entity = accountRepository.save(entity);
		return entity;
	}

	public AccountEntity update(AccountEntity newEntity, boolean shouldEncode) {
		if (shouldEncode) {
			newEntity.setPassword(passwordEncoder.encode(newEntity.getPassword()));
		}
		return accountRepository.save(newEntity);
	}
}

package hupiat.djinn.accounts;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class AccountService implements UserDetailsService {

	private final AccountRepository repository;
	private final BCryptPasswordEncoder passwordEncoder;

	public AccountService(AccountRepository repository, BCryptPasswordEncoder passwordEncoder) {
		super();
		this.repository = repository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return repository.findByUsername(username).orElseThrow();
	}

}

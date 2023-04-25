package hupiat.intranet.server.users;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AccountService implements UserDetailsService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
	super();
	this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	return accountRepository.findByName(username).orElseThrow();
    }

}

package hupiat.intranet.server.users;

import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.Properties;
import java.util.Set;
import java.util.function.Predicate;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import hupiat.intranet.server.core.utils.FileUtils;

// Instantiated by SecurityConfigAdapter
public class AccountService implements UserDetailsService {

	private static final Logger LOGGER = Logger.getGlobal();

	private final AccountRepository accountRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	public AccountService(AccountRepository accountRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
		super();
		this.accountRepository = accountRepository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
		checkForDefaultUsers();
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return accountRepository.findByName(username).orElseThrow();
	}

	private final List<String> USERS = List.of("user_name");

	@Transactional(propagation = Propagation.NEVER, isolation = Isolation.SERIALIZABLE)
	private void checkForDefaultUsers() {
		List<Account> accounts = accountRepository.findByNameIn(Set.copyOf(USERS));

		Predicate<String> predicate = u -> accounts.stream().map(Account::getName).noneMatch(a -> Objects.equals(a, u));

		if (USERS.stream().anyMatch(predicate)) {
			List<Account> toInsert = new LinkedList<>();
			Properties local = FileUtils.readProperties(FileUtils.LOCAL_PROPERTIES);
			Properties local_secured = null;
			for (String missing : USERS.stream().filter(predicate).collect(Collectors.toList())) {
				Object username = local.get(missing);
				if (username == null) {
					continue;
				}
				// Cleaning buffer for pass files
				local_secured = FileUtils.readProperties(FileUtils.LOCAL_SEC_PROPERTIES);
				String password = null;
				Object tmp_password = local_secured.get(missing.split("_")[0] + "_password");
				local_secured = null;
				if (tmp_password == null) {
					continue;
				} else {
					password = bCryptPasswordEncoder.encode(((String) tmp_password));
					tmp_password = null;
				}
				Account account = new Account();
				account.setName((String) username);
				account.setPassword(password);
				account.setDescription("Default user");
				toInsert.add(account);
				LOGGER.log(Level.INFO, "[" + username + "] will be inserted");
			}
			accountRepository.saveAll(toInsert);
		}
	}
}

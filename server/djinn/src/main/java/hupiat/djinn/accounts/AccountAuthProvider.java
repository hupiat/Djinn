package hupiat.djinn.accounts;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class AccountAuthProvider implements AuthenticationProvider {

	private final static String EXCEPTION = "Could not authenticate";

	private final UserDetailsService userDetailsService;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	public AccountAuthProvider(UserDetailsService userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.userDetailsService = userDetailsService;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String username = authentication.getPrincipal().toString();

		UserDetails user;
		try {
			user = userDetailsService.loadUserByUsername(username);
		} catch (Exception e) {
			throw new AuthenticationServiceException(EXCEPTION, e);
		}

		AccountEntity accountEntity = (AccountEntity) user;
		if (bCryptPasswordEncoder.matches(authentication.getCredentials().toString(), user.getPassword())) {
			return authentication;
		}

		throw new AuthenticationServiceException(EXCEPTION + " (bad credentials) ");
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return Authentication.class.isInstance(authentication);
	}

}
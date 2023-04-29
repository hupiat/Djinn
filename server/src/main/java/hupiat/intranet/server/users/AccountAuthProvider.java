package hupiat.intranet.server.users;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
		String password = bCryptPasswordEncoder.encode(authentication.getCredentials().toString());

		UserDetails user;
		try {
			user = userDetailsService.loadUserByUsername(username);
		} catch (Exception e) {
			throw new AuthenticationServiceException(EXCEPTION, e);
		}

		if (bCryptPasswordEncoder.matches(password, user.getPassword())) {
			return new UsernamePasswordAuthenticationToken(user.getUsername(), password);
		}

		throw new AuthenticationServiceException(EXCEPTION + " (bad credentials) ");
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return Authentication.class.isInstance(authentication);
	}

}

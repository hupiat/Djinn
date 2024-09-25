package hupiat.djinn.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import hupiat.djinn.accounts.AccountAuthProvider;
import hupiat.djinn.accounts.AccountRepository;
import hupiat.djinn.accounts.AccountService;
import hupiat.djinn.core.controllers.ICommonController;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private final AccountRepository accountRepository;

	public SecurityConfig(AccountRepository accountRepository) {
		super();
		this.accountRepository = accountRepository;
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(auth -> auth
						.requestMatchers(HttpMethod.POST,
								ICommonController.API_PREFIX + "/" + ICommonController.API_ACCOUNTS + "/login")
						.permitAll().anyRequest().authenticated());

		return http.build();
	}

	@Bean
	BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	UserDetailsService userDetailsService() {
		return new AccountService(accountRepository, bCryptPasswordEncoder());
	}

	@Bean
	AuthenticationProvider authenticationProvider() {
		return new AccountAuthProvider(userDetailsService(), bCryptPasswordEncoder());
	}
}
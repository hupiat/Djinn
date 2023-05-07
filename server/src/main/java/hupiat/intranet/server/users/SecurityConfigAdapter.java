package hupiat.intranet.server.users;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import hupiat.intranet.server.core.controllers.ICommonController;
import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
public class SecurityConfigAdapter {

	private final AccountRepository accountRepository;

	public SecurityConfigAdapter(AccountRepository accountRepository) {
		super();
		this.accountRepository = accountRepository;
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests()
				.requestMatchers(ICommonController.PATH_ROOT,
						ICommonController.getRecursivePath(ICommonController.PATH_STATIC),
						ICommonController.PATH_METADATA_HANDSHAKE, ICommonController.PATH_API_LOGIN)
				.permitAll().anyRequest().authenticated().and()
				.logout(logout -> logout.logoutUrl(ICommonController.PATH_API_LOGOUT)
						.logoutSuccessUrl(ICommonController.PATH_ROOT))
				.formLogin(AbstractHttpConfigurer::disable).cors(new Customizer<CorsConfigurer<HttpSecurity>>() {
					@Override
					public void customize(CorsConfigurer<HttpSecurity> configurer) {
						configurer.configurationSource(new CorsConfigurationSource() {
							@Override
							public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
								var config = new CorsConfiguration();
								config.setAllowedMethods(List.of(HttpMethod.GET.toString(), HttpMethod.POST.toString(),
										HttpMethod.PUT.toString(), HttpMethod.DELETE.toString()));
								config.setAllowCredentials(true);
								config.setAllowedOriginPatterns(List.of("127.0.0.1", "localhost", "192.168.*"));
								config.applyPermitDefaultValues();
								config.validateAllowCredentials();
								return config;
							}
						});
						configurer.configure(http);
					}
				});

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

package hupiat.djinn.accounts;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import hupiat.djinn.core.entities.AbstractCommonEntity;
import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "accounts")
public class AccountEntity extends AbstractCommonEntity implements UserDetails {

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false, unique = true)
	private String username;

	@Column(nullable = false)
	@JsonIgnore
	private String password;

	@Nullable
	private byte[] picture;

	public AccountEntity() {
		super();
	}

	@Override
	@JsonProperty
	public String getPassword() {
		return password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public byte[] getPicture() {
		return picture;
	}

	public void setPicture(byte[] picture) {
		this.picture = picture;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	// TODO : not implemented yet
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String toString() {
		return "AccountEntity [email=" + email + ", username=" + username + "]";
	}

}

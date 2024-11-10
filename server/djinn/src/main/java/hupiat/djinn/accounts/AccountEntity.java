package hupiat.djinn.accounts;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import hupiat.djinn.core.entities.AbstractCommonEntity;
import hupiat.djinn.curriculums.CVInformationEntity;
import jakarta.annotation.Nullable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "accounts")
public class AccountEntity extends AbstractCommonEntity implements UserDetails {

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false, unique = true)
	private String username;

	@Column(nullable = false)
	private String password;

	@Nullable
	private byte[] picture;

	@Nullable
	private String linkedin;

	@OneToMany(cascade = CascadeType.ALL)
	private List<CVInformationEntity> informations;

	public AccountEntity() {
		super();
	}

	@Override
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

	public String getLinkedin() {
		return linkedin;
	}

	public void setLinkedin(String linkedin) {
		this.linkedin = linkedin;
	}

	public List<CVInformationEntity> getInformations() {
		return informations;
	}

	public void setInformations(List<CVInformationEntity> informations) {
		this.informations = informations;
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

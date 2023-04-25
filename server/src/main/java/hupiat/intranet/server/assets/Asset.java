package hupiat.intranet.server.assets;

import java.util.LinkedHashSet;
import java.util.Set;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import hupiat.intranet.server.assets.attributes.AssetAttribute;
import hupiat.intranet.server.core.entities.AbstractEntityObject;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotEmpty;

@Entity
public class Asset extends AbstractEntityObject<Short> {

	@Lob
	@NotEmpty
	private byte[] picture;

	@Cascade(CascadeType.ALL)
	@OneToMany
	private Set<AssetAttribute> attributes = new LinkedHashSet<>();

	public Set<AssetAttribute> getAttributes() {
		return attributes;
	}

	public void setAttributes(Set<AssetAttribute> attributes) {
		this.attributes = attributes;
	}

	public byte[] getPicture() {
		return picture;
	}

	public void setPicture(byte[] picture) {
		this.picture = picture;
	}

}

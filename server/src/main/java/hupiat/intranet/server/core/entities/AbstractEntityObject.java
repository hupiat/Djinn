package hupiat.intranet.server.core.entities;

import java.io.Serializable;
import java.util.Objects;

import hupiat.intranet.server.core.annotations.NotBlankSized;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class AbstractEntityObject<ID> implements Serializable {

	@Id
	@GeneratedValue
	protected ID id;

	@Column(columnDefinition = "character varying(64)", nullable = false, unique = true)
	@NotBlankSized(min = 6, max = 64)
	protected String name;

	@Column(columnDefinition = "TEXT", nullable = false)
	@NotBlankSized(min = 6)
	protected String description;

	public ID getId() {
		return id;
	}

	public void setId(ID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AbstractEntityObject<ID> other = (AbstractEntityObject<ID>) obj;
		return Objects.equals(id, other.id);
	}

}

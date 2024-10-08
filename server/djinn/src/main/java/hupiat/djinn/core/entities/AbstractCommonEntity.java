package hupiat.djinn.core.entities;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Entity
public abstract class AbstractCommonEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	protected long id;

	@Column(nullable = false)
	protected Date dateCreation = Date.from(Instant.now());

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}

	@Override
	public String toString() {
		return "AbstractCommonEntity [id=" + id + ", dateCreation=" + dateCreation + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	// Nice implementation since we have only one sequence
	// abstract_comment_entity_seq
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AbstractCommonEntity other = (AbstractCommonEntity) obj;
		return id == other.id;
	}
}

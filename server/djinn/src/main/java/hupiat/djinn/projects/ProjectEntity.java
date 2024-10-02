package hupiat.djinn.projects;

import hupiat.djinn.core.entities.AbstractCommonEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "projects")
public class ProjectEntity extends AbstractCommonEntity {

	@Column(nullable = false, unique = true)
	private String name;

	@Lob
	private byte[] file;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public byte[] getFile() {
		return file;
	}

	public void setFile(byte[] file) {
		this.file = file;
	}

	@Override
	public String toString() {
		return "ProjectEntity [name=" + name + "]";
	}
}

package hupiat.djinn.curriculums;

import hupiat.djinn.core.entities.AbstractCommonEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

@Entity
@Table(name = "cv_informations")
public class CVInformationEntity extends AbstractCommonEntity {

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private CVPart field;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String value;

	@Column(nullable = false)
	private boolean isArray;

	public CVPart getField() {
		return field;
	}

	public void setField(CVPart field) {
		this.field = field;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public boolean isArray() {
		return isArray;
	}

	public void setArray(boolean isArray) {
		this.isArray = isArray;
	}

	@Override
	public String toString() {
		return "CVInformationEntity [field=" + field + ", value=" + value + ", isArray=" + isArray + "]";
	}

}

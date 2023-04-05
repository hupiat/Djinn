package hupiat.intranet.server.equipments;

import java.util.LinkedHashSet;
import java.util.Set;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import hupiat.intranet.server.core.entities.AbstractEntityObject;
import jakarta.persistence.Entity;

@Entity
public class Equipment extends AbstractEntityObject<Short> {

    @Cascade(CascadeType.ALL)
    private Set<EquipmentAttribute> attributes = new LinkedHashSet<>();

    public Set<EquipmentAttribute> getAttributes() {
	return attributes;
    }

    public void setAttributes(Set<EquipmentAttribute> attributes) {
	this.attributes = attributes;
    }

}

package hupiat.intranet.server.equipments;

import java.util.LinkedHashSet;
import java.util.Set;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import hupiat.intranet.server.core.entities.AbstractEntityObject;
import hupiat.intranet.server.equipments.attributes.EquipmentAttribute;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
public class Equipment extends AbstractEntityObject<Short> {

    @Cascade(CascadeType.ALL)
    @OneToMany
    private Set<EquipmentAttribute> attributes = new LinkedHashSet<>();

    public Set<EquipmentAttribute> getAttributes() {
	return attributes;
    }

    public void setAttributes(Set<EquipmentAttribute> attributes) {
	this.attributes = attributes;
    }

}

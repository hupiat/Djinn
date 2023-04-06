package hupiat.intranet.server.equipments.attributes;

import java.text.DateFormat;
import java.text.ParseException;
import java.util.Date;
import java.util.function.Predicate;

import hupiat.intranet.server.core.entities.AbstractEntityObject;
import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
public class EquipmentAttribute extends AbstractEntityObject<Long> {

    @Enumerated(EnumType.STRING)
    private EquipmentAttributeType type;

    @Nullable
    private String value;

    public EquipmentAttributeType getType() {
	return type;
    }

    public void setType(EquipmentAttributeType type) {
	this.type = type;
    }

    @Nullable
    public String getValue() {
	return value;
    }

    public void setValue(@Nullable Object value) {
	if (value != null) {
	    EquipmentAttributeType.checkTypeOrThrow(value.getClass());
	    this.value = String.valueOf(value);
	}
    }

    private void checkTypeMismatch(Predicate<EquipmentAttributeType> predicate) {
	if (!predicate.test(type)) {
	    throw new IllegalAccessError(String.format("id : %l , type : %s", id, type.name()));
	}
    }

    public Integer getIntegerValueCopy() {
	checkTypeMismatch(t -> t == EquipmentAttributeType.INT);
	return Integer.parseInt(value);
    }

    public Double getDoubleValueCopy() {
	checkTypeMismatch(t -> t == EquipmentAttributeType.DOUBLE);
	return Double.parseDouble(value);
    }

    public Date getDateValueCopy() {
	checkTypeMismatch(t -> t == EquipmentAttributeType.DATE);
	try {
	    return DateFormat.getDateInstance().parse(value);
	} catch (ParseException e) {
	    throw new IllegalStateException(e.getMessage());
	}
    }

    public Boolean getBooleanValueCopy() {
	checkTypeMismatch(t -> t == EquipmentAttributeType.BOOLEAN);
	return Boolean.parseBoolean(value);
    }
}

package hupiat.intranet.server.assets.attributes;

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
public class AssetAttribute extends AbstractEntityObject<Long> {

    @Enumerated(EnumType.STRING)
    private AssetAttributeType type;

    @Nullable
    private String value;

    public AssetAttributeType getType() {
	return type;
    }

    public void setType(AssetAttributeType type) {
	this.type = type;
    }

    @Nullable
    public String getValue() {
	return value;
    }

    public void setValue(@Nullable Object value) {
	if (value != null) {
	    AssetAttributeType.checkTypeOrThrow(value.getClass());
	    this.value = String.valueOf(value);
	}
    }

    private void checkTypeMismatch(Predicate<AssetAttributeType> predicate) {
	if (!predicate.test(type)) {
	    throw new IllegalAccessError(String.format("id : %l , type : %s", id, type.name()));
	}
    }

    public Integer getIntegerValueCopy() {
	checkTypeMismatch(t -> t == AssetAttributeType.INT);
	return Integer.parseInt(value);
    }

    public Double getDoubleValueCopy() {
	checkTypeMismatch(t -> t == AssetAttributeType.DOUBLE);
	return Double.parseDouble(value);
    }

    public Date getDateValueCopy() {
	checkTypeMismatch(t -> t == AssetAttributeType.DATE);
	try {
	    return DateFormat.getDateInstance().parse(value);
	} catch (ParseException e) {
	    throw new IllegalStateException(e.getMessage());
	}
    }

    public Boolean getBooleanValueCopy() {
	checkTypeMismatch(t -> t == AssetAttributeType.BOOLEAN);
	return Boolean.parseBoolean(value);
    }
}

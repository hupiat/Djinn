package hupiat.intranet.server.equipments.attributes;

import java.util.Arrays;
import java.util.Date;

public enum EquipmentAttributeType {

    INT(Integer.class), DOUBLE(Double.class), STRING(String.class), DATE(Date.class), BOOLEAN(Boolean.class);

    private final Class<?> clazz;

    private EquipmentAttributeType(Class<?> clazz) {
	this.clazz = clazz;
    }

    public Class<?> getClazz() {
	return clazz;
    }

    public static void checkTypeOrThrow(Class<?> objClazz) {
	if (Arrays.stream(EquipmentAttributeType.values()).map(EquipmentAttributeType::getClazz)
		.noneMatch(clazz -> clazz.equals(objClazz))) {
	    throw new IllegalStateException(
		    "Unsupported attribute type : " + objClazz == null ? "null" : objClazz.getSimpleName());
	}
    }
}

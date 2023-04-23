package hupiat.intranet.server.assets.attributes;

import java.util.Arrays;
import java.util.Date;

public enum AssetAttributeType {

    INT(Integer.class), DOUBLE(Double.class), STRING(String.class), DATE(Date.class), BOOLEAN(Boolean.class);

    private final Class<?> clazz;

    private AssetAttributeType(Class<?> clazz) {
	this.clazz = clazz;
    }

    public Class<?> getClazz() {
	return clazz;
    }

    public static void checkTypeOrThrow(Class<?> objClazz) {
	if (Arrays.stream(AssetAttributeType.values()).map(AssetAttributeType::getClazz)
		.noneMatch(objClazz::equals)) {
	    throw new IllegalStateException(
		    "Unsupported attribute type : " + objClazz == null ? "null" : objClazz.getSimpleName());
	}
    }
}

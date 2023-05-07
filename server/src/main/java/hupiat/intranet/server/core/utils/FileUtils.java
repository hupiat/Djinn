package hupiat.intranet.server.core.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import jakarta.annotation.Nullable;

public abstract class FileUtils {

	public static final String LOCAL_PROPERTIES = "local.properties";
	public static final String LOCAL_SEC_PROPERTIES = "local_secured.properties";

	private static final Logger LOGGER = Logger.getLogger(FileUtils.class.getSimpleName());

	@Nullable
	public static Properties readProperties(String path) {
		Properties prop = null;
		String rootPath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
		try (FileInputStream fis = new FileInputStream(rootPath + path);) {
			prop = new Properties();
			prop.load(fis);
		} catch (IOException e) {
			LOGGER.log(Level.WARNING, "Error reading file", e);
		}
		return prop;
	}
}

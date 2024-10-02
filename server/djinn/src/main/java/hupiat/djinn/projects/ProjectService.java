package hupiat.djinn.projects;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.apache.commons.io.FileUtils;
import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

@Service
public class ProjectService {

	private static final Logger LOGGER = Logger.getLogger(ProjectService.class.getSimpleName());

	public void scan(ProjectEntity project) {
		File zipFile = new File(project.getName());
		try {
			FileUtils.writeByteArrayToFile(zipFile, project.getFile());
		} catch (IOException e) {
			LOGGER.log(Level.SEVERE, "Error while writing the file on the disk", e);
		}

		AutoDetectParser parser = new AutoDetectParser();
		BodyContentHandler handler = new BodyContentHandler();
		Metadata metadata = new Metadata();

		try (ZipInputStream inputStream = new ZipInputStream(new FileInputStream(zipFile))) {
			ZipEntry entry;
			while ((entry = inputStream.getNextEntry()) != null) {
				if (!entry.isDirectory()) {
					ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
					byte[] buffer = new byte[1024];
					int len;
					while ((len = inputStream.read(buffer)) > 0) {
						outputStream.write(buffer, 0, len);
					}
					try (ByteArrayInputStream fileInputStream = new ByteArrayInputStream(outputStream.toByteArray())) {
						parser.parse(fileInputStream, handler, metadata, new ParseContext());
						for (String name : metadata.names()) {
							LOGGER.log(Level.INFO, name + ": " + metadata.get(name));
						}
					} catch (SAXException | TikaException e) {
						LOGGER.log(Level.SEVERE, "Error while parsing the file", e);
					}
				}
			}
		} catch (IOException e) {
			LOGGER.log(Level.SEVERE, "Error while opening the file", e);
		}
	}
}

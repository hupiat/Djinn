package hupiat.intranet.server.equipments;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Equipment implements Serializable {

    @Id
    @GeneratedValue
    private short id;

    private String name;

    public short getId() {
	return id;
    }

    public void setId(short id) {
	this.id = id;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

}

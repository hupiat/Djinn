package hupiat.intranet.server.equipments;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("api/equipments")
public class EquipmentController {

    private final EquipmentRepository equipmentRepository;

    public EquipmentController(EquipmentRepository equipmentRepository) {
	super();
	this.equipmentRepository = equipmentRepository;
    }

    @GetMapping
    public List<Equipment> getAll() {
	return equipmentRepository.findAll();
    }

    @GetMapping("${id}")
    public Equipment getById(@PathVariable short id) {
	return equipmentRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Equipment add(@RequestBody Equipment equipment) {
	return equipmentRepository.save(equipment);
    }

    @PutMapping
    public Equipment update(@RequestBody Equipment equipment) {
	return equipmentRepository.save(equipment);
    }

    @DeleteMapping("${id}")
    public void delete(@PathVariable short id) {
	equipmentRepository.deleteById(id);
    }
}

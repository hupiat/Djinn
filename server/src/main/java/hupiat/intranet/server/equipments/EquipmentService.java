package hupiat.intranet.server.equipments;

import org.springframework.stereotype.Service;

import hupiat.intranet.server.equipments.attributes.EquipmentAttributeRepository;

@Service
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;
    private final EquipmentAttributeRepository equipmentAttributeRepository;

    public EquipmentService(EquipmentRepository equipmentRepository,
	    EquipmentAttributeRepository equipmentAttributeRepository) {
	super();
	this.equipmentRepository = equipmentRepository;
	this.equipmentAttributeRepository = equipmentAttributeRepository;
    }
}

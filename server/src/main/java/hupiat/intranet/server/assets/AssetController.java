package hupiat.intranet.server.assets;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hupiat.intranet.server.core.controllers.ICommonController;

@RestController
@RequestMapping(ICommonController.PATH_API_ASSETS)
public class AssetController implements ICommonController {

    private final AssetRepository assetRepository;

    public AssetController(AssetRepository equipmentRepository) {
	super();
	this.assetRepository = equipmentRepository;
    }

    @GetMapping
    public List<Asset> getAll() {
	return assetRepository.findAll();
    }

    @GetMapping("{id}")
    public Asset getById(@PathVariable short id) {
	return assetRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Asset add(@RequestBody Asset equipment) {
	return assetRepository.save(equipment);
    }

    @PutMapping
    public Asset update(@RequestBody Asset equipment) {
	return assetRepository.save(equipment);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable short id) {
	if (!assetRepository.existsById(id)) {
	    throwErrorNotFound(id);
	}
	assetRepository.deleteById(id);
    }
}

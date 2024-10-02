package hupiat.djinn.projects;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hupiat.djinn.core.controllers.ICommonController;

@RestController
@RequestMapping(ICommonController.API_PREFIX + "/" + ICommonController.API_PROJECTS)
public class ProjectController implements ICommonController<ProjectEntity> {

	private ProjectRepository projectRepository;
	private ProjectService projectService;

	public ProjectController(ProjectRepository projectRepository, ProjectService projectService) {
		super();
		this.projectRepository = projectRepository;
		this.projectService = projectService;
	}

	@Override
	public List<ProjectEntity> getAll() {
		return projectRepository.findAll();
	}

	@Override
	public ProjectEntity getById(long id) {
		return projectRepository.findById(id).orElseThrow();
	}

	@Override
	public ProjectEntity add(@RequestBody ProjectEntity entity) {
		projectService.scan(entity);
		return projectRepository.save(entity);
	}

	@Override
	public ProjectEntity update(@RequestBody ProjectEntity entity) {
		return projectRepository.save(entity);
	}

	@Override
	public void delete(long id) {
		projectRepository.deleteById(id);
	}

}

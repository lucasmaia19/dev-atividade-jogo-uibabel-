package com.example.atividade_caixa.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.atividade_caixa.model.AtividadeCaixa;
import com.example.atividade_caixa.modelDTO.AtividadeCaixaDTO;
import com.example.atividade_caixa.repository.AtividadeCaixaRepository;
import com.example.atividade_caixa.service.AtividadeCaixaService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("atividade-caixa")
//@Slf4j
public class AtividadeCaixaController {

	@Autowired
	private AtividadeCaixaRepository atividadeCaixaRepository;

	@Autowired
	private AtividadeCaixaService atividadeCaixaService;

	@SuppressWarnings("unlikely-arg-type")
	@GetMapping
	public List<AtividadeCaixa> listarAtividadeCaixa() {

		return atividadeCaixaRepository.findAll();

//		List<AtividadeCaixa> atividadeCaixaList = atividadeCaixaRepository.findAll();
//		return atividadeCaixaList.stream().filter(e -> e.getId().equals(33l)).collect(Collectors.toList());
		
//		AtividadeCaixa atividadeCaixa = new AtividadeCaixa();
//		atividadeCaixa.setId(10L);
//		atividadeCaixa.setPerguntaTitulo("Pergunta Título hehehe");
//		return Arrays.asList(atividadeCaixa);
	}

	@GetMapping("/{id}")
	public Optional<AtividadeCaixa> listarUmaAtividadeCaixa(@PathVariable Long id) {
		return atividadeCaixaRepository.findById(id);
	}

	@PostMapping
	public ResponseEntity<AtividadeCaixa> cadastrarAtividade(@ModelAttribute("atividadeDTO") AtividadeCaixaDTO atividadeDTO) throws IOException {
		return ResponseEntity.ok(atividadeCaixaService.cadastrarAtividade(atividadeDTO));
	}
	
	@DeleteMapping("/{id}")
	public Map<String, Object> deletarCadastro(@PathVariable Long id) {
		atividadeCaixaRepository.deleteById(id);

		Map<String, Object> responseMap = new HashMap<>();
		return responseMap;
	}

}

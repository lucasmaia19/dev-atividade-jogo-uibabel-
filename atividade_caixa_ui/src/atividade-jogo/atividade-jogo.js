import React, { useRef, Component } from 'react';
import axios from 'axios';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
 
import { useState } from 'react';

import './atividade-jogo.css';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { ProgressSpinner } from 'primereact/progressspinner';

import PesquisarImagemService from '../pesquisar-imagem/pesquisar-imagem-service';
import MenuBar from '../menu-bar/menu-bar';
import { If } from 'react-if';


// const AtividadeJogo = () => {
export default class AtividadeJogo extends Component {

	//  history = useHistory();

	 constructor(props) {
        super(props);
        this.state = {
            displayBasic: false,
            position: 'center',
			nome: "",
			products: [],

			atividadeAPI: [],
			atividade: [],
			respostaACorreta: [],

			requestProgress: false,
			progressSpinner: false
        };

        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
    }

	 toast = useRef(null);
	
	 dataService = new PesquisarImagemService();
	
	componentDidMount() {
		getTodasAtividades();

	}

	 getTodasAtividades() {
		setRequestProgress(true)
		axios.get('http://localhost:8001/atividade-caixa').then(response => {
			console.log('response', response.data);
			setAtividadeAPI(response.data)
			console.log("atividadeAPI", atividadeAPI);
			setRequestProgress(false)
		})
		.catch((error) => {
			// toast.current.show({severity:'error', summary: 'Listagem Falhou', life: 3000});
			setProgressSpinner(false)

		})
	}

	 onChange(evento) {
		const { name, value } = evento.target;	
		setAtividade({ ...atividade, [name]: value })

	}

	 onSubmit(evento) {
		setProgressSpinner(true)
		evento.preventDefault();

		const formData = new FormData();

		const dados = atividade
		Object.keys(dados).forEach(k => {
			formData.append(k, dados[k]);
		})

		formData.append('respostaACorreta', respostaACorreta);
		formData.append('respostaBCorreta', respostaBCorreta);
		formData.append('respostaCCorreta', respostaCCorreta);

		// Display the key/value pairs
		for (var pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		}

		axios.post('http://localhost:8001/atividade-caixa', formData).then(snapshot => {
			toast.current.show({severity:'success', summary: 'Cadastro Completo', life: 3000});
			console.log('Cadastrado com sucesso')
			setProgressSpinner(false)
			window.location.reload()
		})
		.catch((error) => {
			toast.current.show({severity:'error', summary: 'Cadastro Falhou', life: 3000});
			setProgressSpinner(false)
		})
		
	}

	deleteOneAtividade(id) {
		console.warn("deleteOneAtividade", id)

		axios.delete(`http://localhost:8001/atividade-caixa/${id}`).then(response => {
		toast.current.show({severity:'success', summary:' Deletado com Sucesso',
			detail:'Id: ' + id , life: 3000});
			console.log("Cadastro com o id", id, "excluido")
			window.location.reload()
		});
	}

    onClick(name, position) {
        let state = {
            [`${name}`]: true
        };

        if (position) {
            state = {
                ...state,
                position
            }
        }

        this.setState(state);
    }

	//  onClick2 = (name2, position2) => {
	// 	dialogFuncMap2[`${name2}`](true);

	// 	if (position2) {
	// 		setPosition2(position2);
	// 	}
	// }

	//  onClick3 = (name3, position3) => {
	// 	dialogFuncMap3[`${name3}`](true);

	// 	if (position3) {
	// 		setPosition3(position3);
	// 	}
	// }

	//  onClick4 = (name4, position4) => {
	// 	dialogFuncMap4[`${name4}`](true);

	// 	if (position4) {
	// 		setPosition4(position4);
	// 	}
	// }

	//  dialogFuncMap2 = {
	// 	'displayBasic2': setDisplayBasic2,
	// }

	//  dialogFuncMap3 = {
	// 	'displayBasic3': setDisplayBasic3,

	// }

	//  dialogFuncMap4 = {
	// 	'displayBasic4': setDisplayBasic4,

	// }

	 onHide (name) {
		dialogFuncMap[`${name}`](false);
	}

	//  onHide2 = (name2) => {
	// 	dialogFuncMap2[`${name2}`](false);
	// }

	//  onHide3 = (name3) => {
	// 	dialogFuncMap3[`${name3}`](false);
	// }

	//  onHide4 = (name4) => {
	// 	dialogFuncMap4[`${name4}`](false);
	// }

	 renderFooter (name) {
		return (
			<div>
				<Button label="No" icon="pi pi-times" onClick={() => this.onHide(name)} className="p-button-text" />
				<Button label="Yes" icon="pi pi-check" onClick={() => this.onHide(name)} autoFocus />
			</div>
		);
	}

	//  renderFooter2 = (name2) => {
	// 	return (
	// 		<div>
	// 			<Button label="No" icon="pi pi-times" onClick={() => onHide2(name2)} className="p-button-text" />
	// 			<Button label="Yes" icon="pi pi-check" onClick={() => onHide2(name2)} autoFocus />
	// 		</div>
	// 	);
	// }

	//  renderFooter3 = (name3) => {
	// 	return (
	// 		<div>
	// 			<Button label="No" icon="pi pi-times" onClick={() => onHide3(name3)} className="p-button-text" />
	// 			<Button label="Yes" icon="pi pi-check" onClick={() => onHide3(name3)} autoFocus />
	// 		</div>
	// 	);
	// }

	//  renderFooter4 = (name4) => {
	// 	return (
	// 		<div>
	// 			<Button label="No" icon="pi pi-times" onClick={() => onHide4(name4)} className="p-button-text" />
	// 			<Button label="Yes" icon="pi pi-check" onClick={() => onHide4(name4)} autoFocus />
	// 		</div>
	// 	);
	// }

	 onFormSubmit = (e) => {
		e.preventDefault()
		this.dataService.getData(nome).then(data => setProducts(data))
		// dataService.getData(nome).then(data => setAtividade(data))

	}

	//  onFormSubmit2 = (e) => {
	// 	e.preventDefault()
	// 	dataService.getData2(nome2).then(data => setProducts2(data))
	// 	// dataService.getData(nome).then(data => setAtividade(data))

	// }

	//  onFormSubmit3 = (e) => {
	// 	e.preventDefault()
	// 	dataService.getData3(nome3).then(data => setProducts3(data))

	// }

	//  onFormSubmit4 = (e) => {
	// 	e.preventDefault()
	// 	dataService.getData4(nome4).then(data => setProducts4(data))

	// }

	 imageBodyTemplate (rowData) {
		return <img src={rowData.contentUrl} className="data-image" />
	}

	//  imageBodyTemplate2 = (rowData2) => {
	// 	return <img src={rowData2.contentUrl} className="data-image" />
	// }

	//  imageBodyTemplate3 = (rowData3) => {
	// 	return <img src={rowData3.contentUrl} className="data-image" />
	// }

	//  imageBodyTemplate4 = (rowData4) => {
	// 	return <img src={rowData4.contentUrl} className="data-image" />
	// }

	 buttonSelecionarImage (rowData) {
		return <Button className="button-selecionar-imagem" label="Selecionar" onClick={ () => this.selecionarImagem(rowData.contentUrl)}/>

	}

	//  buttonSelecionarImage2 = (rowData2) => {
	// 	return <Button className="button-selecionar-imagem" label="Selecionar" onClick={ () => selecionarRespostaAUrl(rowData2.contentUrl)}/>

	// }

	//  buttonSelecionarImage3 = (rowData3) => {
	// 	return <Button className="button-selecionar-imagem" label="Selecionar" onClick={ () => selecionarRespostaBUrl(rowData3.contentUrl)}/>

	// }

	//  buttonSelecionarImage4 = (rowData4) => {
	// 	return <Button className="button-selecionar-imagem" label="Selecionar" onClick={ () => selecionarRespostaCUrl(rowData4.contentUrl)}/>

	// }

	 buttonSelecionarAtividade (atividadeAPI) {

		const confirm = () => {
			confirmDialog({
				message: 'Tem Certeza quer Excluir?',
				header: 'Atenção',
				icon: 'pi pi-exclamation-triangle',
				accept: () => this.deleteOneAtividade(atividadeAPI.id),
				// reject: () => rejectFunc()
			});
		}

		return (
			<div className="buttons-data">
				<Button className="button-excluir" icon="pi pi-trash" onClick={confirm}/>
				<Button className="button-editar" icon="pi pi-file" onClick={ () => this.getOneAtividade(atividadeAPI)}/>
				{/* <Button className="button-editar" icon="pi pi-file" onClick={ () => testeAnimation()}/> */}
			</div>
			)
	}

	 testeAnimation() {
		history.push('teste-animation')
	}

	 getOneAtividade(atividadeAPI) {
		history.push('/atividade-montar', atividadeAPI)
		// history.push(`/atividade-montar/${id}`)
		// console.log("id", id)

	}

	 listarAtividadesAnimation() {
		history.push('/teste-animation', atividadeAPI)
	}

	 selecionarImagem(rowData, evento) {

		const perguntaUrl = rowData;

		console.log("perguntaUrl", perguntaUrl)

		setAtividade({ ...atividade, perguntaUrl})
	}

	//  selecionarRespostaAUrl(rowData, evento) {

	// 	const respostaAUrl = rowData;

	// 	console.log("respostaAUrl", respostaAUrl)

	// 	setAtividade({ ...atividade, respostaAUrl})
	// }

	//  selecionarRespostaBUrl(rowData, evento) {

	// 	const respostaBUrl = rowData;

	// 	console.log("respostaBUrl", respostaBUrl)

	// 	setAtividade({ ...atividade, respostaBUrl})
	// }

	//  selecionarRespostaCUrl(rowData, evento) {

	// 	const respostaCUrl = rowData;

	// 	console.log("respostaCUrl", respostaCUrl)

	// 	setAtividade({ ...atividade, respostaCUrl})
	// }

	 clickRadioButtonA(e) {
		console.warn('clickRadioButton()')
		setRespostaACorreta(true);
		setRespostaBCorreta(false);
		setRespostaCCorreta(false);
	}

	 clickRadioButtonB(e) {
		console.warn('clickRadioButton()')
		setRespostaACorreta(false);
		setRespostaBCorreta(true);
		setRespostaCCorreta(false);
	}

	 clickRadioButtonC(e) {
		console.warn('clickRadioButton()')
		setRespostaACorreta(false);
		setRespostaBCorreta(false);
		setRespostaCCorreta(true);
	}

	render() {
		return (	
			<div>
				<MenuBar/>
				<div className="">

					<If condition= { this.state.requestProgress }>
						<ProgressBar mode="indeterminate" className="progressBar"/>
					</If>

					<If condition = { !this.state.requestProgress }>
						<div>
							<Toast ref={this.state.toast} />

							<div className="">

								<div className="h-titulos">
									<h5>Titulo da Atividade</h5>
								</div>
									<div className="p-fluid p-formgrid p-grid">
										<div className="p-field p-col-12 p-sm-12 p-md-6">
											<InputText className="input-titulo" id="firstname2" type="text" name="perguntaTitulo"
												value={this.state.atividade.perguntaTitulo} onChange={this.onChange}/>
										</div>
									</div>

								<div className="h-titulos">
									<h5>Pergunta</h5>
								</div>
								<div className="p-fluid p-formgrid p-grid">
									<div className="p-field p-col-12 p-sm-12 p-md-6">
										<Button className="button-pergunta" label="Imagem" icon="pi pi-external-link"
											onClick={() => onClick('displayBasic')} />
									</div>
									<div className="p-field p-col-12 p-sm-12 p-md-6">
										<InputText className="input-pergunta" type="text" rows="4" 
											name="perguntaTxt" value={atividade.perguntaTxt} onChange={onChange}>
										</InputText>
									</div>
								</div>

								<Dialog header="Procurar Imagens" visible={displayBasic} style={{ width: '90vw' }}
									footer={renderFooter('displayBasic')}
									onHide={() => onHide('displayBasic')}>
									<InputText value={nome} onChange={(e) => setNome(e.target.value)} />
									<Button onClick={onFormSubmit} icon="pi pi-search" className="p-ml-2"/>
									<div className="card">
										<DataTable value={products.value}>
											<Column header="Image" body={imageBodyTemplate}></Column>
											<Column header="Selecionar" body={buttonSelecionarImage}></Column>
										</DataTable>
									</div>
								</Dialog>

								<div className="h-titulo-respostas">
									<h5>Respostas</h5>
								</div>
								<div className="p-fluid p-formgrid p-grid">
									<If condition = { respostaACorreta }>
										<div className="p-field p-col-2 p-sm-2 p-md-1">
										<Button icon="pi pi-check" className="" 
											style={{width: '100%', height: '100%'}}  name="respostaCorreta"
											onClick={() => {clickRadioButtonA()}}/>
										</div>
									</If>

									<If condition= { !respostaACorreta }>
										<div className="p-field p-col-2 p-sm-2 p-md-1">
										<Button icon="pi pi-times" className=""
											style={{width: '100%', height: '100%'}} name="respostaCorreta"
											onClick={() => {clickRadioButtonA()}}/>
										</div>
									</If>

									<div className="p-field p-col-2 p-sm-2 p-md-1">
										<Button className="button-dialog" style={{width: '100%', height: '100%'}} 
											label="A" onClick={() => onClick2('displayBasic2')} />
									</div>
									<div className="p-field p-col-8 p-sm-8 p-md-4">
									<InputText className="input-resposta" type="text" name="respostaATxt"
										value={atividade.respostaATxt} onChange={onChange}/>
									</div>
								</div>

								{/* <Dialog header="Procurar Imagens" visible={displayBasic2} style={{ width: '90vw' }}
									footer={renderFooter2('displayBasic2')}
									onHide={() => onHide2('displayBasic2')}>
									<InputText value={nome2} onChange={(e) => setNome2(e.target.value)} />
									<Button onClick={onFormSubmit2} icon="pi pi-search" className="p-ml-2"/>
									<div className="card">
										<DataTable value={products2.value}>
											<Column header="Image" body={imageBodyTemplate2}></Column>
											<Column header="Selecionar" body={buttonSelecionarImage2}></Column>
										</DataTable>
									</div>  
								</Dialog> */}

								<div className="p-fluid p-formgrid p-grid">
										<If condition = { respostaBCorreta }>
											<div className="p-field p-col-2 p-sm-3 p-md-1">
												<Button icon="pi pi-check" className="" 
													style={{width: '100%', height: '100%'}}  name="respostaCorreta"
													onClick={() => {clickRadioButtonB()}}/>
											</div>
										</If>

										<If condition= { !respostaBCorreta }>
											<div className="p-field p-col-2 p-sm-3 p-md-1">
												<Button icon="pi pi-times" className=""
													style={{width: '100%', height: '100%'}} name="respostaCorreta"
													onClick={() => {clickRadioButtonB()}}/>
											</div>
										</If>

										<div className="p-field p-col-2 p-sm-2 p-md-1">
											<Button className="button-dialog" style={{width: '100%', height: '100%'}} 
												label="B" onClick={() => onClick3('displayBasic3')} />
										</div>
										<div className="p-field p-col-8 p-sm-8 p-md-4">
											<InputText className="input-resposta" type="text" name="respostaBTxt"
												value={atividade.respostaBTxt} onChange={onChange}/>
										</div>
									</div>
{/* 
								<Dialog header="Procurar Imagens" visible={displayBasic3} style={{ width: '90vw' }}
									footer={renderFooter3('displayBasic3')}
									onHide={() => onHide3('displayBasic3')}>
									<InputText value={nome3} onChange={(e) => setNome3(e.target.value)} />
									<Button onClick={onFormSubmit3} icon="pi pi-search" className="p-ml-2"/>
									<div className="card">
										<DataTable value={products3.value}>
											<Column header="Image" body={imageBodyTemplate3}></Column>
											<Column header="Selecionar" body={buttonSelecionarImage3}></Column>
										</DataTable>
									</div>  
								</Dialog>  */}

								<div className="p-fluid p-formgrid p-grid">
									<If condition = { respostaCCorreta }>
										<div className="p-field p-col-2 p-sm-3 p-md-1">
											<Button icon="pi pi-check" className="" 
												style={{width: '100%', height: '100%'}}  name="respostaCorreta"
												onClick={() => {clickRadioButtonC()}}/>
										</div>
									</If>

									<If condition= { !respostaCCorreta }>
										<div className="p-field p-col-2 p-sm-3 p-md-1">
											<Button icon="pi pi-times" className=""
												style={{width: '100%', height: '100%'}} name="respostaCorreta"
												onClick={() => {clickRadioButtonC()}}/>
										</div>
									</If>

									<div className="p-field p-col-2 p-sm-2 p-md-1">
										<Button className="button-dialog" style={{width: '100%', height: '100%'}} 
											label="C" onClick={() => onClick4('displayBasic4')} />
									</div>
									<div className="p-field p-col-8 p-sm-8 p-md-4">
										<InputText className="input-resposta" type="text" name="respostaCTxt"
											value={atividade.respostaCTxt} onChange={onChange}/>
									</div>
								</div>

								{/* <Dialog header="Procurar Imagens" visible={displayBasic4} style={{ width: '90vw' }} 
									footer={renderFooter4('displayBasic4')}
									onHide={() => onHide4('displayBasic4')}>
									<InputText value={nome4} onChange={(e) => setNome4(e.target.value)} />
									<Button onClick={onFormSubmit4} icon="pi pi-search" className="p-ml-2"/>
									<div className="card">
										<DataTable value={products4.value}>
											<Column header="Image" body={imageBodyTemplate4}></Column>
											<Column header="Selecionar" body={buttonSelecionarImage4}></Column>
										</DataTable>
									</div>  
								</Dialog> */}

								<form onSubmit={this.onSubmit}> 
									<div className="p-fluid">
										<div className="p-field p-col-12 p-sm-12 p-md-6">
											<Button className="button-salvar" type="submit" label="Salvar" onSubmit={this.onSubmit}/>
										</div>
									</div>
								</form>

								<If condition={ this.state.progressSpinner }>
									<ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="#EEEEEE" 
										animationDuration=".5s"/>
								</If>

							</div>

							<div className="data">
								<DataTable value={this.state.atividadeAPI}>
									<Column field="perguntaTxt" header="Titulo"></Column>
									<Column  field="name" header="#" body={this.buttonSelecionarAtividade}></Column>
								</DataTable>
								{/* <Button className="button-salvar" type="submit" label="Salvar" onClick={onSubmit}/> */}
								<Button className="button-salvar" type="submit" label="Começar" onClick={this.listarAtividadesAnimation}></Button>
							</div>
						</div>
					</If>
				</div>
			</div>
		);
	}
}

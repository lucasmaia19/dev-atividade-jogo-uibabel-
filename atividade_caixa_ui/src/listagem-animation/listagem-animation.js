import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import axios from 'axios';
import { If } from 'react-if';

import "../styles3.css"; 
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function ListagemAnimation({delayPerPixel = 0.0008, numItems = 5}) {
// const ListagemAnimation = () => {

	const [atividade, setAtividade] = useState([])

	const [requestProgress, setRequestProgress] = useState(false);

	let [atividade5, setAtividade5] = useState({id: '1', perguntaTitulo: 'Corrida'})
	const atividadeDummy = {id: '2', perguntaTitulo: 'Corrida Alterado'}

	const [count, setCount] = useState(0);

	const atividadeList = [

		// axios.get('http://localhost:8001/atividade-caixa').then(response => {

		// 	setAtividade(response.data)
			
		// }),
		
		{id: '10', perguntaTitulo: 'Labirinto'},
		{id: '20', perguntaTitulo: 'Cruzadinha'}
		
	]
	
	
	useEffect(() => {

		// setCount(count + 1);
		// console.log("count", count);
		
		let mounted = true;

		setRequestProgress(true);
		axios.get('http://localhost:8001/atividade-caixa').then(response => {
			
			if (mounted) {
				console.log("response", response.data)
				setAtividade(response.data)
				// console.log("atividade", atividade)
				setRequestProgress(false)
			}
		})

		return () => mounted = false;


	}, []);

	
	function imageBody(rowData) {
		return <img src={rowData.perguntaImg} className="data-image" />
	}

	function converteImagemBase64ParaHtml(imagem) {
		console.log("converteImagemBase64ParaHtml")
		console.log("atividade", atividade)
		let novaImagem;
		novaImagem = "data:image/jpg;base64," + imagem + "";

		return novaImagem;
	}

	const originOffset = useRef({ top: 0, left: 0 });
	const controls = useAnimation();
	const [isOpen, setIsOpen] = useState(false);

	function GridItem({ delayPerPixel, i, originIndex, originOffset }) {
		const delayRef = useRef(0);
		const offset = useRef({ top: 0, left: 0 });
		const ref = useRef();

		useLayoutEffect(() => {
			const element = ref.current;
			if (!element) return;

			offset.current = {
				top: element.offsetTop,
				left: element.offsetLeft
			};

			if (i === originIndex) {
				originOffset.current = offset.current;
			}
   		}, [delayPerPixel]);

		useEffect(() => {
			const dx = Math.abs(offset.current.left - originOffset.current.left);
			const dy = Math.abs(offset.current.top - originOffset.current.top);
			const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
			delayRef.current = d * delayPerPixel;
		}, [delayPerPixel]);

		return (
			<div>
				<DataTable value={atividade}>
					{/* <Column body={imageBody(atividade)} header="Imagem"> */}
					<Column field="perguntaTitulo" header="Imagem">
					 	<img className=""
							src={`${converteImagemBase64ParaHtml(atividade.perguntaImg)}`}
							style={{width: 100, height: 100}}/>						
					</Column>
					</DataTable>
				</div>

					// <div value={atividade} header="Imagem">
					// 	<img className=""
					// 		src={`${converteImagemBase64ParaHtml(atividade.perguntaImg)}`}
					// 		style={{width: 100, height: 100}}/>
					// </div>
			// </div>
			//   <Box ref={ref} variants={itemVariants} custom={delayRef} 
			// 	whileHover={{ scale: 1.1 }}
			// 	whileTap={{ scale: 1.0 }}>
			//  </Box>

		)
  	}

	const itemVariants = {
	hidden: {
		opacity: 0,
		scale: 1.5
	},
	visible: delayRef => ({
			opacity: 1,
			scale: 1,
			transition: { delay: delayRef.current }
		})
	};

	const Box = styled(motion.div)`
		margin: 10px;
		display: inline-block;
		height: 65px;
		width: 65px;
		background-color: white;
		border-radius: 10px;
	`;

	return (
		<div>
			<If condition= { requestProgress }>
				<div>Carregando...</div>
			</If>
			<If condition= { !requestProgress }>
				<motion.div initial="hidden" animate={controls} variants={{}}>
					{Array.from({ length: 2 }).map((_, i) => (
						<GridItem
							key={i}
							i={i}
							originIndex={26}
							delayPerPixel={delayPerPixel}
							originOffset={originOffset}

							layout
							data-isOpen={isOpen}
							initial={{ borderRadius: 50 }}
							className="parent"
							onClick={() => setIsOpen(!isOpen)}
						/>
					))}
				<motion.div layout className="child" /></motion.div>
			</If>
		</div>
	);

	// {stations.map(station => <div key={station}> {station} </div>)}
	// {atividade.map(e => <div key={e.id}> {e.perguntaTitulo} </div>)}
	// Olá {atividade}
	// return (
	// 	<div>
	// 		{/* {atividadeList.map(e => <div key={e.id}> {e.perguntaTitulo} </div>)} */}
	// 		{atividadeList.map(e => <div key={e.id}> {e.perguntaTitulo} </div>)}
	// 		{atividade.perguntaTitulo}
	// 	</div>
	// );
}

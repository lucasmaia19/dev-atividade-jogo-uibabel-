import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import axios from 'axios';

import "../styles3.css"; 

// export default function ListagemAnimation({props, delayPerPixel = 0.0008, numItems = 5}) {
const ListagemAnimation = () => {

	const [atividade, setAtividade] = useState([])

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
		// console.log("atividade", atividade)

		// controls.start("visible");
		setCount(count + 1);
		console.log("count", count);

		// axios.get('http://localhost:8001/atividade-caixa').then(response => {
			
			// console.log("response", response.data);

			// setAtividade(response.data);
			// console.log("atividade", atividade);

			// setAtividade(atividadeList);
			// console.log("atividadeList", atividadeList);

			// setAtividade5(response.data);

			console.log("atividade5", atividade5);
			setAtividade5(atividadeDummy);
			console.log("atividade5", atividade5);

			setCount(count + 1);
			console.log("count", count);

			// setAtividade(response.data)
			
		// })
	}, []);

	/*
	function converteImagemBase64ParaHtml(imagem) {

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

		// <img className=""
		// src={`${converteImagemBase64ParaHtml(props.location.state.perguntaImg)}`}
		// style={{width: 100, height: 100}}/>

		return 
			<Box ref={ref} variants={itemVariants} custom={delayRef} 
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 1.0 }}>
				{}
			</Box>;
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
		</div>
	);
	*/

	// {stations.map(station => <div key={station}> {station} </div>)}
	// {atividade.map(e => <div key={e.id}> {e.perguntaTitulo} </div>)}
	// Olá {atividade}
	return (
		<div>
			{/* {atividadeList.map(e => <div key={e.id}> {e.perguntaTitulo} </div>)} */}
			{atividadeList.map(e => <div key={e.id}> {e.perguntaTitulo} </div>)}
			{atividade.perguntaTitulo}
		</div>
	);
}

export default ListagemAnimation;